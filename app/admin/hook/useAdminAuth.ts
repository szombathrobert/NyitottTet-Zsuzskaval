// hooks/useAdminAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");

    if (!savedToken) {
      router.push("/admin"); // visszadob a login oldalra
    } else {
      setToken(savedToken);
    }
    setLoading(false);
  }, [router]);

  return { token, loading };
}
