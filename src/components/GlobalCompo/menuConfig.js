export const menuConfig = {
  "/": [
    {
      title: "About Us",
      children: [
        { title: "Our People", href: "/people" },
        { title: "Philosophy", href: "/philosophy" },
        { title: "Purpose", href: "/purpose" },
      ],
    },
    {
      title: "Studio",
      children: [
        { title: "Studio at a Glance", href: "/studio" },
        { title: "Stories ", href: "/stories" },
        { title: "Portfolio ", href: "/projects" },
      ],
    },
    {
      title: "Legacy",
      href: "/recognition",
    },

    {
      title: "Insight",
      href: "/insight",
    },

    {
      title: "Careers",
      href: "/career",
    },

    {
      title: "Contact",
      href: "/contact",
    },
  ],

  "/about": [
    { title: "who we are", href: "#who-we-are" },
    { title: "values", href: "#values" },
    { title: "our people", href: "#our-people" },
    { title: "our journey", href: "#our-journey" },
    { title: "global studios", href: "#global-studios" },
  ],

  "/philosophy": [
    { title: "Vision Forged", href: "#vision-forged " },
    { title: "Living Narratives", href: "#living-narratives" },
    { title: "Heritage Woven", href: "#heritage-woven" },
    { title: "Communities United", href: "#communities-united" },
    { title: "Cities Reimagined", href: "#cities-reimagined" },
  ],
  "/purpose": [
    { title: "Purpose", href: "#purpose" },
    { title: "Values", href: "#values" },
  ],
  "/studio": [
    { title: "STUDIO", href: "#studio" },
    { title: "Locations", href: "#loactions" },
    { title: "Practice", href: "#practice" },
  ],
  "/studio/[slug]": (slug) => [
    { title: "Rhythm", href: `/studio/${slug}#rhythm` },
    { title: "Convergence", href: `/studio/${slug}#convergence` },
    { title: "People", href: `/studio/${slug}#people` },
    { title: "Featured", href: `/studio/${slug}#featured` },
  ],
  "/stories": [
    { title: "People & Process", href: "#people-process" },
    { title: "Behind the Scenes", href: "#behind-the-scenes" },
    { title: "Shared Voices", href: "#shared-voices" },
    { title: "Multimedia Journeys", href: "#multimedia-journeys" },
  ],
  "/recognition": [
    { title: "Awards", href: "#awards" },
    { title: "Rankings ", href: "#ranking" },
    { title: "Media Coverage", href: "#media" },
    { title: "Partnerships", href: "#partnership" },
  ],
  "/insight": [{ title: "insight", href: "#insight" }],
  "/career": [
    { title: "CAREER", href: "#career" },
    { title: "Life at LWK ", href: "#life-at-lwk" },
    { title: "Employee voices", href: "#employee-voices" },
  ],
  "/people": [
    { title: "People", href: "#people" },
    { title: "departments ", href: "#departments" },
  ],
  "/projects": [
    { title: "featured", href: "#featured" },
    { title: "recent projects ", href: "#recent-projects" },
  ],
  "/contact": [{ title: "contact", href: "#contact-form" }],
};
