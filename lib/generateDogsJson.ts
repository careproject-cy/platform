import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { DogMetadata } from "@/app/data/dogMetadata";

async function generateDogsJson() {
  try {
    const outputPath = path.join(process.cwd(), "data", "dogs.json");

    // Delete old file if it exists
    try {
      await fs.unlink(outputPath);
      console.log(`Deleted old ${outputPath}`);
    } catch {
      // File doesn't exist, that's fine
    }

    const dogDir = path.join(process.cwd(), "data", "dogs");
    const files = await fs.readdir(dogDir, { recursive: true });

    const dogs: DogMetadata[] = [];

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = path.join(dogDir, file);
        const folder = path.dirname(filePath).split(path.sep).pop();
        const filename = path.basename(filePath);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContent);
        const dog: DogMetadata = {
          filename: filename,
          location: folder || "",
          name: frontmatter.name,
          breed: frontmatter.breed,
          age: frontmatter.age,
          gender: frontmatter.gender,
          status: frontmatter.status,
          images: frontmatter.images,
          size: frontmatter.size,
          added: frontmatter.added,
        }
        dogs.push(dog);
      }
    }

    await fs.writeFile(outputPath, JSON.stringify(dogs, null, 2), "utf-8");

    console.log(`Successfully generated ${outputPath}`);
  } catch (error) {
    console.error("Error generating blog posts JSON:", error);
    process.exit(1);
  }
}

generateDogsJson();
