import Badge from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  id: string
  title: string
  date: string
  image: string
  desc: string
  large: boolean
}

export function BlogCard({ id, title, date, image, desc, large }: BlogCardProps) {
  return (
    <div className={`w-full flex ${large ? "flex-row gap-10" : "flex-col gap-4"}`}>
      <Link href={`/blog/${id}`} className="w-full">
        <div className="w-full relative rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            className="relative object-cover h-auto w-full aspect-3/2"
          />
        </div>
      </Link>
      <div className={`w-full flex flex-col ${large ? "gap-6 justify-center" : "gap-2"}`}>
        {large &&
          <Badge>Meet the dogs</Badge>
        }
        <h3 className={`font-semibold leading-none tracking-tight ${large ? "text-3xl" : "text-2xl"}`}>
          <Link href={`/blog/${id}`} className="w-full">
            {title}
          </Link>
        </h3>
        <div className={`text-sm ${large ? "line-clamp-3" : "line-clamp-2"}`}>{desc}</div>
        <div className="text-sm text-muted-foreground">{date}</div>
        {large &&
          <div className="flex">
            <Link href={`/blog/${id}`}>
              <div className="flex justify-center items-center border-1 rounded-2xl px-4 py-2 text-xl font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300">Read more</div>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

