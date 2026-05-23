const SITE = "https://troykarnes.com";

export default function sitemap() {
  const routes = ["", "/heros-draft", "/ghostwriting", "/about", "/writing", "/begin"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
