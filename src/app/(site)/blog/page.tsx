import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Blog — Short Reads on Torah, Grace, and Scripture",
  description:
    "Short-form essays exploring Torah observance, the relationship between grace and law, and what Scripture actually says about God's instructions.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="px-10 py-[70px] max-w-4xl mx-auto max-md:px-6 max-md:py-10">
      <div className="text-center mb-[50px]">
        <h1 className="section-title rise delay-2">
          Polished articles for <em>sharing</em> and discussion.
        </h1>
      </div>

      <div className="border-t border-ink">
        {posts.length === 0 && (
          <p className="text-center text-muted py-16 font-body italic text-lg">
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
