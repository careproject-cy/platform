import { SectionTitle } from "@/components/ui/typography";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import matter from "gray-matter";

interface MdProps {
  text: string
}

interface HeadingProps {
  level: number;
}

type ExtendedHeadingProps = HeadingProps & Record<string, unknown>;

const Heading: React.FC<unknown> = (props) => {
  const { level, ...rest } = props as ExtendedHeadingProps;
  return <SectionTitle className={`${level}`} {...rest} />;
};

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
      Heading: Heading,
    },
  });
};

export default Md;
