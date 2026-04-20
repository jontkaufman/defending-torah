import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Defending Torah — Biblical Answers for the Honest Skeptic",
    template: "%s | Defending Torah",
  },
  description:
    "Careful arguments, primary sources, and Hebrew exegesis defending the ongoing validity of God's Torah. Essays, objection responses, and verse-by-verse analysis.",
  metadataBase: new URL("https://defendingtorah.com"),
  openGraph: {
    type: "website",
    siteName: "Defending Torah",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
