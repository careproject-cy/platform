import { headers } from "next/headers";

export async function getAbsoluteUrl(relUrl: string) {
  const host = (await headers()).get("host")!;
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}/${relUrl}`;
}

export async function fetchText(relUrl: string) {
  const res = await fetch(await getAbsoluteUrl(relUrl));
  const text = await res.text();
  return text;
}

export async function fetchJson(relUrl: string) {
  const res = await fetch(await getAbsoluteUrl(relUrl));
  const text = await res.json();
  return text;
}
