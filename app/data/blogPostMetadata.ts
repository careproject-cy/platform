import type { ImageInfo } from "./dogMetadata"

export interface BlogPostMetadata {
  filename: string
  title: string
  date: Date
  description: string
  imageSrc: string
  image?: ImageInfo
  tags: string[]
  visible: boolean
  updatedAt: Date
}
