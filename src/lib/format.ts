const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert ASCII digits in a number/string to Bangla digits. */
export const toBn = (value: number | string): string =>
  String(value).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);

/** Format a BDT price with Bangla digits and thousands separators. */
export const formatTk = (amount: number): string =>
  `৳${toBn(amount.toLocaleString("en-US"))}`;
