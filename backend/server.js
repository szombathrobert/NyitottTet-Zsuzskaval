import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";
import * as cheerio from 'cheerio'; // ✅

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());

// JWT kulcs
const JWT_SECRET = "nyitottter-titkos-kulcs";

// Multer setup
const upload = multer({ dest: "uploads/" });

// -------- Kép feltöltés Cloudinary
// ---------- Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "kezelesek",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadCloud = multer({ storage: cloudStorage });

// Cloudinary képfeltöltés (frontend: kep_feltoltes/page.tsx)
app.post("/admin/upload-image", verifyToken, uploadCloud.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Nincs fájl feltöltve!" });
    // Multer-storage-cloudinary automatikusan adja a URL-t
    const imageUrl = req.file.path;
    res.json({ success: true, url: imageUrl });
  } catch (err) {
    console.error("❌ Képfeltöltési hiba:", err);
    res.status(500).json({ error: "Hiba történt a kép feltöltésekor" });
  }
});


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
    const { cim, slug, shortDescription, ar, kepUrl } = req.body;

    if (!cim || !slug || (!req.file && !kepUrl)) {
      return res.status(400).json({ error: "Kérlek töltsd ki a szükséges mezőket (fájl vagy kép URL)!" });
    }

    // 1️⃣ Word -> HTML konverzió, ha van fájl
    let tartalom = "";
    if (req.file) {
      const filePath = req.file.path;
      const result = await mammoth.convertToHtml({ path: filePath });
      tartalom = result.value;

      // Cheerio feldolgozás
      const $ = cheerio.load(tartalom);

      $("p, h2, ul").each((i, el) => {
        const tag = el.tagName.toLowerCase();
        const text = $(el).text().trim();
        const style = $(el).attr("style") || "";

        if (tag === "ul") {
          $(el).attr("class", "text-2xl leading-relaxed mt-4 mb-3 list-disc list-inside");
          $(el).find("li").each((_, li) => $(li).addClass("mb-2"));
        } else if (text.endsWith("?") || text.match(/[A-ZÁÉÍÓÖŐÚÜŰ].*\?/)) {
          $(el).replaceWith(`<h2 class="text-4xl font-bold mt-4 mb-4">${$(el).html()}</h2><br>`);
        } else if (style.includes("font-weight: bold") || text === text.toUpperCase()) {
          $(el).replaceWith(`<h2 class="text-4xl font-bold mt-4 mb-4">${$(el).html()}</h2><br>`);
        } else if (tag === "h2" && !$(el).attr("class")) {
          $(el).attr("class", "text-4xl font-bold mt-4 mb-4");
        } else if (tag === "p") {
          $(el).replaceWith(`<p class="text-2xl leading-relaxed mt-4 mb-3">${$(el).html()}</p><br>`);
        }
      });

      // UL elemek után <br>
      $("ul").each((i, el) => $(el).addClass("text-2xl leading-relaxed mt-4 mb-3 list-disc list-inside").after("<br>"));
      $("ul li").each((i, el) => $(el).addClass("mb-2"));

      tartalom = $.html();

      // Fájl törlése
      fs.unlinkSync(req.file.path);
    }

    // 2️⃣ Mentés adatbázisba
    const newKezeles = await prisma.kezeles.create({
      data: {
        cim,
        slug,
        shortDescription,
        ar,
        tartalom,
        kepUrl: kepUrl || null,
      },
    });

    res.json({ success: true, kezes: newKezeles });
  } catch (err) {
    console.error("❌ Feltöltési hiba:", err);
    res.status(500).json({ error: "Hiba történt a kezelés felvételekor" });
  }
});

// Publikus árak lekérése
app.get("/kezelesek", async (req, res) => {
  try {
    const kezelesek = await prisma.kezeles.findMany({
      orderBy: { id: "asc" },
    });
    res.json(kezelesek);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a kezelések lekérésekor." });
  }
});

// Kezelések listázása
app.get("/admin/kezelesek", verifyToken, async (req, res) => {
  const kezelesek = await prisma.kezeles.findMany();
  res.json(kezelesek);
});

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

// 🔹 Kezelés szerkesztése (pl. ár, tartalom, stb. módosítása)
app.put("/admin/kezelesek/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { cim, slug, ar, shortDescription, tartalom } = req.body;

    const updated = await prisma.kezeles.update({
      where: { id: parseInt(id) },
      data: {
        ...(cim && { cim }),
        ...(slug && { slug }),
        ...(ar && { ar }),
        ...(shortDescription && { shortDescription }),
        ...(tartalom && { tartalom }),
      },
    });

    res.json({ success: true, updated });
  } catch (err) {
    console.error("❌ PUT hiba:", err);
    res.status(500).json({ error: "Hiba történt a kezelés frissítésekor" });
  }
});

app.put("/admin/kezelesek/:id/ar", async (req, res) => {
  const { id } = req.params;
  const { ar } = req.body;

  try {
    const updated = await prisma.kezeles.update({
      where: { id: Number(id) },
      data: { ar },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Nem sikerült az ár frissítése" });
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

    // átnevezzük a kepUrl-t kep-re
    const response = { ...kezeles, kep: kezeles.kepUrl };

    res.json({ success: true, kezeles: response });
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

// Vélemények CRUD (admin)
app.get("/admin/reviews", verifyToken, async (req, res) => {
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
  res.json(reviews);
});

app.post("/admin/reviews", verifyToken, async (req, res) => {
  const { name, text, date } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: {
        name,
        text,
        date: date ? new Date(date) : new Date(),
      },
    });
    res.json({ success: true, review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a vélemény létrehozásakor" });
  }
});

app.put("/admin/reviews/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, text, date } = req.body;

  try {
    const updated = await prisma.review.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(text && { text }),
        ...(date && { date: new Date(date) }),
      },
    });
    res.json({ success: true, updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a vélemény frissítésekor" });
  }
});

app.delete("/admin/reviews/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a vélemény törlésekor" });
  }
});

// Frontend lekérés (publikus)
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a vélemények lekérésekor" });
  }
});

// Publikus események lekérése
app.get("/events", async (req, res) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: "asc" } });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt az események lekérésekor." });
  }
});


// Egy esemény lekérése ID alapján
app.get("/admin/events/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    return res.status(404).json({ error: "Esemény nem található" });
  }

  res.json(event);
});

// Új esemény
app.post("/admin/events", verifyToken, async (req, res) => {
  const { title, description, date } = req.body;

  try {
    if (!title || !description || !date) {
      return res.status(400).json({ success: false, error: "Hiányzó mező(k)!" });
    }

    const eventDate = new Date(date + "T00:00:00Z");
    const newEvent = await prisma.event.create({
      data: { title, description, date: eventDate }
    });

    res.json({ success: true, event: newEvent });
  } catch (err) {
    console.error("POST /admin/events hiba:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Szerkesztés
app.put("/admin/events/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, date, imageUrl } = req.body;
  try {
    const updated = await prisma.event.update({
      where: { id: parseInt(id) },
      data: { title, description, date: new Date(date), imageUrl },
    });
    res.json({ success: true, event: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Törlés
app.delete("/admin/events/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Galéria rész
app.get("/admin/galeria", verifyToken, async (req, res) => {
  try {
    const kepek = await prisma.galeria.findMany({
      orderBy: { id: "desc" }
    });

    res.json({ success: true, kepek });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Hiba a lekérdezésnél" });
  }
});

app.get("/galeria", async (req, res) => {
  try {
    const images = await prisma.galeria.findMany({
      select: { url: true }
    });

    res.json({ success: true, kepek: images.map(i => i.url) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Hiba történt" });
  }
});

app.delete("/admin/galeria/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const kep = await prisma.galeria.findUnique({ where: { id } });
    if (!kep) return res.status(404).json({ success: false, error: "Kép nem található" });

    // Cloudinary törlés
    await cloudinary.uploader.destroy(kep.publicId);

    // DB törlés
    await prisma.galeria.delete({ where: { id } });

    res.json({ success: true, message: "Kép törölve" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Hiba történt a törlés során" });
  }
});

app.post(
  "/admin/galeria-upload",
  verifyToken,
  uploadCloud.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "Nincs kép feltöltve!" });
      }

      const imageUrl = req.file.path;
      const publicId = req.file.filename;  // <-- multer-storage-cloudinary ezt adja

      const newImage = await prisma.galeria.create({
        data: {
          url: imageUrl,
          publicId: publicId
        }
      });

      res.json({
        success: true,
        message: "Kép feltöltve!",
        url: imageUrl,
        kep: newImage,
      });
    } catch (err) {
      console.error("Galéria kép mentési hiba:", err);
      res.status(500).json({ success: false, error: "Hiba történt" });
    }
  }
);

// Teszt
app.get("/", (req, res) => {
  res.send("✅ Backend fut és működik!");
});

// Szerver indítása
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Szerver elindult: http://localhost:${PORT}`));
