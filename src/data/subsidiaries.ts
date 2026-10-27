export interface Subsidiary {
  name: string;
  slug: string;
  tagline: string;
  overview: string;
  link: string;
  logo?: string;
  image?: string;
  facebook?: string;
  sector: string;
  comingSoon?: boolean;
}

export const GROUP_PHONE = "0768550331";
export const GROUP_PHONE_INTL = "254768550331";
export const GROUP_EMAIL = "kgroupkenya@gmail.com";
export const WHATSAPP_URL = `https://wa.me/${GROUP_PHONE_INTL}?text=${encodeURIComponent("Hello K-GROUP KENYA! I found your website and would like to connect.")}`;

export const subsidiaries: Subsidiary[] = [
  {
    name: "Kach Sound Media",
    slug: "kach-sound-media",
    tagline: "Sound that Moves, Beats that Inspire.",
    overview: "Sound, lights, DJ, MC, stage and LED screens for weddings, corporate functions, concerts and church events.",
    link: "/kach-sound-media",
    logo: "/COMPANY LOGOS/KACHSOUNDMEDIA.jpg",
    image: "/GALLERY/kachsound media/kachsound media 10.jpg",
    facebook: "https://www.facebook.com/kachsoundntertainment",
    sector: "Creative Arts & Entertainment",
  },
  {
    name: "Links Auto Motors",
    slug: "links-auto-motors",
    tagline: "Drive the Future with Confidence.",
    overview: "Automotive sales, sourcing, consultation and support, from your first search to long-term ownership.",
    link: "/links-auto-motors",
    logo: "/COMPANY LOGOS/LINKSAUTOMOTORS.jpg",
    image: "/GALLERY/links auto motors/links 1.jpg",
    facebook: "https://www.facebook.com/linksautomotors",
    sector: "Automotive",
  },
  {
    name: "Breakout Events",
    slug: "breakout-events",
    tagline: "Creating Moments. Crafting Memories.",
    overview: "End-to-end event management, from product launches to weddings, with planning, décor and on-ground production.",
    link: "/breakout-events",
    logo: "/COMPANY LOGOS/BREAKOUTEVENTS.jpg",
    image: "/GALLERY/break out events/breakout 1.jpg",
    facebook: "https://www.facebook.com/profile.php?id=100069022268920",
    sector: "Event Management",
  },
  {
    name: "KBR TV",
    slug: "kbr-tv",
    tagline: "Broadcasting Beyond Boundaries.",
    overview: "A digital TV channel for Kenyan culture, youth issues, entertainment and business.",
    link: "/kbr-tv",
    logo: "/COMPANY LOGOS/KBRTV - WHITE.jpg",
    image: "/GALLERY/kbr tv/kbrtv 1.jpg",
    facebook: "https://www.facebook.com/share/1GGLCd7Zps/",
    sector: "Media & Broadcasting",
  },
  {
    name: "KBR Radio",
    slug: "kbr-radio",
    tagline: "Voices that Resonate.",
    overview: "A community-first digital and FM station: gospel, youth talk shows, news and local updates.",
    link: "/kbr-radio",
    logo: "/COMPANY LOGOS/KBRRADIO.jpg",
    image: "/GALLERY/kbr radio/kbrradio 1.jpg",
    facebook: "https://www.facebook.com/profile.php?id=100063611015303",
    sector: "Media & Broadcasting",
  },
  {
    name: "Breakout Bible Fellowship",
    slug: "breakout-bible-fellowship",
    tagline: "Faith. Fellowship. Family.",
    overview: "The spiritual and community outreach arm of K-GROUP KENYA, fostering faith and unity.",
    link: "/breakout-bible-fellowship",
    logo: "/COMPANY LOGOS/BREAKOUTBIBLEFELLOWSHIP.jpg",
    sector: "Community & Faith",
  },
  {
    name: "KBR Academy",
    slug: "kbr-academy",
    tagline: "From Talent to Profession.",
    overview: "Hands-on training in radio, TV production, music production, videography and event management.",
    link: "/kbr-academy",
    logo: "/COMPANY LOGOS/KBRACADEMY.jpg",
    image: "/GALLERY/kbr academy/academy 1.jpg",
    facebook: "https://www.facebook.com/profile.php?id=100075739666056",
    sector: "Education & Skills Training",
  },
  {
    name: "DJ KACH Ministries",
    slug: "dj-kach-ministries",
    tagline: "The Gospel Sound Ambassador.",
    overview: "Gospel DJ, music minister and event specialist, bringing the joy of gospel music to every celebration.",
    link: "/dj-kach-ministries",
    logo: "/dj-kach/logo-white.png",
    image: "/dj-kach/slides/1.jpg",
    sector: "Christian Ministry & Gospel Engagement",
  },
  {
    name: "COVNT.",
    slug: "covnt",
    tagline: "Wear Your Purpose.",
    overview: "Purpose-led everyday apparel, smart-casual essentials and custom corporate clothing, rooted in faith and integrity.",
    link: "/covnt",
    sector: "Apparel & Fashion",
  },
];
