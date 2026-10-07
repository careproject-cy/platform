import Image from "next/image"

export default function Photo({ src, alt, className = "", imgClassName = "", sizes = "(max-width: 768px) 100vw, 50vw", priority }: {
  src: string; alt: string; className?: string; imgClassName?: string; sizes?: string; priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`}/>
    </div>
  )
}
