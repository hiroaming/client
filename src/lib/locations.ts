import type { Location, Country, Region } from "@/types/location";

// Country code to name mapping
export const COUNTRY_NAMES: Record<string, string> = {
  // Popular countries
  JP: "Japan",
  KR: "South Korea",
  TH: "Thailand",
  SG: "Singapore",
  MY: "Malaysia",
  ID: "Indonesia",
  US: "United States",
  GB: "United Kingdom",
  AU: "Australia",
  FR: "France",
  DE: "Germany",
  IT: "Italy",

  // Asia
  CN: "China",
  HK: "Hong Kong",
  TW: "Taiwan",
  VN: "Vietnam",
  PH: "Philippines",
  IN: "India",
  KH: "Cambodia",
  LA: "Laos",
  MM: "Myanmar",
  BN: "Brunei",
  MO: "Macau",
  NP: "Nepal",
  BD: "Bangladesh",
  LK: "Sri Lanka",
  PK: "Pakistan",
  MV: "Maldives",
  MN: "Mongolia",
  KZ: "Kazakhstan",
  UZ: "Uzbekistan",
  KG: "Kyrgyzstan",
  TJ: "Tajikistan",
  TM: "Turkmenistan",

  // Europe
  ES: "Spain",
  PT: "Portugal",
  NL: "Netherlands",
  BE: "Belgium",
  CH: "Switzerland",
  AT: "Austria",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  IS: "Iceland",
  IE: "Ireland",
  PL: "Poland",
  CZ: "Czech Republic",
  HU: "Hungary",
  GR: "Greece",
  RO: "Romania",
  BG: "Bulgaria",
  HR: "Croatia",
  SI: "Slovenia",
  SK: "Slovakia",
  LT: "Lithuania",
  LV: "Latvia",
  EE: "Estonia",
  RS: "Serbia",
  BA: "Bosnia and Herzegovina",
  ME: "Montenegro",
  MK: "North Macedonia",
  AL: "Albania",
  XK: "Kosovo",
  MD: "Moldova",
  UA: "Ukraine",
  BY: "Belarus",
  RU: "Russia",
  TR: "Turkey",
  CY: "Cyprus",
  MT: "Malta",
  LU: "Luxembourg",
  LI: "Liechtenstein",
  MC: "Monaco",
  SM: "San Marino",
  VA: "Vatican City",
  AD: "Andorra",

  // North America
  CA: "Canada",
  MX: "Mexico",

  // Central America & Caribbean
  GT: "Guatemala",
  BZ: "Belize",
  SV: "El Salvador",
  HN: "Honduras",
  NI: "Nicaragua",
  CR: "Costa Rica",
  PA: "Panama",
  CU: "Cuba",
  JM: "Jamaica",
  HT: "Haiti",
  DO: "Dominican Republic",
  PR: "Puerto Rico",
  TT: "Trinidad and Tobago",
  BB: "Barbados",
  BS: "Bahamas",
  LC: "Saint Lucia",
  GD: "Grenada",
  VC: "Saint Vincent and the Grenadines",
  AG: "Antigua and Barbuda",
  DM: "Dominica",
  KN: "Saint Kitts and Nevis",

  // South America
  BR: "Brazil",
  AR: "Argentina",
  CL: "Chile",
  PE: "Peru",
  CO: "Colombia",
  VE: "Venezuela",
  EC: "Ecuador",
  BO: "Bolivia",
  PY: "Paraguay",
  UY: "Uruguay",
  GY: "Guyana",
  SR: "Suriname",
  GF: "French Guiana",

  // Middle East
  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  QA: "Qatar",
  KW: "Kuwait",
  OM: "Oman",
  BH: "Bahrain",
  IL: "Israel",
  JO: "Jordan",
  LB: "Lebanon",
  IQ: "Iraq",
  SY: "Syria",
  YE: "Yemen",
  PS: "Palestine",
  IR: "Iran",

  // Africa
  ZA: "South Africa",
  EG: "Egypt",
  MA: "Morocco",
  TN: "Tunisia",
  DZ: "Algeria",
  LY: "Libya",
  KE: "Kenya",
  TZ: "Tanzania",
  UG: "Uganda",
  RW: "Rwanda",
  ET: "Ethiopia",
  GH: "Ghana",
  NG: "Nigeria",
  SN: "Senegal",
  CI: "Ivory Coast",
  CM: "Cameroon",
  ZW: "Zimbabwe",
  BW: "Botswana",
  NA: "Namibia",
  MZ: "Mozambique",
  ZM: "Zambia",
  MW: "Malawi",
  AO: "Angola",
  MU: "Mauritius",
  SC: "Seychelles",
  RE: "Réunion",
  MG: "Madagascar",

  // Oceania
  NZ: "New Zealand",
  FJ: "Fiji",
  PG: "Papua New Guinea",
  NC: "New Caledonia",
  PF: "French Polynesia",
  WS: "Samoa",
  TO: "Tonga",
  VU: "Vanuatu",
  SB: "Solomon Islands",
  GU: "Guam",
  MP: "Northern Mariana Islands",
  AS: "American Samoa",
  FM: "Micronesia",
  MH: "Marshall Islands",
  PW: "Palau",
  KI: "Kiribati",
  TV: "Tuvalu",
  NR: "Nauru",
};

// Get country name by code
export function getCountryName(countryCode: string): string {
  return COUNTRY_NAMES[countryCode.toUpperCase()] || countryCode;
}

// Popular countries for featured section
export const POPULAR_COUNTRY_CODES = [
  "JP", // Japan
  "KR", // South Korea
  "TH", // Thailand
  "SG", // Singapore
  "MY", // Malaysia
  "ID", // Indonesia
  "US", // United States
  "GB", // United Kingdom
  "AU", // Australia
  "FR", // France
  "DE", // Germany
  "IT", // Italy
];

// Region definitions with their identifiers
export const REGIONS: Region[] = [
  {
    code: "global",
    name: "Global",
    type: "region",
    countryCount: 120,
    iconUrl: "/img/regions/global.svg",
    popular: true,
  },
  {
    code: "europe",
    name: "Europe",
    type: "region",
    countryCount: 42,
    iconUrl: "/img/regions/europe.svg",
    popular: true,
  },
  {
    code: "asia",
    name: "Asia",
    type: "region",
    countryCount: 20,
    iconUrl: "/img/regions/asia.svg",
    popular: true,
  },
  {
    code: "north-america",
    name: "North America",
    type: "region",
    countryCount: 3,
    iconUrl: "/img/regions/north-america.svg",
  },
  {
    code: "south-america",
    name: "South America",
    type: "region",
    countryCount: 17,
    iconUrl: "/img/regions/south-america.svg",
  },
  {
    code: "africa",
    name: "Africa",
    type: "region",
    countryCount: 29,
    iconUrl: "/img/regions/africa.svg",
  },
  {
    code: "middle-east",
    name: "Middle East",
    type: "region",
    countryCount: 12,
    iconUrl: "/img/regions/middle-east.svg",
  },
  {
    code: "oceania",
    name: "Australia & Oceania",
    type: "region",
    countryCount: 2,
    iconUrl: "/img/regions/oceania.svg",
  },
  {
    code: "caribbean",
    name: "Caribbean",
    type: "region",
    countryCount: 25,
    iconUrl: "/img/regions/caribbean.svg",
  },
  {
    code: "gcc",
    name: "GCC Countries",
    type: "region",
    countryCount: 6,
    iconUrl: "/img/regions/gcc.svg",
  },
];

// Map region slug patterns to region codes
export function getRegionCodeFromSlug(slug: string): string | null {
  const lowerSlug = slug.toLowerCase();

  if (lowerSlug.includes("global")) return "global";
  if (lowerSlug.startsWith("eu-") || lowerSlug.includes("europe"))
    return "europe";
  if (lowerSlug.startsWith("as-") || lowerSlug.includes("asia")) return "asia";
  if (lowerSlug.includes("north") && lowerSlug.includes("america"))
    return "north-america";
  if (lowerSlug.includes("south") && lowerSlug.includes("america"))
    return "south-america";
  if (lowerSlug.startsWith("af-") || lowerSlug.includes("africa"))
    return "africa";
  if (lowerSlug.includes("middle") || lowerSlug.includes("mena"))
    return "middle-east";
  if (lowerSlug.includes("aunz") || lowerSlug.includes("oceania"))
    return "oceania";
  if (lowerSlug.includes("caribbean") || lowerSlug.includes("carib"))
    return "caribbean";
  if (lowerSlug.includes("gcc") || lowerSlug.includes("gulf")) return "gcc";

  return null;
}

// Get flag URL for a country code (fallback to local flags)
export function getFlagUrl(countryCode: string): string {
  return `/img/flags/${countryCode.toLowerCase()}.png`;
}

// Get image URL with proper handling for API URLs
// Returns the logo URL from DB or falls back to local flag
export function getLocationImageUrl(
  logoUrl: string | undefined | null,
  countryCode: string,
): string {
  // If we have a logo URL from the API/DB
  if (logoUrl) {
    // Already an absolute URL (from API)
    if (logoUrl.startsWith("http")) {
      return logoUrl;
    }

    // Any other relative path
    return logoUrl;
  }
  // Fallback to local flag
  return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;
}

// Extract country name from package name
export function extractCountryName(packageName: string): string {
  // Remove data spec from end (e.g., "Japan 1GB 7Days" -> "Japan")
  return packageName.replace(/\s+\d+(\.\d+)?(GB|MB).*$/i, "").trim();
}

// Sort locations alphabetically with popular first
export function sortLocations<T extends Location>(locations: T[]): T[] {
  return [...locations].sort((a, b) => {
    // Popular items first
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    // Then alphabetically
    return a.name.localeCompare(b.name);
  });
}

// Group countries by first letter for alphabet navigation
export function groupCountriesByLetter(
  countries: Country[],
): Record<string, Country[]> {
  const grouped: Record<string, Country[]> = {};

  countries.forEach((country) => {
    const firstLetter = country.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(country);
  });

  // Sort countries within each group
  Object.keys(grouped).forEach((letter) => {
    grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
}

// Filter locations by search query
export function filterLocations<T extends Location>(
  locations: T[],
  query: string,
): T[] {
  if (!query.trim()) return locations;

  const lowerQuery = query.toLowerCase().trim();
  return locations.filter(
    (location) =>
      location.name.toLowerCase().includes(lowerQuery) ||
      location.code.toLowerCase().includes(lowerQuery),
  );
}
