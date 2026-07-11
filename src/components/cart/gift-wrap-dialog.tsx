"use client";

import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";

const MAX_MESSAGE = 250;

/**
 * Gift-wrapping modal: a centered dialog for writing the message printed on the
 * gift card. Frontend only — the saved message is handed back to the cart via
 * `onSave`. Fade + scale animations, Esc / outside-click close (radix), and a
 * live character counter capped at {MAX_MESSAGE}.
 */
export function GiftWrapDialog({
  open,
  initialMessage,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  initialMessage: string;
  onOpenChange: (open: boolean) => void;
  onSave: (message: string) => void;
}) {
  const [draft, setDraft] = useState(initialMessage);

  // Seed the textarea with the currently-saved message each time it opens
  // (so "Edit" shows the existing message, "Add" starts appropriately).
  useEffect(() => {
    if (open) setDraft(initialMessage);
  }, [open, initialMessage]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-cream-300 bg-paper p-5 text-sm text-ink shadow-lg duration-200 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 sm:p-6">
          <Dialog.Title className="font-display text-lg font-bold text-ink">
            🎁 Gift Wrapping
          </Dialog.Title>
          <Dialog.Description className="mt-1 leading-6 text-ink-muted">
            Add a personal message that will be printed on the gift card.
          </Dialog.Description>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_MESSAGE))}
            maxLength={MAX_MESSAGE}
            rows={4}
            placeholder="Write your gift message here..."
            className="mt-4 w-full resize-none rounded-lg border border-cream-300 bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus-visible:border-neem focus-visible:ring-2 focus-visible:ring-neem/25"
          />

          <div className="mt-1.5 flex items-center justify-between text-xs text-ink-soft">
            <span>Maximum {MAX_MESSAGE} characters.</span>
            <span className="tabular-nums">
              {draft.length} / {MAX_MESSAGE}
            </span>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Dialog.Close asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="button" onClick={() => onSave(draft)}>
              Save Gift Message
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
