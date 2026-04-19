import { MDXRemote } from "next-mdx-remote/rsc";

interface MarkdownBodyProps {
  content: string;
}

export function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[var(--accent)] prose-blockquote:text-[var(--text-secondary)]">
      <MDXRemote source={content} />
    </div>
  );
}
