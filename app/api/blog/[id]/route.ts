import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Get the absolute base URL from the request
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Construct the absolute URL for the markdown file
  const absoluteUrl = `${baseUrl}/blog/${params.id}.md`;

  // Fetch the Markdown file
  const res = await fetch(absoluteUrl);
  if (!res.ok) {
    return new Response("Markdown file not found", { status: 404 });
  }

  const markdown = await res.text();

  return new NextResponse(markdown, {
    headers: { "Content-Type": "text/markdown" },
  });
}
