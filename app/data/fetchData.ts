import { notFound } from 'next/navigation'
import { BlogPostMetadata } from "./blogPostMetadata";
import { DogMetadata } from "./dogMetadata";
import { unstable_cache } from "next/cache";
import matter from "gray-matter";
import { promises as fs } from 'fs';
import path from 'path';

const cacheRevalidate = process.env.NODE_ENV === "development" ? 1 : 60;

async function readFileAndParse(relUrl: string) {
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

export async function fetchMd(relUrl: string) {
  const cachedFetch = unstable_cache(
    // The function to cache
    (url) => readFileAndParse(url),
    // A base key for this cache entry
    ['md'],
    {
      // Dynamic tags for on-demand revalidation
      tags: [relUrl],
      revalidate: cacheRevalidate,
    }
  );

  return cachedFetch(relUrl);
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
    {revalidate: cacheRevalidate} // Example: cache for 1 hour
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
