import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import pg from "pg";

async function fromPostgres() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const result = await pool.query(`
      SELECT email, source, landing_page, utm_source, status, created_at
      FROM newsletter_subscribers
      ORDER BY created_at DESC
    `);
    return result.rows;
  } finally {
    await pool.end();
  }
}

async function fromDevelopmentFile() {
  try {
    const content = await readFile(resolve("data/newsletter.jsonl"), "utf8");
    return content.trim().split("\n").filter(Boolean).map((line) => {
      const entry = JSON.parse(line);
      return {
        email: entry.email,
        source: entry.source,
        landing_page: entry.landingPage,
        utm_source: entry.utmSource || "",
        status: "active",
        created_at: entry.createdAt,
      };
    }).reverse();
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

const subscribers = process.env.DATABASE_URL ? await fromPostgres() : await fromDevelopmentFile();

if (subscribers.length === 0) {
  console.log("No newsletter subscribers yet.");
} else {
  console.table(subscribers);
  console.log(`${subscribers.length} subscriber${subscribers.length === 1 ? "" : "s"}`);
}
