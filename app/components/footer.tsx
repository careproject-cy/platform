import { Container, Section } from "@/components/ui/layout"
import { platform_name } from "../data/consts"

export default function Layout() {
  return (
    <Section className="bg-gray-100 border-t" tag={'footer'}>
      <Container xl>
        <p className="text-sm">&copy; 2025 {platform_name}. All rights reserved.</p>
      </Container>
    </Section>
  )
}

