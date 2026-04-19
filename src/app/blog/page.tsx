import { getPosts } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Blog</h1>
        <p className="text-[var(--text-secondary)]">
          Polished articles for sharing and discussion
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {posts.length === 0 && (
          <p className="text-center text-[var(--text-muted)] py-12">
            No posts yet.
          </p>
        )}
        {posts.map((post) => (
          <BlogCard key={post.meta.slug} meta={post.meta} />
        ))}
      </div>
    </div>
  );
}
