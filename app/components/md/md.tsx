import { Link as TyLink, TextTitle } from "@/components/ui/typography";
import Link from 'next/link'
import Markdoc from "@markdoc/markdoc";
import React from "react";
import matter from "gray-matter";
import { Col } from "@/components/ui/layout";

const MdHeading: React.FC<unknown> = (props) => {
  const { level, ...rest } = props as { level: number; } & Record<string, unknown>;
  const tag = `h${level}`;
  let size: { xs?: boolean; sm?: boolean; md?: boolean; lg?: boolean; xl?: boolean } = {};
  switch (level) {
    case 1: size = { xl: true }; break;
    case 2: size = { lg: true }; break;
    case 3: size = { md: true }; break;
    case 4: size = { sm: true }; break;
    case 5: size = { xs: true }; break;
  }
  return <TextTitle {...rest} {...size} tag={tag} />;
};

const MdLink: React.FC<unknown> = (props) => {
  const { href, title, ...rest } = props as { href: string; title: string; } & Record<string, unknown>;
  return <TyLink {...rest} href={href} title={title} tag={Link}/>;
};

const MdContainer: React.FC<unknown> = (props) => {
  const { ...rest } = props as Record<string, unknown>;
  return <Col className="gap-3" {...rest} />;
}

const Md: React.FC<{ text: string }> = ({ text }) => {
  const { content, data: frontmatter } = matter(text);
  const ast = Markdoc.parse(content);
  const config = {
    nodes: {
      document: {
        render: "MdContainer",
      },
      heading: {
        render: "MdHeading",
        attributes: {
          level: { type: Number },
        },
      },
      link: {
        render: "MdLink",
        attributes: {
          href: { type: String },
          title: { type: String },
        },
      },
    },
    variables: { markdoc: { frontmatter } }
  }

  const transformed = Markdoc.transform(ast, config);

  return Markdoc.renderers.react(transformed, React, {
    components: {
      MdHeading: MdHeading,
      MdContainer: MdContainer,
      MdLink: MdLink,
    },
  });
};

export default Md;
