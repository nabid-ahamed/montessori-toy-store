import type { Metadata } from "next";

// The sign-in page itself is a Client Component and can't export metadata, so
// this route-level layout supplies it. Auth pages are kept out of the index.
export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in or create your Toytuni account.",
  robots: { index: false, follow: true },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
