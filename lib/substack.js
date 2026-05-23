const FEED_URL = "https://haltblog.substack.com/feed";

// Refetches the feed every hour so new posts appear without a manual rebuild.
export async function fetchRecentPosts(limit = 4) {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml, limit);
  } catch (err) {
    console.error("Substack RSS fetch failed:", err);
    return [];
  }
}

function parseFeed(xml, limit) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) && items.length < limit) {
    const block = match[1];
    const rawDescription = extract(block, "description");
    items.push({
      title: decodeEntities(extract(block, "title")),
      excerpt: makeExcerpt(rawDescription),
      url: extract(block, "link"),
      date: formatDate(extract(block, "pubDate")),
      image: extractEnclosureUrl(block),
    });
  }
  return items;
}

function extractEnclosureUrl(block) {
  const m = block.match(/<enclosure[^>]*url="([^"]+)"/i);
  return m ? m[1] : null;
}

function extract(block, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  let val = m[1].trim();
  val = val.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
  return val.trim();
}

function makeExcerpt(html, maxLen = 200) {
  const text = decodeEntities(stripHtml(html));
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSentenceEnd = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("? "),
    cut.lastIndexOf("! ")
  );
  if (lastSentenceEnd > maxLen * 0.6) {
    return cut.slice(0, lastSentenceEnd + 1);
  }
  return cut.replace(/\s+\S*$/, "") + "...";
}

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&mdash;/g, ", ")
    .replace(/&ndash;/g, "-");
}

function formatDate(rssDate) {
  const d = new Date(rssDate);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
