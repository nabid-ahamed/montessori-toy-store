import type { Address } from "@/lib/types";

/**
 * Sample saved address for the signed-in preview state. Mock only — decoupled
 * from the UI so a real "my addresses" API can replace this array later. The one
 * flagged `isDefault` is pre-selected in the address modal.
 */
export const mockSavedAddresses: Address[] = [
  {
    id: "addr-home",
    fullName: "Ayesha Rahman",
    phone: "01712345678",
    division: "Dhaka",
    district: "Dhaka",
    area: "Banani",
    addressLine: "House 42, Road 7, Block C",
    landmark: "Beside Banani Play Park",
    isDefault: true,
  },
];
