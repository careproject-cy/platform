import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { BlogPostMetadata } from "@/app/data/blogPostMetadata";

async function generateBlogPostsJson() {
  try {
    const outputPath = path.join(process.cwd(), "data", "blogposts.json");

    // Delete old file if it exists
    try {
      await fs.unlink(outputPath);
      console.log(`Deleted old ${outputPath}`);
    } catch {
      // File doesn't exist, that's fine
    }

    const blogDir = path.join(process.cwd(), "data", "blog");
    const files = await fs.readdir(blogDir);

    const blogPosts: BlogPostMetadata[] = [];

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = path.join(blogDir, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContent);
        const blogpost: BlogPostMetadata = {
          filename: file,
          title: frontmatter.title,
          date: frontmatter.date,
          description: frontmatter.description,
          imageSrc: frontmatter.imageSrc,
          tags: frontmatter.tags,
          visible: frontmatter.visible ?? true,
        }
        if(blogpost.visible) {
          blogPosts.push(blogpost);
        }
      }
    }

    await fs.writeFile(outputPath, JSON.stringify(blogPosts, null, 2), "utf-8");

    console.log(`Successfully generated ${outputPath}`);
  } catch (error) {
    console.error("Error generating blog posts JSON:", error);
    process.exit(1);
  }
}

generateBlogPostsJson();
