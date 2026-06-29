// Routes that render their page "bare" — no global chrome (header, desktop nav
// row, or mobile bottom bar). Auth surfaces (sign in / sign up) are focused
// screens, so the site navigation is hidden there and nowhere else.
export const BARE_ROUTES = ["/signin", "/signup"] as const;

/** Is `pathname` an exact match for, or a child of, a bare route? */
export const isBareRoute = (pathname: string): boolean =>
  BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
