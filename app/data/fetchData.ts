import { headers } from "next/headers";
import { notFound } from 'next/navigation'
import { BlogPostMetadata } from "./blogPostMetadata";
import { DogMetadata } from "./dogMetadata";
import { unstable_cache } from "next/cache";
import matter from "gray-matter";

const cacheRevalidate = process.env.NODE_ENV === "development" ? 1 : 60;

export async function getAbsoluteUrl(relUrl: string, host: string) {
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}/${relUrl}`;
}

async function fetchMdInternal(relUrl: string, host: string) {
  const url = await getAbsoluteUrl(relUrl, host);
  const res = await fetch(url);
  if (!res.ok) {
    notFound();
  }
  const text = await res.text();
  const { content, data: frontmatter } = matter(text);
  return { content, frontmatter };
}

export async function fetchMd(relUrl: string) {
  const host = (await headers()).get("host")!;
  const cachedFetchMd = unstable_cache(fetchMdInternal,
    [relUrl], // Use the URL as part of the cache key
    {
      tags: ["md", relUrl],
      revalidate: cacheRevalidate, // Cache revalidation time in seconds
    });
  return cachedFetchMd(relUrl, host);
}

async function fetchJsonInternal(relUrl: string, host: string) {
  const url = await getAbsoluteUrl(relUrl, host);
  const res = await fetch(url);
  if (!res.ok) {
    notFound();
  }
  const json = await res.json();
  return json;
}

export async function fetchJson(relUrl: string) {
  const host = (await headers()).get("host")!;
  const cachedFetchJson = unstable_cache(fetchJsonInternal,
    [relUrl], // Use the URL as part of the cache key
    {
      tags: ["json", relUrl],
      revalidate: cacheRevalidate, // Cache revalidation time in seconds
    });
  return cachedFetchJson(relUrl, host);
}

export async function fetchBlogposts() {
  const posts = (await fetchJson("data/blogposts.json")) as BlogPostMetadata[];
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchDogs() {
  const posts = (await fetchJson("data/dogs/dogs.json")) as DogMetadata[];
  return posts.sort((a, b) => new Date(b.added).getTime() - new Date(a.added).getTime());
}
