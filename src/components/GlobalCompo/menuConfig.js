export const menuConfig = {
  "/": [
    {
      title: { en: "About Us", ch: "关于我们" },
      children: [
        {
          title: { en: "Our People", ch: "我们的团队" },
          href: "/people",
        },
        {
          title: { en: "Philosophy", ch: "哲学" },
          href: "/philosophy",
        },
        {
          title: { en: "Purpose", ch: "目的" },
          href: "/purpose",
        },
      ],
    },
  ],

  "/about": [
    {
      title: { en: "Who We Are", ch: "关于我们" },
      href: "#who-we-are",
    },
    {
      title: { en: "Values", ch: "价值观" },
      href: "#values",
    },
    {
      title: { en: "Our People", ch: "我们的团队" },
      href: "#our-people",
    },
    {
      title: { en: "Our Journey", ch: "我们的旅程" },
      href: "#our-journey",
    },
    {
      title: { en: "Global Studios", ch: "环球影业" },
      href: "#global-studios",
    },
  ],

  "/philosophy": [
    {
      title: {
        en: "Vision Forged",
        ch: "铸就愿景",
      },
      href: "#vision-forged",
    },
    {
      title: {
        en: "Living Narratives",
        ch: "鲜活的故事",
      },
      href: "#living-narratives",
    },
    {
      title: {
        en: "Heritage Woven",
        ch: "传统编织",
      },
      href: "#heritage-woven",
    },
    {
      title: {
        en: "Communities United",
        ch: "社区联合",
      },
      href: "#communities-united",
    },
    {
      title: {
        en: "Cities Reimagined",
        ch: "城市新构想",
      },
      href: "#cities-reimagined",
    },
  ],

  "/purpose": [
    {
      title: { en: "Purpose", ch: "目的" },
      href: "#purpose",
    },
    {
      title: { en: "Values", ch: "价值观" },
      href: "#values",
    },
  ],

  "/studio": [
    {
      title: { en: "Studio", ch: "工作室" },
      href: "#studio",
    },
    {
      title: { en: "Locations", ch: "地点" },
      href: "#loactions",
    },
    {
      title: { en: "Practice", ch: "练习" },
      href: "#practice",
    },
  ],

  "/studio/[slug]": (slug) => [
    {
      title: { en: "Rhythm", ch: "节奏" },
      href: `/studio/${slug}#rhythm`,
    },
    {
      title: { en: "Convergence", ch: "融合" },
      href: `/studio/${slug}#convergence`,
    },
    {
      title: { en: "People", ch: "人们" },
      href: `/studio/${slug}#people`,
    },
    {
      title: { en: "Featured", ch: "精选" },
      href: `/studio/${slug}#featured`,
    },
  ],

  "/stories": [
    {
      title: { en: "People & Process", ch: "人员与流程" },
      href: "#people-process",
    },
    {
      title: { en: "Behind the Scenes", ch: "幕后花絮" },
      href: "#behind-the-scenes",
    },
    {
      title: { en: "Shared Voices", ch: "共同之声" },
      href: "#shared-voices",
    },
    {
      title: { en: "Multimedia Journeys", ch: "多媒体之旅" },
      href: "#multimedia-journeys",
    },
  ],

  "/recognition": [
    {
      title: { en: "Awards", ch: "奖项" },
      href: "#awards",
    },
    {
      title: { en: "Rankings", ch: "排名" },
      href: "#ranking",
    },
    {
      title: { en: "Media Coverage", ch: "媒体报道" },
      href: "#media",
    },
    {
      title: { en: "Partnerships", ch: "合作伙伴关系" },
      href: "#partnership",
    },
  ],

  "/insight": [
    {
      title: { en: "Insight", ch: "洞察" },
      href: "#insight",
    },
  ],

  "/career": [
    {
      title: { en: "Career", ch: "职业" },
      href: "#career",
    },
    {
      title: { en: "Life at LWK", ch: "LWK的生活" },
      href: "#life-at-lwk",
    },
    {
      title: { en: "Employee Voices", ch: "员工心声" },
      href: "#employee-voices",
    },
  ],

  "/people": [
    {
      title: { en: "People", ch: "人们" },
      href: "#people",
    },
    {
      title: { en: "Departments", ch: "部门" },
      href: "#departments",
    },
  ],

  "/projects": [
    {
      title: { en: "Featured", ch: "精选" },
      href: "#featured",
    },
    {
      title: { en: "Recent Projects", ch: "近期项目" },
      href: "#recent-projects",
    },
  ],

  "/contact": [
    {
      title: { en: "Contact", ch: "联系" },
      href: "#contact-form",
    },
  ],
};
