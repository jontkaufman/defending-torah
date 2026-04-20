import { AccountNav } from "@/components/course/account-nav";

export default function AccountGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <AccountNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
