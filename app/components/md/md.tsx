import { SectionTitle } from "@/components/ui/typography";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import matter from "gray-matter";

interface MdProps {
  text: string
}

const Md: React.FC<MdProps> = ({ text }) => {
  const { content, data: frontmatter } = matter(text);
  const ast = Markdoc.parse(content);
  const config = {
    nodes: {
      heading: {
        render: "Heading",
        attributes: {
          level: { type: Number },
        },
      },
    },
    variables: { markdoc: { frontmatter } }
  }

  const transformed = Markdoc.transform(ast, config);

  return Markdoc.renderers.react(transformed, React, {
    components: {
      Heading: SectionTitle as React.ComponentType<unknown>, // 👈 Ensure this matches the `render` key above
    },
  });
};

export default Md;
