import { Pool } from "pg";

export type SubscriberFilters = {
  query?: string;
  source?: string;
  status?: "active" | "unsubscribed";
};

export type SubscriberRow = {
  email: string;
  status: string;
  source: string;
  landing_page: string;
  referrer: string | null;
  locale: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  consented_at: Date;
  created_at: Date;
  updated_at: Date;
};

let adminPool: Pool | undefined;

function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("Subscriber database is not configured.");
  adminPool ||= new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  return adminPool;
}

function buildWhere(filters: SubscriberFilters) {
  const clauses: string[] = [];
  const values: string[] = [];
  const add = (clause: string, value: string) => {
    values.push(value);
    clauses.push(clause.replace("?", `$${values.length}`));
  };

  if (filters.query) {
    values.push(`%${filters.query}%`, `%${filters.query}%`);
    clauses.push(`(email ILIKE $${values.length - 1} OR source ILIKE $${values.length})`);
  }
  if (filters.source) add("source = ?", filters.source);
  if (filters.status) add("status = ?", filters.status);

  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", values };
}

export async function getSubscriberDashboard(filters: SubscriberFilters) {
  const db = getPool();
  const where = buildWhere(filters);
  const [rows, summary, sources] = await Promise.all([
    db.query<SubscriberRow>(
      `SELECT email, status, source, landing_page, referrer, locale,
              utm_source, utm_medium, utm_campaign, utm_content, utm_term,
              consented_at, created_at, updated_at
       FROM newsletter_subscribers
       ${where.sql}
       ORDER BY created_at DESC
       LIMIT 500`,
      where.values,
    ),
    db.query<{ total: string; active: string; last_7_days: string }>(`
      SELECT COUNT(*)::text AS total,
             COUNT(*) FILTER (WHERE status = 'active')::text AS active,
             COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::text AS last_7_days
      FROM newsletter_subscribers
    `),
    db.query<{ source: string }>(`
      SELECT DISTINCT source FROM newsletter_subscribers ORDER BY source ASC
    `),
  ]);

  return {
    rows: rows.rows,
    summary: {
      total: Number(summary.rows[0]?.total || 0),
      active: Number(summary.rows[0]?.active || 0),
      last7Days: Number(summary.rows[0]?.last_7_days || 0),
    },
    sources: sources.rows.map((row) => row.source),
  };
}

export async function getSubscribersForExport(filters: SubscriberFilters) {
  const db = getPool();
  const where = buildWhere(filters);
  const result = await db.query<SubscriberRow>(
    `SELECT email, status, source, landing_page, referrer, locale,
            utm_source, utm_medium, utm_campaign, utm_content, utm_term,
            consented_at, created_at, updated_at
     FROM newsletter_subscribers
     ${where.sql}
     ORDER BY created_at DESC`,
    where.values,
  );
  return result.rows;
}

export function isAdminHostname(host: string | null) {
  const hostname = host?.split(":")[0]?.toLowerCase();
  return hostname === "admin.claudecommunity.com" || hostname === "localhost" || hostname === "127.0.0.1";
}
