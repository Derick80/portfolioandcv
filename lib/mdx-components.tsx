import Image, { ImageProps } from "next/image";
import {
  Children,
  createElement,
  Fragment,
  HTMLAttributes,
  HtmlHTMLAttributes,
  isValidElement,
  PropsWithChildren,
} from "react";
import type { JSX } from "react";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki";
import { cn } from "./utils";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}
function createHeading(level: number) {
  const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
    const childrenString = Children.toArray(children).join("");
    const slug = slugify(childrenString);
    const levelMap: Record<number, string> = {
      1: "text-3xl ",
      2: "text-2xl",
      3: "text-xl",
      4: "text-lg",
      5: "text-base",
      6: "text-sm",
    };
    return createElement(`h${level}`, { id: slug }, [
      createElement(
        "a",
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: ` ${levelMap[level]}`,
        },
        children,
      ),
    ]);
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

/**
 * Props for the blockquote component.
 */
interface BlockquoteProps {
  children: React.ReactNode;
}

export const Blockquote: React.FC<BlockquoteProps> = ({ children }) => {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-white/25 dark:text-white/60">
      {children}
    </blockquote>
  );
};

/**
 * Props for the CustomList component.
 */

interface CustomListProps {
  children: React.ReactNode;
}
export const CustomUl: React.FC<CustomListProps> = ({ children }) => {
  return <ul className="list-inside list-disc pl-4">{children}</ul>;
};

export const CustomOl: React.FC<CustomListProps> = ({ children }) => {
  return <ol className="list-inside list-decimal pl-4">{children}</ol>;
};

export const CustomLi = (props: { children: React.ReactNode }) => {
  return <li className="text-base leading-7">{props.children}</li>;
};

/**
 * Props for the Figure component.
 */
export interface FigureProps extends PropsWithChildren {
  /**
   * The caption for the figure.
   */
  caption: string;
}

export function Figure({ caption, children }: FigureProps) {
  return (
    <div className="post:mb-4 flex flex-col items-center justify-center gap-y-3">
      {children}
      <figcaption className="w-full grow text-center text-sm text-gray-600 dark:text-white/60">
        {caption}
      </figcaption>
    </div>
  );
}

export const Table = (props: HtmlHTMLAttributes<HTMLTableElement>) => {
  return (
    <div className="post:mb-4 overflow-x-auto rounded-lg border border-gray-300 bg-white/30 dark:border-white/25 dark:bg-white/10">
      <table
        className="w-full divide-y divide-gray-300 dark:divide-white/25"
        {...props}
      />
    </div>
  );
};

export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-gray-100 dark:bg-white/10" {...props} />;
}

export function TableHeadingCell(
  props: HtmlHTMLAttributes<HTMLTableCellElement>,
) {
  return <th className="px-4 py-2 font-bold" {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className="divide-y divide-gray-300 dark:divide-white/25"
      {...props}
    />
  );
}

export function TableRow(props: HtmlHTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className="divide-x divide-gray-300 dark:divide-white/25" {...props} />
  );
}

export function TableCell(props: HtmlHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-2" {...props} />;
}

export const CodeBlock = async ({
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) => {
  const codeElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === "code",
  ) as React.ReactElement<HTMLPreElement> | undefined;

  const className = codeElement?.props?.className ?? "";
  const isCodeBlock =
    typeof className === "string" && className.startsWith("language-");

  if (!isCodeBlock) {
    return (
      <code
        className={cn(
          "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  const lang = className.split(" ")[0]?.split("-")[1] ?? "";

  // Highlight the code with Shiki
  const out = await codeToHast(String(codeElement?.props.children), {
    lang,
    theme: "nord",
  });

  // Construct highlighted JSX
  const highlighted = toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (p) => (
        <pre
          className={cn(
            "p-4 overflow-x-auto text-sm font-mono leading-relaxed",
            "bg-card rounded-b-xl"
          )}
          {...p}
        />
      ),
    },
  }) as JSX.Element;

  return (
    <div
      className={cn(
        "my-6 border border-border rounded-xl overflow-hidden",
        "shadow-sm bg-background"
      )}
    >
      {/* Header bar with language label */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border text-xs uppercase tracking-wide font-medium text-muted-foreground">
        <span>{lang || "code"}</span>
      </div>

      {/* Highlighted code */}
      {highlighted}
    </div>
  );
};
export const Paragraph = (props: { children?: React.ReactNode }) => {
  if (typeof props.children !== "string" && props.children === "img") {
    return <>{props.children}</>;
  }

  return <p className="leading-7 not-first:mt-6" {...props} />;
};

export const MdxComponents = {
  components: {
    pre: CodeBlock,
    blockquote: Blockquote,
    p: Paragraph,
    ul: CustomUl,
    ol: CustomOl,
    li: CustomLi,
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    table: Table,
    thead: TableHeader,
    th: TableHeadingCell,
    tbody: TableBody,
    tr: TableRow,
    td: TableCell,
    Figure,
    Image,
    img: ({ src, alt, ...rest }: ImageProps) => {
      return (
        <Image
          src={src ? src.toString() : "/assets/images/placeholder-user.jpg"}
          alt={alt}
          width={500}
          height={500}
          {...rest}
            className="mx-auto my-6 rounded-xl shadow-lg"

        />
      );
    },
  },
};
