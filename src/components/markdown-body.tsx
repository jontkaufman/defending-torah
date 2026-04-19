import { MDXRemote } from "next-mdx-remote/rsc";

interface MarkdownBodyProps {
  content: string;
  className?: string;
}

export function MarkdownBody({ content, className }: MarkdownBodyProps) {
  return (
    <div className={`prose-torah ${className ?? ""}`}>
      <MDXRemote source={content} />
    </div>
  );
}
