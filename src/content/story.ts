/**
 * The founder's story and the studio's journey.
 *
 * Every statement here comes from the studio's own brand information. No
 * awards, clients, partnerships or appearances have been added, and pull
 * quotes use the studio's supplied copy rather than words placed in the
 * founder's mouth.
 */

export const founder = {
  name: "Mrs. Marian Gifty Mensah-Dossah",
  role: "Founder & Chief Executive Officer",
  eyebrow: "The Founder",
  headline: "A Vision Rooted in Passion. A Legacy Shaped by Craftsmanship.",
  lead: "Mrs. Marian Gifty Mensah-Dossah is a distinguished Ghanaian fashion entrepreneur and the visionary CEO of Magmens Couture, a multiple award-winning luxury fashion brand recognised for excellence in couture design.",
  /**
   * Optional portrait. While this is null the founder section shows the
   * studio's monogram plate instead — see README.md, "Adding the founder
   * portrait", for how to supply the photograph.
   *
   * The portrait is the studio's own photograph of Marian in the red sequin
   * gown, which also appears in the reception and occasion-wear galleries, so
   * one master serves both jobs. Its gallery entry names her for that reason.
   */
  portraitSlug: "reception-red-sequin-ruffle" as string | null,
  paragraphs: [
    "Born and raised in Obuasi in the Ashanti Region of Ghana, Marian developed a passion for fashion at an early age, initially designing outfits for family and friends. What began as a personal passion evolved into a successful fashion enterprise when she established Magmens Couture in 2015.",
    "Today, Magmens Couture specialises in exquisite bridal and high-fashion couture, combining sculpted corsetry, intricate beadwork, luxurious embellishments, dramatic silhouettes, and exceptional attention to detail.",
    "Her designs celebrate femininity, confidence, elegance and individuality. Each creation is developed with the intention of making the woman wearing it feel extraordinary.",
    "Beyond her work in couture, Mrs. Mensah-Dossah is passionate about women's empowerment and professional development. She collaborates with universities and educational institutions, provides internship opportunities, and supports practical fashion education to help bridge the gap between academic training and industry experience.",
    "Through mentorship, training and collaboration, she continues to nurture emerging fashion professionals and contribute to the development of Ghana's fashion industry.",
  ],
} as const;

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

/** Presented as an editorial timeline on the founder page. */
export const milestones: Milestone[] = [
  {
    year: "Early years",
    title: "A passion that started at home",
    body: "Born and raised in Obuasi in the Ashanti Region of Ghana, Marian began designing outfits for family and friends long before couture became a business.",
  },
  {
    year: "2015",
    title: "Magmens Couture is established",
    body: "What began as a personal passion became a fashion enterprise, established in Obuasi and built on bespoke make, personal attention and meticulous finishing.",
  },
  {
    year: "Today",
    title: "A house of bridal and high-fashion couture",
    body: "Magmens Couture specialises in exquisite bridal and high-fashion couture: sculpted corsetry, intricate beadwork, luxurious embellishments and dramatic silhouettes.",
  },
  {
    year: "Beyond the atelier",
    title: "Women's empowerment and fashion education",
    body: "Collaboration with universities and educational institutions, internships and practical fashion training that bridges academic study and industry experience.",
  },
  {
    year: "Looking ahead",
    title: "A continuing contribution to Ghanaian fashion",
    body: "Through mentorship, training and collaboration, nurturing emerging fashion professionals and contributing to the development of Ghana's fashion industry.",
  },
];

/**
 * Awards and recognitions, as supplied by the studio. Listed newest first so
 * the most recent recognition leads the section. A `null` image means the
 * studio has not confirmed a photograph for that award, and the page renders
 * the award name without a picture rather than failing the build.
 */
export const awards = [
  { year: "2026", title: "Seated Award Portrait", organisation: "Studio Award", body: "Award portrait photographed in the studio, October 2026.", image: "award-seated-portrait-115730" },
  { year: "2025", title: "Excellence in Detailed Haute Couture", organisation: "Ashanti Business Merit Awards", body: "Recognised for the standard of construction and finishing that defines the house's couture work.", image: "award-seated-portrait-115807" },
  { year: "2025", title: "Global Woman Fashion Entrepreneur of the Year", organisation: "2nd Global SHE Achievers Conference & Awards, Banjul, The Gambia", body: "Awarded for her contribution to fashion entrepreneurship and women's empowerment.", image: "award-seated-portrait-115807" },
  { year: "2024", title: "Ghana's Outstanding Personality — Fashion & Lifestyle", organisation: "Ghana's Most Respected CEOs Awards", body: "Recognised for leadership and influence in Ghana's fashion and lifestyle sector.", image: "award-gopa-red-gown-2024" },
  { year: "2024", title: "Ghana's Most Respected CEO in Fashion & Lifestyle Services", organisation: "7th Ghana's Most Respected CEOs Awards, Business Executive Group", body: "Awarded at the seventh edition of the Ghana's Most Respected CEOs Awards.", image: "award-seated-portrait-115844" },
  { year: "2020 & 2021", title: "Forty Under 40 Awards — Fashion Category Nominee", organisation: "Forty Under 40 Awards", body: "Named among the country's leading young fashion entrepreneurs in two consecutive years.", image: null },
  { year: "2016", title: "Winner, Fashion Guru Sewing Bee", organisation: "Joy Prime TV", body: "Crowned champion of the maiden edition of the Fashion Guru Sewing Bee.", image: null },
  { year: "2019", title: "Fashion Excellence Award", organisation: "Bryte Africa Fashion Week", body: "Received for excellence in fashion design.", image: null },
  { year: "2017", title: "Finalist, VLISCO Fashion Fund Competition", organisation: "VLISCO Fashion Fund", body: "Recognised as a finalist in the VLISCO Fashion Fund competition.", image: null },
];



/**
 * Pull quotes. These are drawn from the studio's supplied brand copy — the
 * studio's own words about its craft — rather than statements attributed to
 * the founder personally.
 */
export const craftQuotes = [
  "Where craftsmanship becomes art.",
  "Every creation begins with a vision and is brought to life through meticulous craftsmanship, thoughtful design, and a deep appreciation for feminine elegance.",
  "Redefining elegance through craftsmanship.",
];

export const philosophy = {
  eyebrow: "Our Philosophy",
  headline: "Where Craftsmanship Becomes Art.",
  paragraphs: [
    "At Magmens Couture, every creation begins with a vision and is brought to life through meticulous craftsmanship, thoughtful design, and a deep appreciation for feminine elegance.",
    "From the first consultation to the final fitting, we create bespoke garments that celebrate your individuality and transform meaningful occasions into unforgettable memories.",
  ],
} as const;

export const craftPillars = [
  {
    title: "Sculpted corsetry",
    body: "Structured bodices built to support, shape and hold their line from the first fitting to the last dance.",
  },
  {
    title: "Intricate beadwork",
    body: "Beading, pearls, crystals and embroidery applied by hand, motif by motif, until the light falls the way it should.",
  },
  {
    title: "Dramatic silhouettes",
    body: "Figure-enhancing volume and line — trains, peplums, mermaid skirts — engineered rather than merely cut.",
  },
  {
    title: "Exceptional finishing",
    body: "The parts nobody sees at a distance: internal structure, bound seams, weighted hems and a clean hand.",
  },
  {
    title: "Bespoke by design",
    body: "No house pattern. Every garment is developed around one client's preferences, proportions and occasion.",
  },
  {
    title: "Contemporary couture, African elegance",
    body: "International couture construction paired with Kente, heritage cloth and Ghanaian cultural expression.",
  },
];
