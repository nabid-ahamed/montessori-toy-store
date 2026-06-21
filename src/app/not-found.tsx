import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-7xl font-bold text-neem">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        Page not found
      </h1>
      <p className="mt-2 text-ink-muted">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
