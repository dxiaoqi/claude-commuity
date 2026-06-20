import { createHash } from "crypto";
import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { Pool } from "pg";

export type Subscriber = {
  email: string;
  source: string;
  landingPage: string;
  referrer?: string | null;
  locale?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  ipHash: string;
};

let pool: Pool | undefined;
let initialized = false;

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  pool ||= new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
  return pool;
}

async function ensureTable(db: Pool) {
  if (initialized) return;
  await db.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'active',
      source TEXT NOT NULL,
      landing_page TEXT NOT NULL,
      referrer TEXT,
      locale TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      utm_term TEXT,
      ip_hash TEXT NOT NULL,
      consented_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS newsletter_source_idx ON newsletter_subscribers (source);
    CREATE INDEX IF NOT EXISTS newsletter_created_at_idx ON newsletter_subscribers (created_at DESC);
  `);
  initialized = true;
}

async function saveToPostgres(record: Subscriber) {
  const db = getPool();
  if (!db) return null;
  await ensureTable(db);
  const result = await db.query(
    `INSERT INTO newsletter_subscribers
      (email, source, landing_page, referrer, locale, utm_source, utm_medium, utm_campaign, utm_content, utm_term, ip_hash)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     ON CONFLICT (email) DO UPDATE SET updated_at = NOW(), status = 'active'
     RETURNING (xmax = 0) AS inserted`,
    [record.email, record.source, record.landingPage, record.referrer, record.locale, record.utmSource, record.utmMedium, record.utmCampaign, record.utmContent, record.utmTerm, record.ipHash],
  );
  return { duplicate: !result.rows[0]?.inserted };
}

async function saveToDevelopmentFile(record: Subscriber) {
  const filePath = path.join(process.cwd(), "data", "newsletter.jsonl");
  await mkdir(path.dirname(filePath), { recursive: true });
  let duplicate = false;
  try {
    const existing = await readFile(filePath, "utf8");
    duplicate = existing.split("\n").some((line) => {
      try { return JSON.parse(line).email === record.email; } catch { return false; }
    });
  } catch { /* First subscriber. */ }
  if (!duplicate) await appendFile(filePath, `${JSON.stringify({ ...record, createdAt: new Date().toISOString() })}\n`, { mode: 0o600 });
  return { duplicate };
}

export async function saveSubscriber(record: Subscriber) {
  const result = await saveToPostgres(record);
  if (result) return result;
  if (process.env.NODE_ENV === "production") throw new Error("Newsletter storage is not configured.");
  return saveToDevelopmentFile(record);
}

export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT || "development-only-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
