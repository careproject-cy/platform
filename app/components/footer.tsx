import { Container, Section } from "@/components/ui/layout"
import { platform_name } from "../data/consts"

export default function Layout() {
  return (
    <Section className="bg-gray-100 border-t p-5" tag={'footer'}>
      <Container className="py-3 px-0">
        <p className="text-sm">&copy; 2025 {platform_name}. All rights reserved.</p>
      </Container>
    </Section>
  )
}

