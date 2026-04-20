import { getUser } from "@/lib/auth";
import { MonoLabel } from "@/components/course/mono-label";

export default async function ProfilePage() {
  const user = await getUser();

  const fullName = user?.user_metadata?.full_name || "Student";
  const email = user?.email || "";

  return (
    <div className="max-w-[1200px] mx-auto w-full py-[52px] px-12">
      {/* Header */}
      <div className="mb-10 pb-10 border-b border-parchment-shadow">
        <MonoLabel color="var(--crimson)" className="mb-3">
          Account
        </MonoLabel>
        <h1
          className="font-heading font-light leading-none tracking-tight"
          style={{ fontSize: "clamp(36px, 4vw, 48px)" }}
        >
          Your profile.
        </h1>
      </div>

      {/* Profile form */}
      <div className="max-w-[560px] space-y-8">
        {/* Full Name field */}
        <div>
          <MonoLabel
            color="var(--muted)"
            className="mb-2 text-[9.5px] tracking-[0.15em]"
          >
            Full Name
          </MonoLabel>
          <div
            className="font-body italic text-[20px] pb-3 border-b border-parchment-shadow"
            style={{ color: "var(--ink-soft)" }}
          >
            {fullName}
          </div>
        </div>

        {/* Email Address field */}
        <div>
          <MonoLabel
            color="var(--muted)"
            className="mb-2 text-[9.5px] tracking-[0.15em]"
          >
            Email Address
          </MonoLabel>
          <div
            className="font-body italic text-[20px] pb-3 border-b border-parchment-shadow"
            style={{ color: "var(--ink-soft)" }}
          >
            {email}
          </div>
        </div>

        {/* Update button */}
        <div className="pt-4">
          <button className="btn btn-ghost">Update Profile</button>
        </div>
      </div>
    </div>
  );
}
