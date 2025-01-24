import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  id: string
  title: string
  date: string
  image: string
}

export default function BlogCard({ id, title, date, image }: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`} className="w-full">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full relative min-w-full rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="relative object-cover h-auto w-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-row justify-between items-center gap-1">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
          </div>
          <div className="text-sm text-muted-foreground">{date}</div>
        </div>
      </div>
    </Link>
  )
}

