import type { LucideIcon } from "lucide-react";
import {
  Volume2, Lightbulb, Headphones, Mic, Presentation, Monitor,
  Car, Search, MessageSquare, Truck, Banknote, Repeat, Wrench, Hammer,
  CalendarCheck, ClipboardList, Tv, Music, Film, Radio, Newspaper,
  Video, BookOpen, Shirt, Briefcase, Package, HeartHandshake, Users, Church,
} from "lucide-react";

export interface CompanyConfig {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  about: string;
  highlights: string[];
  servicesTitle: string;
  services: { icon: LucideIcon; title: string; text: string; image?: string }[];
  why?: { title: string; items: string[] };
  images: string[];
  heroImage?: string;
  /** Leave out to show the company name as a wordmark. */
  logo?: string;
  hideGallery?: boolean;
  /** Optional copy overrides for the page template. */
  heroEyebrow?: string;
  headline?: { before: string; accent: string };
  ctaHref?: string;
  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutExtra?: string;
  servicesHeading?: string;
  servicesIntro?: string;
  servicesNote?: string;
  contactEyebrow?: string;
  phones: string[];
  email?: string;
  socials: { kind: "facebook" | "instagram" | "youtube"; url: string }[];
  ctaTitle: string;
  ctaText: string;
  /** Short label for the hero "enquire" button. */
  ctaLabel: string;
}

const gallery = (folder: string, prefix: string, count: number, start = 1) =>
  Array.from({ length: count }, (_, i) => `/GALLERY/${folder}/${prefix} ${i + start}.jpg`);

const GROUP_LANDLINE = "020-2113473";

export const companyPages: Record<string, CompanyConfig> = {
  "kach-sound-media": {
    slug: "kach-sound-media",
    name: "Kach Sound Media",
    tagline: "Sound that Moves, Beats that Inspire.",
    intro:
      "The entertainment heartbeat of K-GROUP KENYA: sound, lights, DJ, MC, stage and LED screens for events that people remember.",
    about:
      "We are passionate about music, sound and creating memorable experiences. Our team brings together DJs, sound engineers and event professionals, fusing local flavour with professional sound quality for youth events, concerts, private gigs, corporate shows and cultural festivals.",
    highlights: [
      "Professional DJing & Live Performances",
      "Sound Engineering & Equipment Hire",
      "Music Production & Promotions",
      "Artist Collaboration & Talent Management",
    ],
    servicesTitle: "Complete event production",
    services: [
      { icon: Volume2, title: "Professional Sound", text: "Sound reinforcement for weddings, corporate functions, concerts and outdoor events." },
      { icon: Lightbulb, title: "Event Lighting", text: "Stage, venue and atmosphere lighting that lifts the whole experience." },
      { icon: Headphones, title: "DJ Services", text: "DJ entertainment for weddings, parties, corporate functions and celebrations." },
      { icon: Mic, title: "MC Services", text: "Professional hosting to keep programmes engaging, organised and flowing." },
      { icon: Presentation, title: "Stage Setup", text: "Stage structures and technical setups tailored to each event and venue." },
      { icon: Monitor, title: "LED Screens", text: "LED displays for branding, presentations, launches and live visuals." },
    ],
    images: gallery("kachsound media", "kachsound media", 24, 6),
    heroImage: "/GALLERY/kachsound media/kachsound media 10.jpg",
    logo: "/COMPANY LOGOS/KACHSOUNDMEDIA.jpg",
    phones: ["0772082000", GROUP_LANDLINE],
    email: "kachsoundmedia@gmail.com",
    socials: [
      { kind: "facebook", url: "https://www.facebook.com/kachsoundntertainment" },
      { kind: "instagram", url: "https://www.instagram.com/kachsoundmedia/" },
      { kind: "youtube", url: "https://www.youtube.com/@kachsoundmedia4437" },
    ],
    ctaTitle: "Book us for your next event",
    ctaText: "Tell us about your event and we will set up the sound, lights and energy to match your vision.",
    ctaLabel: "Book an event",
  },

  "links-auto-motors": {
    slug: "links-auto-motors",
    name: "Links Auto Motors",
    tagline: "Drive the Future with Confidence.",
    intro:
      "The automotive wing of K-GROUP KENYA: consultation, sourcing, sales, trade-ins, financing and ownership support, all in one place.",
    about:
      "Links Auto Motors helps people make better automotive decisions. From premium pre-owned and new vehicles to import assistance and auto servicing, we guide you with verified vehicle history, transparent pricing and long-term support.",
    highlights: [
      "Car Sales (SUVs, Sedans, Vans, Trucks)",
      "Trade-In & Financing Support",
      "Car Import Assistance",
      "Spare Parts & Auto Servicing",
    ],
    servicesTitle: "Solutions for every stage of ownership",
    services: [
      { icon: Car, title: "Vehicle Sales", text: "Helping customers identify and acquire vehicles suited to their needs." },
      { icon: Search, title: "Vehicle Sourcing", text: "Finding suitable vehicles according to your requirements and preferences." },
      { icon: MessageSquare, title: "Consultation", text: "Practical guidance before you commit to an automotive decision." },
      { icon: Truck, title: "Vehicle Logistics", text: "Supporting the movement and delivery of vehicles." },
      { icon: Banknote, title: "Financing", text: "Helping you navigate vehicle-financing options." },
      { icon: Repeat, title: "Trade-ins & Resale", text: "Moving from an existing vehicle to another with less hassle." },
      { icon: Wrench, title: "Ownership Support", text: "Staying a useful automotive partner long after the purchase." },
      { icon: Hammer, title: "Restoration", text: "Developing the capability to preserve, rebuild and revitalise vehicles." },
    ],
    why: { title: "Why clients trust us", items: ["Verified vehicle history", "Transparent pricing", "Flexible payment terms"] },
    images: gallery("links auto motors", "links", 6),
    heroImage: "/GALLERY/links auto motors/links 1.jpg",
    logo: "/COMPANY LOGOS/LINKSAUTOMOTORS.jpg",
    phones: ["0768550331", GROUP_LANDLINE],
    email: "linksautomotors@gmail.com",
    socials: [{ kind: "facebook", url: "https://www.facebook.com/linksautomotors" }],
    ctaTitle: "Get your next car today",
    ctaText: "Contact us for car sales, trade-ins, servicing or to book a test drive.",
    ctaLabel: "Enquire now",
  },

  "breakout-events": {
    slug: "breakout-events",
    name: "Breakout Events",
    tagline: "Creating Moments. Crafting Memories.",
    intro:
      "The creative arm of K-GROUP KENYA for event management, from product launches to weddings.",
    about:
      "Breakout Events is your partner for unforgettable experiences, from corporate functions to community celebrations. We bring creativity, precision and passion to every event, with professional planning, execution and logistics.",
    highlights: [
      "Corporate & Private Event Planning",
      "Stage, Lighting & Décor",
      "Live Sound and Artist Booking",
      "On-ground Production Support",
    ],
    servicesTitle: "Everything your event needs",
    services: [
      { icon: ClipboardList, title: "Event Planning", text: "Corporate and private events planned and managed from brief to wrap-up." },
      { icon: Lightbulb, title: "Stage, Lighting & Décor", text: "Staging, lighting and décor that turn a venue into an experience." },
      { icon: Mic, title: "Live Sound & Artist Booking", text: "Live sound and artist booking, with in-house sound and media teams." },
      { icon: CalendarCheck, title: "On-ground Production", text: "Production support on the day so everything runs smoothly." },
    ],
    why: { title: "What sets us apart", items: ["Bespoke concepts", "End-to-end event management", "Access to in-house sound and media teams"] },
    images: gallery("break out events", "breakout", 9),
    heroImage: "/GALLERY/break out events/breakout 1.jpg",
    logo: "/COMPANY LOGOS/BREAKOUTEVENTS.jpg",
    phones: ["0768550331", GROUP_LANDLINE],
    socials: [{ kind: "facebook", url: "https://www.facebook.com/profile.php?id=100069022268920" }],
    ctaTitle: "Plan your next event with us",
    ctaText: "Share your idea and we will help bring it to life.",
    ctaLabel: "Plan an event",
  },

  "kbr-tv": {
    slug: "kbr-tv",
    name: "KBR TV",
    tagline: "Broadcasting Beyond Boundaries.",
    intro:
      "A digital TV channel for Kenyan culture, youth issues, entertainment and business, with authentic, locally produced shows.",
    about:
      "KBR TV delivers content that entertains, educates and connects audiences. It is a growing platform promoting authentic voices, elevating regional content creators and engaging the public through relevant media.",
    highlights: [
      "Interviews & Talk Shows",
      "Music & Entertainment",
      "Community Documentaries",
      "Live Coverage (Events, Politics, Culture)",
    ],
    servicesTitle: "What you'll find on KBR TV",
    services: [
      { icon: Mic, title: "Interviews & Talk Shows", text: "Conversations with the people and ideas shaping Kenya." },
      { icon: Music, title: "Music & Entertainment", text: "Music, performances and entertainment programming." },
      { icon: Film, title: "Community Documentaries", text: "Stories from communities, told by the communities." },
      { icon: Tv, title: "Live Coverage", text: "Live coverage of events, politics and culture." },
    ],
    why: { title: "Our goals", items: ["Be the voice of the youth", "Elevate regional content creators", "Engage the public through relevant media"] },
    images: gallery("kbr tv", "kbrtv", 3),
    heroImage: "/GALLERY/kbr tv/kbrtv 1.jpg",
    logo: "/COMPANY LOGOS/KBRTV - WHITE.jpg",
    phones: ["0768550331", GROUP_LANDLINE],
    email: "kbrtvkenya@gmail.com",
    socials: [{ kind: "facebook", url: "https://www.facebook.com/share/1GGLCd7Zps/" }],
    ctaTitle: "Watch & engage",
    ctaText: "Want to feature on KBR TV, advertise or collaborate? Get in touch.",
    ctaLabel: "Work with KBR TV",
  },

  "kbr-radio": {
    slug: "kbr-radio",
    name: "KBR Radio",
    tagline: "Voices that Resonate.",
    intro:
      "A community-first digital and FM station giving a voice to the voiceless, with gospel, youth talk shows, news and local updates.",
    about:
      "KBR Radio amplifies voices and stories that matter. With interactive programmes and live callers, it promotes local artists and changemakers and builds community cohesion through media.",
    highlights: [
      "Gospel & Spiritual Shows",
      "Youth Talk Shows & Podcasts",
      "Live DJ Sets & Interviews",
      "News, Traffic & Social Trends",
    ],
    servicesTitle: "On the air",
    services: [
      { icon: Church, title: "Gospel & Spiritual Shows", text: "Worship, teaching and inspiration to start and end your day." },
      { icon: Mic, title: "Youth Talk Shows & Podcasts", text: "Conversations on the issues that matter to young people." },
      { icon: Headphones, title: "Live DJ Sets & Interviews", text: "Live mixes, guests and interviews." },
      { icon: Newspaper, title: "News, Traffic & Social Trends", text: "Local news, traffic and what is trending." },
    ],
    why: { title: "Why it matters", items: ["Interactive programmes with live callers", "Promotes local artists and changemakers", "Builds community cohesion through media"] },
    images: gallery("kbr radio", "kbrradio", 6),
    heroImage: "/GALLERY/kbr radio/kbrradio 1.jpg",
    logo: "/COMPANY LOGOS/KBRRADIO.jpg",
    phones: ["0768550331", GROUP_LANDLINE],
    email: "breakoutradio@gmail.com",
    socials: [{ kind: "facebook", url: "https://www.facebook.com/profile.php?id=100063611015303" }],
    ctaTitle: "Tune in & connect",
    ctaText: "Send a shout-out, request a song, or talk to us about airtime and sponsorship.",
    ctaLabel: "Contact the station",
  },

  "breakout-bible-fellowship": {
    slug: "breakout-bible-fellowship",
    name: "Breakout Bible Fellowship",
    tagline: "Faith. Fellowship. Family.",
    intro:
      "The spiritual and community outreach arm of K-GROUP KENYA, fostering faith and unity through worship, teaching and outreach.",
    about:
      "Breakout Bible Fellowship is a community rooted in faith, fellowship and family. We nurture spiritual growth and meaningful connections through faith-based programmes, events and service.",
    highlights: [
      "Weekly Bible Study & Fellowship",
      "Community Service & Outreach",
      "Youth & Family Programs",
      "Faith-Based Events & Retreats",
    ],
    servicesTitle: "How we gather and serve",
    services: [
      { icon: BookOpen, title: "Bible Study & Fellowship", text: "Weekly study and fellowship to grow together in faith." },
      { icon: HeartHandshake, title: "Community Service & Outreach", text: "Serving the communities around us with practical love." },
      { icon: Users, title: "Youth & Family Programs", text: "Programmes that build strong young people and strong families." },
      { icon: Church, title: "Events & Retreats", text: "Faith-based events and retreats for rest and renewal." },
    ],
    images: [],
    logo: "/COMPANY LOGOS/BREAKOUTBIBLEFELLOWSHIP.jpg",
    phones: ["0768550331", GROUP_LANDLINE],
    socials: [],
    ctaTitle: "Join our fellowship",
    ctaText: "You are welcome here. Reach out to find out when and where we meet.",
    ctaLabel: "Join us",
  },

  "kbr-academy": {
    slug: "kbr-academy",
    name: "KBR Academy",
    tagline: "From Talent to Profession.",
    intro:
      "The training and skills development arm of K-GROUP KENYA, turning raw talent into professional excellence.",
    about:
      "KBR Academy nurtures future professionals in media, radio, TV production, entertainment and digital communication through hands-on learning and mentorship with real studio access.",
    highlights: [
      "Radio Presenting & Journalism",
      "Music Production & DJ Mastery",
      "Videography & Editing",
      "Event Management Fundamentals",
    ],
    servicesTitle: "Courses offered",
    services: [
      { icon: Mic, title: "Radio Presenting & Journalism", text: "Voice, scripting and reporting for radio and digital media." },
      { icon: Headphones, title: "Music Production & DJ Mastery", text: "Production, mixing and DJ skills from people in the industry." },
      { icon: Video, title: "Videography & Editing", text: "Shooting and editing for TV, events and online content." },
      { icon: CalendarCheck, title: "Event Management Fundamentals", text: "The basics of planning and running successful events." },
    ],
    why: { title: "What you get", items: ["Hands-on training with real studio access", "Industry-experienced trainers", "Certification and internship opportunities with KBR TV/Radio"] },
    images: gallery("kbr academy", "academy", 6),
    heroImage: "/GALLERY/kbr academy/academy 1.jpg",
    logo: "/COMPANY LOGOS/KBRACADEMY.jpg",
    phones: ["0768550331", GROUP_LANDLINE],
    socials: [{ kind: "facebook", url: "https://www.facebook.com/profile.php?id=100075739666056" }],
    ctaTitle: "Start your creative journey",
    ctaText: "Ask about courses, intakes and fees, and take the first step toward a career in media.",
    ctaLabel: "Apply or enquire",
  },
  covnt: {
    slug: "covnt",
    name: "COVNT.",
    tagline: "Wear Your Purpose.",
    heroEyebrow: "Purpose in every detail",
    headline: { before: "Wear what you", accent: "believe." },
    intro:
      "Considered clothing for everyday life. Rooted in faith, shaped by integrity, and designed to help you show up with confidence and purpose.",
    ctaHref: "#collections",
    aboutEyebrow: "Introducing COVNT.",
    aboutHeading: "Style with a deeper meaning.",
    about:
      "COVNT. is a purpose-led clothing brand for people who want their everyday style to reflect what matters. Our direction is understated, versatile and thoughtfully considered — pieces that feel at home across work, community, church and everyday life.",
    aboutExtra: "We believe what you wear can be an expression of identity, conviction and the person you are becoming.",
    highlights: [],
    servicesTitle: "Style with a deeper meaning.",
    servicesHeading: "A considered wardrobe.",
    servicesIntro: "Discover the directions shaping our collection. Product availability, designs, sizes and pricing will be confirmed directly with COVNT.",
    services: [
      { icon: Shirt, title: "Everyday Essentials", text: "01 / Everyday", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80" },
      { icon: Briefcase, title: "Smart-Casual", text: "02 / Refined", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80" },
      { icon: Package, title: "Purpose Pieces", text: "03 / Expression", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80" },
    ],
    why: {
      title: "What guides us",
      items: [
        "Faith::Grounded in Christ-centred values.",
        "Integrity::Choosing honesty and consistency.",
        "Excellence::Caring about the details and the craft.",
        "Authenticity::Encouraging people to show up as themselves.",
        "Community::Building connection through shared purpose.",
      ],
    },
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1100&q=80",
    ],
    hideGallery: true,
    phones: ["0768550331", GROUP_LANDLINE],
    socials: [],
    contactEyebrow: "Contact & orders",
    ctaTitle: "Let's talk about what you need.",
    ctaText: "Interested in a collection, looking for sizing and availability, or planning apparel for a team or event? Send us an enquiry and our team can follow up.",
    ctaLabel: "Explore the collection",
  },
};
