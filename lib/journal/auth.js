// HMAC-signed session tokens. Edge-compatible (Web Crypto only).

const COOKIE_NAME = "journal_session";
const SESSION_DAYS = 180;

async function hmac(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  // base64url without Buffer (edge-runtime safe)
  let s = "";
  for (const b of new Uint8Array(sig)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createToken() {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const sig = await hmac(process.env.JOURNAL_SESSION_SECRET, `journal|${exp}`);
  return `${exp}.${sig}`;
}

export async function verifyToken(token) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = await hmac(
    process.env.JOURNAL_SESSION_SECRET,
    `journal|${exp}`
  );
  return sig === expected;
}

export { COOKIE_NAME, SESSION_DAYS };
