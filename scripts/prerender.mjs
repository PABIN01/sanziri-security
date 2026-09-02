// Pré-rendu des pages pour le SEO / partage social.
//
// Après `vite build`, ce script :
//  1. démarre un serveur local qui sert le contenu de dist/
//  2. récupère la liste des produits et articles depuis l'API Django
//     (pour connaître les URLs dynamiques /products/:slug, /blog/:slug)
//  3. ouvre chaque page dans un navigateur headless (Puppeteer), attend
//     que le JS ait fini de tourner (donc que useSEO ait posé les bonnes
//     balises <title>/<meta>), puis sauvegarde le HTML final sur disque
//
// Résultat : dist/index.html, dist/products/index.html,
// dist/products/camera-hd/index.html, etc. Chaque fichier contient déjà
// les bonnes balises meta pour le crawler qui le visite en premier —
// le JS prend ensuite le relais normalement pour les visiteurs humains.
//
// Prérequis : l'API (VITE_API_URL) doit être joignable au moment du
// build. En local, lance le serveur Django avant ce script.

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

const PREVIEW_PORT = 4173;
const PREVIEW_URL = `http://localhost:${PREVIEW_PORT}`;
const API_URL = process.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/products",
  "/blog",
  "/testimonials",
  "/contact",
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchSlugs(endpoint) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/`);
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : data.results || [];
    return items.map((item) => item.slug).filter(Boolean);
  } catch (err) {
    console.warn(`⚠️  Impossible de récupérer ${endpoint} (${err.message}) — routes dynamiques ignorées.`);
    return [];
  }
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn(
      "npx",
      ["vite", "preview", "--port", String(PREVIEW_PORT), "--strictPort"],
      { cwd: ROOT, shell: true }
    );

    let ready = false;
    const onData = (data) => {
      const text = data.toString();
      if (!ready && text.includes("Local:")) {
        ready = true;
        resolve(server);
      }
    };
    server.stdout.on("data", onData);
    server.stderr.on("data", onData);
    server.on("error", reject);

    setTimeout(() => {
      if (!ready) reject(new Error("Le serveur de prévisualisation n'a pas démarré à temps."));
    }, 15000);
  });
}

function routeToFilePath(route) {
  if (route === "/") return join(DIST, "index.html");
  return join(DIST, route.replace(/^\//, ""), "index.html");
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  await page.goto(`${PREVIEW_URL}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
  // Petite marge pour laisser useSEO poser ses balises après le fetch.
  await wait(300);
  const html = await page.content();
  await page.close();

  const filePath = routeToFilePath(route);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, "utf-8");
  console.log(`✅ ${route} -> ${filePath.replace(ROOT, "")}`);
}

async function main() {
  console.log("🔎 Récupération des slugs produits / articles depuis l'API...");
  const [productSlugs, blogSlugs] = await Promise.all([
    fetchSlugs("products"),
    fetchSlugs("blog"),
  ]);

  const routes = [
    ...STATIC_ROUTES,
    ...productSlugs.map((slug) => `/products/${slug}`),
    ...blogSlugs.map((slug) => `/blog/${slug}`),
  ];

  console.log(`🚀 Démarrage du serveur de prévisualisation sur le port ${PREVIEW_PORT}...`);
  const server = await startPreviewServer();

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    console.log(`📄 Pré-rendu de ${routes.length} page(s)...`);
    for (const route of routes) {
      await prerenderRoute(browser, route);
    }
    await browser.close();
    console.log("✨ Pré-rendu terminé.");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error("❌ Échec du pré-rendu :", err);
  process.exit(1);
});