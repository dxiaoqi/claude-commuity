import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getSubscriberDashboard, isAdminHostname, type SubscriberFilters } from "@/lib/subscriber-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Subscribers",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function valueOf(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Shanghai",
  }).format(value);
}

export default async function SubscribersPage({ searchParams }: { searchParams: SearchParams }) {
  const requestHeaders = await headers();
  if (!isAdminHostname(requestHeaders.get("host"))) notFound();

  const params = await searchParams;
  const query = valueOf(params.q).trim().slice(0, 120);
  const source = valueOf(params.source).trim().slice(0, 80);
  const rawStatus = valueOf(params.status);
  const status = rawStatus === "active" || rawStatus === "unsubscribed" ? rawStatus : undefined;
  const filters: SubscriberFilters = { query: query || undefined, source: source || undefined, status };
  const { rows, summary, sources } = await getSubscriberDashboard(filters);
  const exportParams = new URLSearchParams();
  if (query) exportParams.set("q", query);
  if (source) exportParams.set("source", source);
  if (status) exportParams.set("status", status);

  return (
    <main id="main" className="admin-page">
      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <p className="admin-kicker"><span /> CLAUDE COMMUNITY / OPS</p>
            <h1>Newsletter<br /><em>subscribers.</em></h1>
            <p>实时读取生产 PostgreSQL。所有时间均按北京时间显示。</p>
          </div>
          <a className="admin-export" href={`/admin/subscribers/export${exportParams.size ? `?${exportParams}` : ""}`}>
            ↓ 导出当前结果 CSV
          </a>
        </header>

        <div className="admin-stats" aria-label="订阅概览">
          <article><span>全部订阅</span><strong>{summary.total}</strong></article>
          <article><span>活跃订阅</span><strong>{summary.active}</strong></article>
          <article><span>近 7 天新增</span><strong>{summary.last7Days}</strong></article>
          <article><span>当前筛选结果</span><strong>{rows.length}</strong></article>
        </div>

        <form className="admin-filters" method="get">
          <label>
            <span>搜索邮箱或来源</span>
            <input name="q" type="search" defaultValue={query} placeholder="name@example.com" />
          </label>
          <label>
            <span>状态</span>
            <select name="status" defaultValue={status || ""}>
              <option value="">全部状态</option>
              <option value="active">活跃</option>
              <option value="unsubscribed">已退订</option>
            </select>
          </label>
          <label>
            <span>来源</span>
            <select name="source" defaultValue={source}>
              <option value="">全部来源</option>
              {sources.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <button type="submit">应用筛选 →</button>
          {(query || source || status) && <a href="/admin/subscribers">清除</a>}
        </form>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>邮箱</th><th>状态</th><th>来源</th><th>落地页 / UTM</th><th>订阅时间</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.email}>
                  <td><strong>{row.email}</strong><small>{row.locale || "未知语言"}</small></td>
                  <td><span className={`admin-status ${row.status}`}>{row.status}</span></td>
                  <td>{row.source}</td>
                  <td><code>{row.landing_page}</code><small>{row.utm_source ? `${row.utm_source}${row.utm_campaign ? ` / ${row.utm_campaign}` : ""}` : "无 UTM"}</small></td>
                  <td>{formatDate(row.created_at)}</td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td className="admin-empty" colSpan={5}>没有符合条件的订阅记录。</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="admin-footnote">最多显示最近 500 条；CSV 导出包含全部筛选结果。</p>
      </section>
    </main>
  );
}

