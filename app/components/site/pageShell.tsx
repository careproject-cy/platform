import { Container, Section } from "@vaneui/ui"

// Page-width column for inner pages; the page header supplies the top spacing.
export default function PageShell({ size = "lg", children }: { size?: "xs" | "lg"; children: React.ReactNode }) {
  return (
    <Section lg className="pt-0 max-tablet:pt-0 max-mobile:pt-0">
      <Container xs={size === "xs"} lg={size === "lg"} itemsStretch>
        {children}
      </Container>
    </Section>
  )
}
