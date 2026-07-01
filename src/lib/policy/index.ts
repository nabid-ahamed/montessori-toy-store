import { returnsPolicy } from "./returns";
import type { PolicyContent } from "./types";

export type { PolicyContent } from "./types";

/**
 * Registry of policy pages keyed by route slug. Add a new premium policy page by
 * authoring a `PolicyContent` module and registering it here — the reusable
 * template and route dispatch handle the rest. Suitable slugs: `returns`,
 * `privacy`, `terms`, `warranty`, `cookies`, `bulk-orders`, ...
 */
export const policyRegistry: Record<string, PolicyContent> = {
  returns: returnsPolicy,
};

export function getPolicy(slug: string): PolicyContent | undefined {
  return policyRegistry[slug];
}
