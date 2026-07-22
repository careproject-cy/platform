import { notFound } from 'next/navigation'
import { BlogPostMetadata } from "./blogPostMetadata";
import { DogMetadata } from "./dogMetadata";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Dog, Media, Post } from "@/payload-types";
import { cache } from "react";
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

/** Static pages under data/pages/ are still plain Markdown files; dogs and posts live in Payload. */
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

async function payloadClient() {
  return getPayload({ config });
}

function mediaUrl(media: number | Media | null | undefined): string | null {
  return typeof media === 'object' && media?.url ? media.url : null;
}

// Accepts a Dog with or without body - the listing query omits it for performance.
function toDogMetadata(dog: Omit<Dog, 'body'>): DogMetadata {
  return {
    filename: `${dog.slug}.md`,
    location: dog.location,
    name: dog.name,
    breed: dog.breed,
    age: dog.age,
    gender: dog.gender,
    status: dog.status,
    images: (dog.images ?? []).map(mediaUrl).filter((url): url is string => url !== null),
    size: dog.size,
    added: new Date(dog.added),
  };
}

function toBlogPostMetadata(post: Post): BlogPostMetadata {
  return {
    filename: `${post.slug}.md`,
    title: post.title,
    date: new Date(post.date),
    description: post.description,
    imageSrc: mediaUrl(post.coverImage) ?? '',
    tags: post.tags ?? [],
    visible: post.visible ?? false,
  };
}

// React cache() dedupes within one request; across requests Next's route cache holds the
// rendered page until a Payload afterChange hook calls revalidatePath.
const readDogs = cache(async (): Promise<DogMetadata[]> => {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: 'dogs',
    depth: 1,
    pagination: false,
    sort: '-added',
    // The listing needs metadata + images, never the markdown body of all 100 dogs per render.
    select: { body: false },
  });
  return docs.map(toDogMetadata);
});

const readBlogposts = cache(async (): Promise<BlogPostMetadata[]> => {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    pagination: false,
    sort: '-date',
    // Hidden posts must stay out of every listing, as the old JSON generator did.
    where: { visible: { equals: true } },
  });
  return docs.map(toBlogPostMetadata);
});

export async function fetchBlogposts(): Promise<BlogPostMetadata[]> {
  const posts = await readBlogposts();
  // Copy before sorting - the cached array is shared across callers in this request.
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchDogs(): Promise<DogMetadata[]> {
  const dogs = await readDogs();
  return [...dogs].sort((a, b) => new Date(b.added).getTime() - new Date(a.added).getTime());
}

const readDogBody = cache(async (location: string, slug: string): Promise<string | null> => {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: 'dogs',
    depth: 0,
    limit: 1,
    where: { and: [{ slug: { equals: slug } }, { location: { equals: location } }] },
  });
  return docs[0]?.body ?? null;
});

const readPostBody = cache(async (slug: string): Promise<string | null> => {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  return docs[0]?.body ?? null;
});

export async function fetchDogBody(location: string, slug: string): Promise<string> {
  const body = await readDogBody(location, slug);
  if (body === null) notFound();
  return body;
}

export async function fetchPostBody(slug: string): Promise<string> {
  const body = await readPostBody(slug);
  if (body === null) notFound();
  return body;
}
