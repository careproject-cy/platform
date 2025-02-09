import { SectionTitle } from "@/components/ui/typography";
import Markdoc from "@markdoc/markdoc";
import React from "react";

interface MdProps {
  text: string
}

const Md: React.FC<MdProps> = ({ text }) => {
  const ast = Markdoc.parse(text);

  const content = Markdoc.transform(ast, {
    nodes: {
      heading: {
        render: "Heading",
        attributes: {
          level: { type: Number },
        },
      },
    },
  });

  return Markdoc.renderers.react(content, React, {
    components: {
      Heading: SectionTitle as React.ComponentType<unknown>, // 👈 Ensure this matches the `render` key above
    },
  });
};

export default Md;
