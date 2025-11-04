import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";
import * as cheerio from 'cheerio'; // ✅

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());

// JWT kulcs
const JWT_SECRET = "nyitottter-titkos-kulcs";

// Multer setup
const upload = multer({ dest: "uploads/" });

// -------- Admin regisztrálás (egyszeri)
app.post("/admin/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.create({
      data: { username, password: hashed },
    });
    res.json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a regisztrációkor" });
  }
});

// -------- Admin login
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return res.status(401).json({ error: "Hibás felhasználónév vagy jelszó" });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: "Hibás felhasználónév vagy jelszó" });

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ success: true, token });
});

// -------- Middleware a védett endpointokhoz
function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(403).json({ error: "Hiányzó token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Érvénytelen token" });
  }
}

// -------- Kezelések CRUD
// Új kezelés feltöltése (Word)
app.post("/admin/kezelesek", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const { cim, slug, shortDescription, ar } = req.body;
    const filePath = req.file.path;

    // 1️⃣ Word -> HTML konverzió
    const result = await mammoth.convertToHtml({ path: filePath });
    let html = result.value;

    // 2️⃣ HTML feldolgozás cheerio-val
    const $ = cheerio.load(html);

    $("p, h2, ul").each((i, el) => {
    const tag = el.tagName.toLowerCase();
    const text = $(el).text().trim();
    const style = $(el).attr("style") || "";

    // 🔹 Ha UL – formázd listának
    if (tag === "ul") {
      $(el).attr("class", "text-2xl leading-relaxed mt-4 mb-3 list-disc list-inside");
      $(el).find("li").each((_, li) => {
        $(li).addClass("mb-2");
      });
    }

    // 🔹 Ha kérdés vagy kérdőjeles mondat => H2 nagy betűkkel
    else if (text.endsWith("?") || text.match(/[A-ZÁÉÍÓÖŐÚÜŰ].*\?/)) {
      $(el).replaceWith(`<h2 class="text-4xl font-bold mt-4 mb-4">${$(el).html()}</h2><br>`);
    }

    // 🔹 Ha félkövér vagy csupa nagy => H2 formázott
    else if (style.includes("font-weight: bold") || text === text.toUpperCase()) {
      $(el).replaceWith(`<h2 class="text-4xl font-bold mt-4 mb-4">${$(el).html()}</h2><br>`);
    }

    // 🔹 Ha már H2 volt, de nincs rajta class, akkor is adj neki
    else if (tag === "h2" && !$(el).attr("class")) {
      $(el).attr("class", "text-4xl font-bold mt-4 mb-4");
    }

    // 🔹 Minden más marad normál bekezdés
    else if (tag === "p") {
      $(el).replaceWith(`<p class="text-2xl leading-relaxed mt-4 mb-3">${$(el).html()}</p><br>`);
    }
  });

    // 🔸 UL elemek formázása és <br> beszúrása
    $("ul").each((i, el) => {
      $(el)
        .addClass("text-2xl leading-relaxed mt-4 mb-3 list-disc list-inside")
        .after("<br>");
    });

    // 🔸 LI elemek közti tér
    $("ul li").each((i, el) => {
      $(el).addClass("mb-2");
    });

    // 3️⃣ Végleges HTML
    const tartalom = $.html();

    // 4️⃣ Mentés adatbázisba
    const newKezeles = await prisma.kezeles.create({
      data: { cim, slug, shortDescription, ar, tartalom },
    });

    // 5️⃣ Feltöltött fájl törlése
    fs.unlinkSync(filePath);

    res.json({ success: true, kezes: newKezeles });
  } catch (err) {
    console.error("❌ Feltöltési hiba:", err);
    res.status(500).json({ error: "Hiba történt a kezelés felvételekor" });
  }
});


// Kezelések listázása
app.get("/admin/kezelesek", verifyToken, async (req, res) => {
  const kezelesek = await prisma.kezeles.findMany();
  res.json(kezelesek);
});

// Egy kezelés lekérése ID alapján
// Egy kezelés lekérése ID alapján
app.get("/admin/kezelesek/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const kezes = await prisma.kezeles.findUnique({
      where: { id: Number(id) },
    });

    if (!kezes) return res.status(404).json({ success: false, error: "Nincs ilyen kezelés" });

    res.json({ success: true, kezeles: kezes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Hiba történt a kezelés lekérésekor" });
  }
});

// Kezelés frissítése
app.put("/admin/kezelesek/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { cim, slug, shortDescription, ar, tartalom } = req.body;

  try {
    const updated = await prisma.kezeles.update({
      where: { id: Number(id) },
      data: { cim, slug, shortDescription, ar, tartalom },
    });
    res.json({ success: true, kezes: updated });
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a kezelés frissítésekor" });
  }
});

// Kezelés törlése
app.delete("/admin/kezelesek/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.kezeles.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a kezelés törlésekor" });
  }
});

// Kezelés lekérése slug alapján (pl. /admin/kezelesek/slug/access-bars)
app.get("/admin/kezelesek/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const kezeles = await prisma.kezeles.findUnique({
      where: { slug },
    });

    if (!kezeles) {
      return res.status(404).json({ error: "Nem található kezelés ezzel a sluggal." });
    }

    res.json({ success: true, kezeles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a kezelés lekérésekor." });
  }
});

app.get("/kezelesek", async (req, res) => {
  try {
    const kezelések = await prisma.kezeles.findMany({
      select: {
        id: true,
        cim: true,
        slug: true,
        ar: true,
        kepUrl: true,
        shortDescription: true,
      },
      orderBy: { id: "desc" },
    });
    res.json(kezelések);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Nem sikerült lekérni a kezeléseket" });
  }
});


// Teszt
app.get("/", (req, res) => {
  res.send("✅ Backend fut és működik!");
});

// Szerver indítása
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Szerver elindult: http://localhost:${PORT}`));
