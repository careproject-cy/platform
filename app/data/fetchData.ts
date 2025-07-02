import { headers } from "next/headers";
import { notFound } from 'next/navigation'
import { BlogPostMetadata } from "./blogPostMetadata";
import { DogMetadata } from "./dogMetadata";
import { unstable_cache } from "next/cache";
import matter from "gray-matter";
import { promises as fs } from 'fs';
import path from 'path';

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
  const {content, data: frontmatter} = matter(text);
  return {content, frontmatter};
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

async function getCachedData<T>(filename: string): Promise<T[]> {
  const cachedReadFile = unstable_cache(
    async (file: string) => {
      console.log(`Reading ${file} from disk...`); // This logs only on a cache miss
      const filePath = path.join(process.cwd(), 'data', file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContent);
    },
    [filename], // Use the filename as a unique key part
    {revalidate: 3600} // Example: cache for 1 hour
  );

  return await cachedReadFile(filename) as T[];
}

export async function fetchBlogposts() {
  const posts = await getCachedData<BlogPostMetadata>('blogposts.json');
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchDogs() {
  const dogs = await getCachedData<DogMetadata>('dogs.json');
  return dogs.sort((a, b) => new Date(b.added).getTime() - new Date(a.added).getTime());
}
