"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Brand glyphs — lucide dropped brand icons, so these are inline simple-icons
// paths (same pattern as the sign-in page / footer).
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const btnCls =
  "flex size-10 items-center justify-center rounded-full border border-cream-300 bg-paper text-ink-muted transition-colors hover:border-neem hover:text-neem-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neem/25";

/**
 * Share buttons for an article: copy link, Facebook, X and WhatsApp. Builds
 * share URLs from the current location at click time (client only). Renders
 * as a horizontal row by default; `vertical` stacks it for the sticky rail.
 */
export function ShareRail({
  title,
  vertical = false,
}: {
  title: string;
  vertical?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const openShare = (buildUrl: (pageUrl: string) => string) => {
    const pageUrl = window.location.href;
    window.open(buildUrl(pageUrl), "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link.");
    }
  };

  return (
    <div className={cn("flex items-center gap-2.5", vertical && "flex-col items-start")}>
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        Share
      </span>
      <div className="flex gap-2">
        <button type="button" aria-label="Copy link" onClick={copyLink} className={btnCls}>
          {copied ? <Check className="size-4 text-neem-deep" /> : <Link2 className="size-4" />}
        </button>
        <button
          type="button"
          aria-label="Share on Facebook"
          onClick={() =>
            openShare((u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`)
          }
          className={btnCls}
        >
          <FacebookIcon className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Share on X"
          onClick={() =>
            openShare(
              (u) =>
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(title)}`,
            )
          }
          className={btnCls}
        >
          <XIcon className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Share on WhatsApp"
          onClick={() =>
            openShare((u) => `https://wa.me/?text=${encodeURIComponent(`${title} ${u}`)}`)
          }
          className={btnCls}
        >
          <WhatsAppIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
