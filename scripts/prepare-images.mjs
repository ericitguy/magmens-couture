/**
 * Magmens Couture — photography pipeline.
 *
 * Reads the original camera/phone files from ./photos, corrects orientation,
 * removes letterbox bars, writes web-optimised masters into
 * ./public/photography, and records intrinsic dimensions plus a base64
 * low-quality image placeholder (LQIP) for elegant image reveals.
 *
 * Run with:  npm run images            (all photographs + social card)
 *            npm run images -- --og-only (rebuild the social card only)
 *
 * The originals in ./photos are never modified.
 */
import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "photos");
const OUT_DIR = path.join(ROOT, "public", "photography");
const OG_DIR = path.join(ROOT, "public", "og");
const MANIFEST = path.join(ROOT, "src", "content", "image-manifest.json");

const MAX_EDGE = 2400;
const MASTER_QUALITY = 82;
const BLACK = 28;
const MAX_TRIM_RATIO = 0.2;

/** Human-authored naming for each supplied photograph. */
const SOURCES = [
  { source: "DSC08035.jpg", slug: "bridal-ivory-ballgown-blossom" },
  { source: "DSC07967.jpg", slug: "bridal-ivory-ballgown-full" },
  { source: "DSC08000.jpg", slug: "bridal-ivory-ballgown-train" },
  { source: "DSC08009.jpg", slug: "bridal-ivory-ballgown-portrait" },
  {
    source: "WhatsApp Image 2026-10-16 at 20.50.56.jpeg",
    slug: "bridal-beaded-mermaid-long-sleeve",
  },
  {
    source: "WhatsApp Image 2026-10-16 at 20.43.22.jpeg",
    slug: "traditional-amber-lace-train",
  },
  {
    source: "WhatsApp Image 2026-10-16 at 20.45.06.jpeg",
    slug: "traditional-royal-beaded-corset",
  },
  {
    source: "WhatsApp Image 2026-10-16 at 20.49.50.jpeg",
    slug: "atelier-mermaid-mannequin",
  },
  // Studio photography added October 2026.
  { source: "reception-red-sequin.jpg", slug: "reception-red-sequin-ruffle" },
  {
    source: "traditional-copper-kente-bust.png",
    slug: "traditional-copper-beaded-kente",
  },
  {
    source: "traditional-kente-corset-train.png",
    slug: "traditional-kente-corset-train",
  },
  {
    source: "traditional-green-kente-corset.png",
    slug: "traditional-green-kente-corset",
  },
  {
    source: "traditional-kente-beaded-fishtail.png",
    slug: "traditional-kente-beaded-fishtail",
  },
  {
    source: "atelier-kente-beaded-mannequin.png",
    slug: "atelier-kente-beaded-mannequin",
  },
  { source: "reception-fuchsia-lace.png", slug: "reception-fuchsia-beaded-lace" },
  {
    source: "bridal-white-beaded-corset.png",
    slug: "bridal-white-beaded-corset",
  },
];

/**
 * Counts uniform near-black rows at the very top and bottom of a bitmap by
 * scanning full-resolution strips. Used to strip the letterbox bars left by
 * phone screenshots without ever cropping real image content.
 */
async function detectLetterbox(buffer, width, height) {
  const strip = Math.max(1, Math.min(height, Math.ceil(height * 0.3)));

  const countBlack = async (extractTop, fromBottom) => {
    const { data, info } = await sharp(buffer)
      .extract({ left: 0, top: extractTop, width, height: strip })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let count = 0;
    for (let i = 0; i < info.height; i += 1) {
      const y = fromBottom ? info.height - 1 - i : i;
      let max = 0;
      for (let x = 0; x < info.width; x += 1) {
        const value = data[y * info.width + x];
        if (value > max) max = value;
      }
      if (max >= BLACK) break;
      count += 1;
    }
    return count;
  };

  const top = await countBlack(0, false);
  const bottom = await countBlack(height - strip, true);

  const limit = Math.floor(height * MAX_TRIM_RATIO);
  if (top > limit || bottom > limit) return { top: 0, bottom: 0 };
  if (top + bottom >= height - 32) return { top: 0, bottom: 0 };

  return { top, bottom };
}

async function buildMaster({ source, slug }) {
  const input = path.join(SOURCE_DIR, source);
  if (!existsSync(input)) return null;

  // Normalise EXIF orientation once, losslessly, so every later pass works on
  // the same pixel grid.
  const normalized = await sharp(input)
    .rotate()
    .png()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = normalized.info;
  const bars = await detectLetterbox(normalized.data, width, height);

  const scaled = await sharp(normalized.data)
    .extract({ left: 0, top: bars.top, width, height: height - bars.top - bars.bottom })
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer({ resolveWithObject: true });

  const residual = await detectLetterbox(
    scaled.data,
    scaled.info.width,
    scaled.info.height,
  );

  const master = sharp(scaled.data).extract({
    left: 0,
    top: residual.top,
    width: scaled.info.width,
    height: scaled.info.height - residual.top - residual.bottom,
  });

  const info = await master
    .clone()
    .webp({ quality: MASTER_QUALITY, effort: 5 })
    .toFile(path.join(OUT_DIR, `${slug}.webp`));

  const blur = await master
    .clone()
    .resize({ width: 24 })
    .webp({ quality: 40 })
    .toBuffer();

  // A 1200×630 social card per photograph, so collection pages and stories
  // share the image they actually show rather than one generic card.
  await sharp(scaled.data)
    .extract({
      left: 0,
      top: residual.top,
      width: scaled.info.width,
      height: scaled.info.height - residual.top - residual.bottom,
    })
    .resize({ width: 1200, height: 630, fit: "cover", position: "top" })
    .jpeg({ quality: 84 })
    .toFile(path.join(OG_DIR, `${slug}.jpg`));

  const trimmedTop = bars.top + residual.top;
  const trimmedBottom = bars.bottom + residual.bottom;

  return {
    slug,
    file: `/photography/${slug}.webp`,
    width: info.width,
    height: info.height,
    aspectRatio: Number((info.width / info.height).toFixed(4)),
    orientation: info.height > info.width * 1.15 ? "portrait" : "landscape",
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    removedLetterbox:
      trimmedTop + trimmedBottom > 0
        ? { top: trimmedTop, bottom: trimmedBottom }
        : null,
  };
}

/** Composes the Open Graph / social-sharing card used across the site. */
async function buildOgImage(manifest, heroSlug = "bridal-ivory-ballgown-blossom") {
  const hero = manifest[heroSlug];
  if (!hero) return;

  const WIDTH = 1200;
  const HEIGHT = 630;
  const photoWidth = 470;

  const photo = await sharp(
    path.join(ROOT, "public", hero.file.replace(/^\//, "")),
  )
    .resize({ width: photoWidth, height: HEIGHT, fit: "cover", position: "top" })
    .toBuffer();

  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH - photoWidth + 1}" height="${HEIGHT}">
      <rect width="${WIDTH - photoWidth + 1}" height="${HEIGHT}" fill="#241A19"/>
      <g font-family="Georgia, 'Times New Roman', serif" fill="#F7F2EA">
        <text x="80" y="252" font-size="52" letter-spacing="7">MAGMENS</text>
        <text x="80" y="312" font-size="52" letter-spacing="7">COUTURE</text>
      </g>
      <rect x="80" y="352" width="96" height="1" fill="#B69A65"/>
      <text x="80" y="404" font-family="Georgia, 'Times New Roman', serif" font-size="25" fill="#CBA9A5">Redefining Elegance Through Craftsmanship</text>
      <text x="80" y="500" font-family="Helvetica, Arial, sans-serif" font-size="15" letter-spacing="4" fill="#A99A8C">LUXURY BRIDAL COUTURE · OBUASI, GHANA</text>
    </svg>`,
  );

  await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 3, background: "#241A19" },
  })
    .composite([
      { input: photo, left: WIDTH - photoWidth, top: 0 },
      { input: overlay, left: 0, top: 0 },
    ])
    .jpeg({ quality: 88 })
    .toFile(path.join(OG_DIR, "magmens-couture.jpg"));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(OG_DIR, { recursive: true });

  if (process.argv.includes("--og-only")) {
    const existing = JSON.parse(
      await readFile(MANIFEST, "utf8"),
    );
    await buildOgImage(existing);
    console.log("Social card written to public/og/magmens-couture.jpg");
    return;
  }

  const available = new Set(await readdir(SOURCE_DIR));
  const manifest = {};

  for (const entry of SOURCES) {
    if (!available.has(entry.source)) {
      console.warn(`· skipped (not found): ${entry.source}`);
      continue;
    }
    const record = await buildMaster(entry);
    if (!record) {
      console.warn(`· skipped (unreadable): ${entry.source}`);
      continue;
    }
    manifest[record.slug] = record;
    const bars = record.removedLetterbox
      ? `  (trimmed letterbox ${record.removedLetterbox.top}px / ${record.removedLetterbox.bottom}px)`
      : "";
    console.log(`✓ ${record.slug}  ${record.width}×${record.height}${bars}`);
  }

  // Preserve the previous manifest when the source folder is empty, so a build
  // never loses the dimension and blur data it depends on.
  if (Object.keys(manifest).length === 0 && existsSync(MANIFEST)) {
    console.warn("No source photographs found; keeping the existing manifest.");
    return;
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  await buildOgImage(manifest);

  console.log(
    `\n${Object.keys(manifest).length} photographs prepared in public/photography`,
  );
  console.log("Manifest written to src/content/image-manifest.json");
  console.log("Social card written to public/og/magmens-couture.jpg");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
