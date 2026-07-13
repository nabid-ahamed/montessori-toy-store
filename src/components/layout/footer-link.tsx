"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type FooterLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  href: string;
};

/**
 * Footer navigation link. Behaves like a normal `next/link` for other pages
 * (client-side navigation). When it points at the page you're already on — where
 * a soft navigation would otherwise do nothing — it forces a real reload of that
 * URL instead, so the link is never a dead click. UI/markup are unchanged.
 */
export function FooterLink({ href, children, ...props }: FooterLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (href === pathname) {
          e.preventDefault();
          window.location.assign(href); // reload the current page
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
