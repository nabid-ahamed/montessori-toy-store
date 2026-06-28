import type { Certification, TrustStat, VideoCallBanner } from "@/lib/types";

export const trustStats: TrustStat[] = [
  { id: "parents", valueBn: "300k+", labelBn: "Trusted parents", icon: "users" },
  { id: "lab", valueBn: "Lab-tested", labelBn: "non-toxic, safe finish", icon: "shield-check" },
  { id: "reviews", valueBn: "9,000+", labelBn: "5-star reviews", icon: "star" },
];

/** Safety / quality certifications shown on the PDP trust strip. */
export const certifications: Certification[] = [
  { id: "non-toxic", labelBn: "Non-toxic finish", icon: "shield-check" },
  { id: "natural-wood", labelBn: "Natural neem wood", icon: "leaf" },
  { id: "baby-safe", labelBn: "Baby-safe design", icon: "baby" },
  { id: "lab-tested", labelBn: "Lab-tested", icon: "flask-conical" },
  { id: "sustainable", labelBn: "Sustainably sourced", icon: "recycle" },
];

/** Live video-call banner content. */
export const videoCallBanner: VideoCallBanner = {
  titleBn: "Not sure? See it on a live video call",
  descBn:
    "Book a free 1-on-1 demo call and our team will show you the toy, the finish, and answer your questions — before you buy.",
  ctaBn: "Schedule a call",
  href: "/contact",
};
