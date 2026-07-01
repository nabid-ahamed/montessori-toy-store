import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  Info,
  Leaf,
  Mail,
  MessageCircle,
  Package,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
  Wallet,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { PolicyIcon } from "@/lib/policy/types";

/** Central policy icon-key → lucide component map. Shared by the policy view and
 *  block renderers so a key resolves the same everywhere. */
export const policyIcon: Record<PolicyIcon, LucideIcon> = {
  sparkles: Sparkles,
  "check-circle": CheckCircle2,
  "x-circle": XCircle,
  "rotate-ccw": RotateCcw,
  clock: Clock,
  "shield-check": ShieldCheck,
  "message-circle": MessageCircle,
  mail: Mail,
  leaf: Leaf,
  "badge-check": BadgeCheck,
  truck: Truck,
  wallet: Wallet,
  "credit-card": CreditCard,
  package: Package,
  info: Info,
  "alert-triangle": AlertTriangle,
};
