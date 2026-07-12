/**
 * Bangladesh division → district options for the address form. This is a
 * realistic SEED subset (every division present, a handful of districts each),
 * decoupled so a full dataset / API can replace it without touching the form.
 *
 * TODO: complete the district list for every division (64 districts total).
 */

export type Division = {
  name: string;
  districts: string[];
};

export const BD_LOCATIONS: Division[] = [
  {
    name: "Dhaka",
    districts: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Manikganj", "Munshiganj"],
  },
  {
    name: "Chattogram",
    districts: ["Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Noakhali", "Bandarban"],
  },
  {
    name: "Khulna",
    districts: ["Khulna", "Jashore", "Kushtia", "Satkhira", "Bagerhat"],
  },
  {
    name: "Rajshahi",
    districts: ["Rajshahi", "Bogura", "Pabna", "Natore", "Sirajganj"],
  },
  {
    name: "Sylhet",
    districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  },
  {
    name: "Barishal",
    districts: ["Barishal", "Bhola", "Patuakhali", "Pirojpur"],
  },
  {
    name: "Rangpur",
    districts: ["Rangpur", "Dinajpur", "Kurigram", "Nilphamari", "Gaibandha"],
  },
  {
    name: "Mymensingh",
    districts: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  },
];

/** Division names in display order. */
export const divisionNames: string[] = BD_LOCATIONS.map((d) => d.name);

/** Districts for a division (empty if the division is unknown/unselected). */
export function districtsForDivision(division: string): string[] {
  return BD_LOCATIONS.find((d) => d.name === division)?.districts ?? [];
}
