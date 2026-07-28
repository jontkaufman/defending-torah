import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminUser } from "@/lib/admin";
import { ContentRequestsDashboard } from "@/components/admin/content-requests-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content Requests — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminContentRequestsPage() {
  const user = await getAdminUser();
  if (!user) notFound();

  return (
    <div className="px-10 py-[60px] max-md:px-6 max-md:py-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-crimson mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-crimson" />
            Admin
          </div>
          <h1 className="font-heading font-light text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-tight text-ink">
            Content Requests
          </h1>
        </header>
        <ContentRequestsDashboard />
      </div>
    </div>
  );
}
