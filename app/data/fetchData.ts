import { notFound } from 'next/navigation'
import { BlogPostMetadata } from "./blogPostMetadata";
import { DogMetadata } from "./dogMetadata";
import { unstable_cache } from "next/cache";
import matter from "gray-matter";
import { promises as fs } from 'fs';
import path from 'path';

const cacheRevalidate = process.env.NODE_ENV === "development" ? 300 : 3600; // 5 minutes in dev, 1 hour in prod

// Simple in-memory cache for development
const memoryCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = cacheRevalidate * 1000; // Convert to milliseconds

type MdResult = {
  content: string;
  frontmatter: Record<string, unknown>;
};

async function readFileAndParse(relUrl: string): Promise<MdResult> {
  const filePath = path.join(process.cwd(), relUrl);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const {content, data: frontmatter} = matter(fileContents);
    return {content, frontmatter};
  } catch (error) {
    console.error(error);
    // If the file doesn't exist, trigger a 404 page.
    return notFound();
  }
}

export async function fetchMd(relUrl: string): Promise<MdResult> {
  if (process.env.NODE_ENV === "development") {
    // Use simple memory cache in development
    const cacheKey = `md:${relUrl}`;
    const cached = memoryCache.get(cacheKey);
    
    if (cached) {
      if ((Date.now() - cached.timestamp) < CACHE_TTL) {
        return cached.data as MdResult;
      }
      memoryCache.delete(cacheKey);
    }

    const result = await readFileAndParse(relUrl);
    memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } else {
    // Use Next.js cache in production
    const cachedFetch = unstable_cache(
      (url) => readFileAndParse(url),
      ['md'],
      {
        tags: [relUrl],
        revalidate: cacheRevalidate,
      }
    );
    return cachedFetch(relUrl);
  }
}

async function readJsonFile(filename: string) {
  console.log(`Reading ${filename} from disk...`);
  const filePath = path.join(process.cwd(), 'data', filename);
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

async function getData<T>(filename: string): Promise<T[]> {
  if (process.env.NODE_ENV === "development") {
    // Use simple memory cache in development for faster reloads
    const cacheKey = `data:${filename}`;
    const cached = memoryCache.get(cacheKey);

    if (cached) {
      if ((Date.now() - cached.timestamp) < CACHE_TTL) {
        return cached.data as T[];
      }
      memoryCache.delete(cacheKey);
    }

    const result = await readJsonFile(filename);
    memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } else {
    // In production, read JSON directly - no caching needed since
    // the file is generated at build time and fresh per deployment
    return await readJsonFile(filename) as T[];
  }
}

export async function fetchBlogposts() {
  const posts = await getData<BlogPostMetadata>('blogposts.json');
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchDogs() {
  const dogs = await getData<DogMetadata>('dogs.json');
  return dogs.sort((a, b) => new Date(b.added).getTime() - new Date(a.added).getTime());
}
