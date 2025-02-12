import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  
  const host = request.headers.get("host")!;
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const { id } = await params

  const absoluteUrl = `${baseUrl}/data/blog/${id}.md`;
  const res = await fetch(absoluteUrl);

  if (!res.ok) {
    return new NextResponse("Markdown file not found", { status: 404 });
  }

  const markdown = await res.text();

  return new NextResponse(markdown, {
    headers: { "Content-Type": "text/markdown" },
  });
}