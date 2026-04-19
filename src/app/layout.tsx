import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torah Apologetics",
  description:
    "Biblical defense of Torah observance — articles, courses, and answers to every objection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
