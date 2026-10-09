import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import MdComponent from "@/app/components/md/mdComponent"
import { fetchBlogposts, fetchPostBody } from "@/app/data/fetchData"
import Image from "next/image"
import { getImageSrc } from "@/app/utils/images"
import { getDate } from "@/app/utils/dateUtils"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { BlogCard } from "@/app/components/blog/blogCard"
import Sharer from "@/app/components/sharerWrapper"
import { domain, platform_name } from "@/app/data/consts"
import { ArrowLeft } from "react-feather";

interface BlogPageProps {
  params: Promise<{ id: string }>
}

// Prerender each post; dynamicParams stays true so new posts resolve on demand.
export async function generateStaticParams() {
  const posts = await fetchBlogposts()
  return posts.map((post) => ({ id: post.filename.replace(".md", "") }))
}

export async function generateMetadata({params}: BlogPageProps): Promise<Metadata> {
  const {id} = await params;
  const posts = await fetchBlogposts();
  const post = posts.find(p => p.filename === `${id}.md`)
  if (!post) {
    return {title: `Not found | ${platform_name}`};
  }
  const url = `https://${domain}/blog/${id}`;
  const image = getImageSrc(post.imageSrc);
  return {
    title: `${post.title} | ${platform_name}`,
    description: post.description,
    alternates: {canonical: `/blog/${id}`},
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      images: [image],
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      images: [image],
    },
  };
}

export default async function BlogPage({params}: BlogPageProps) {
  const {id} = await params
  const posts = await fetchBlogposts();
  const post = posts.find(p => p.filename === `${id}.md`)

  if (!post || !post.visible) {
    notFound()
  }

  const content = await fetchPostBody(id)

  const relatedPosts = posts.filter(p => p.tags.some(t => post.tags.includes(t)) && p.filename !== post.filename).slice(0, 3)
  const shareText = `Check out a new blog post: ${post.title}`

  const url = `https://${domain}/blog/${post.filename.replace(".md", "")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: getImageSrc(post.imageSrc),
    datePublished: new Date(post.date).toISOString(),
    url,
    mainEntityOfPage: url,
    author: {"@type": "Organization", name: platform_name, url: `https://${domain}`},
    publisher: {
      "@type": "Organization",
      name: platform_name,
      logo: {"@type": "ImageObject", url: `https://${domain}/logo.png`},
    },
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <header className="max-w-3xl mx-auto px-4 md:px-6 pt-12 md:pt-16">
        <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"}, {href: "/blog", text: "Stories"}, {href: `/blog/${id}`, text: post.title}]}/>
        <h1 className="mt-8 font-serif text-5xl md:text-7xl leading-[0.98] tracking-[-0.02em] text-balance">{post.title}</h1>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[var(--muted)]">{getDate(post.date)}</p>
          <div><Sharer shareText={shareText} url={url} labelText={""}/></div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-10">
        <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden bg-[var(--line)]">
          <Image src={getImageSrc(post.imageSrc)} alt={post.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover"/>
        </div>
      </div>
      <article className="max-w-2xl mx-auto px-4 md:px-6 mt-12">
        <MdComponent md={content}/>
        <div className="mt-12 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium hover:border-[var(--ink)]">
            <ArrowLeft className="size-4"/> All stories
          </Link>
          <div><Sharer shareText={shareText} url={url}/></div>
        </div>
      </article>
      {relatedPosts.length > 0 &&
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-8">
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em]">Related <em className="text-[var(--accent)]">stories</em></h2>
          <div className="mt-10 grid md:grid-cols-3 gap-x-6 gap-y-12">
            {relatedPosts.map((p) => (
              <BlogCard key={p.filename} post={p}/>
            ))}
          </div>
        </section>
      }
    </div>
  )
}
