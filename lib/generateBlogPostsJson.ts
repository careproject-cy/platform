import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

async function generateBlogPostsJson() {
  try {
    const blogDir = path.join(process.cwd(), "public", "data", "blog");
    const files = await fs.readdir(blogDir);

    const blogPosts = [];

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = path.join(blogDir, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContent);
        blogPosts.push({ filename: file, ...frontmatter });
      }
    }

    const outputPath = path.join(process.cwd(), "public", "data", "blogposts.json");
    await fs.writeFile(outputPath, JSON.stringify(blogPosts, null, 2), "utf-8");

    console.log(`Successfully generated ${outputPath}`);
  } catch (error) {
    console.error("Error generating blog posts JSON:", error);
    process.exit(1);
  }
}

generateBlogPostsJson();
