import { headers } from "next/headers";
import { notFound } from 'next/navigation'
import { BlogPostMetadata } from "./blogPostMetadata";
import { DogMetadata } from "./dogMetadata";

export async function getAbsoluteUrl(relUrl: string) {
  const host = (await headers()).get("host")!;
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}/${relUrl}`;
}

export async function fetchText(relUrl: string) {
  const res = await fetch(await getAbsoluteUrl(relUrl));

  if (!res.ok) {
    notFound();
  }

  const text = await res.text();
  return text;
}

export async function fetchJson(relUrl: string) {
  const res = await fetch(await getAbsoluteUrl(relUrl));

  if (!res.ok) {
    notFound();
  }

  const json = await res.json();
  return json;
}

export async function fetchBlogposts() {
  const posts = (await fetchJson("data/blogposts.json")) as BlogPostMetadata[];
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchDogs() {
  const posts = (await fetchJson("data/dogs/dogs.json")) as DogMetadata[];
  return posts.sort((a, b) => new Date(b.added).getTime() - new Date(a.added).getTime());
}
