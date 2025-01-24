import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  id: string
  title: string
  date: string
  image: string
  desc: string
}

export default function BlogCard({ id, title, date, image, desc }: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`} className="w-full">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full relative rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            className="relative object-cover h-auto w-full aspect-3/2"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
          <div className="text-sm line-clamp-2">{desc}</div>
          <div className="text-sm text-muted-foreground">{date}</div>
        </div>
      </div>
    </Link>
  )
}

