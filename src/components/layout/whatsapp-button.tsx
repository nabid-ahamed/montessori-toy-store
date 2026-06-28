import { MessageCircle } from "lucide-react";

/** Floating WhatsApp contact button (placeholder link). */
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/0000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-3 z-50 flex size-11 items-center justify-center rounded-full bg-neem text-paper shadow-lg transition-transform hover:scale-105 sm:right-4 sm:size-12 md:bottom-6"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
