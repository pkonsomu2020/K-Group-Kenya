import type { LucideIcon } from "lucide-react";
import { Cross, ShieldCheck, Award, Lightbulb, TrendingUp, HeartHandshake, Users, Sprout } from "lucide-react";

/**
 * Content for the K Group Kenya group site.
 * Source: "K Group Kenya Corporate Profile" (draft v0.1, 27 Oct 2026) and the brand identity board.
 */

export const GROUP = {
  name: "K Group Kenya",
  wordmark: "K GROUP",
  sub: "KENYA",
  tagline: "Building Businesses. Transforming Lives. Shaping Generations.",
  descriptor: "A diversified business group founded on Christian values.",
  pillars: ["Faith driven.", "Business focused.", "Impact oriented."],
  personality: ["Professional", "Trustworthy", "Purpose-driven", "Modern African enterprise", "Built for global growth"],
  statement: "More than business. We create lasting impact.",
  location: "Nairobi, Kenya",
  website: "www.kgroupkenya.net",
  email: "kgroupkenya@gmail.com",
  founder: { name: "Daniel Nyandega Osoro", alias: "DJ Kach", title: "Founder & Chief Executive Officer" },
};

export const about = {
  intro:
    "K Group Kenya is a diversified business group founded on Christian values. Its direction is to build and develop businesses that combine commercial discipline with integrity, service, responsible stewardship and positive impact. The group's long-term ambition is to grow from Kenya into wider African and international markets.",
  identity:
    "K Group's identity is business-led and purpose-driven: developing sustainable enterprises, creating value for customers, opening opportunities for people and contributing positively to communities.",
  vision:
    "To build a diversified, sustainable and internationally recognised group originating in Kenya, expanding across Africa and globally, and creating lasting economic and social impact through businesses founded on Christian values.",
  mission:
    "To establish, develop and grow successful businesses across selected industries through visionary leadership, innovation, integrity and stewardship, creating customer value, jobs, opportunities and sustainable enterprises.",
  purpose:
    "To use entrepreneurship, business excellence and responsible leadership to create opportunities, empower people and communities, and build enterprises that can make a lasting contribution across generations.",
  approach:
    "K Group aims to grow through clear customer value propositions, disciplined financial management, capable people, consistent service standards and evidence-based expansion. Priorities include validating market demand, strengthening operating systems, documenting responsibilities and building sustainable revenue before expanding into additional markets.",
  leadership:
    "The founder currently leads the group's development and strategic direction. Leadership structures, advisory capacity and management roles may evolve as the portfolio and operating requirements grow.",
};

export interface Value {
  icon: LucideIcon;
  name: string;
  line: string;
  text: string;
}

export const values: Value[] = [
  { icon: Cross, name: "Faith and Christian Foundation", line: "Guides us", text: "Grounding our conduct in faith-informed principles, compassion, honesty and service." },
  { icon: ShieldCheck, name: "Integrity and Accountability", line: "Builds trust", text: "Keeping commitments, acting transparently and taking responsibility for decisions." },
  { icon: Award, name: "Excellence and Professionalism", line: "Drives us", text: "Delivering reliable quality and continually improving how we work." },
  { icon: Lightbulb, name: "Innovation and Creativity", line: "Creates value", text: "Finding practical, forward-looking ways to solve problems and serve markets." },
  { icon: TrendingUp, name: "Growth and Entrepreneurship", line: "Expands impact", text: "Building resilient businesses through initiative, learning and disciplined execution." },
  { icon: HeartHandshake, name: "Service and Customer Commitment", line: "Empowers people", text: "Respecting customers, listening carefully and aiming to exceed expectations." },
  { icon: Users, name: "People and Community Empowerment", line: "Creates opportunity", text: "Creating meaningful opportunities and treating people with dignity." },
  { icon: Sprout, name: "Stewardship and Sustainability", line: "Protects tomorrow", text: "Managing resources responsibly and planning for enduring value." },
];

export const growth = [
  { step: "01", name: "Foundation", text: "Confirm legal and brand relationships, service offers, pricing, records, responsibilities and operating standards." },
  { step: "02", name: "Market Validation", text: "Build a repeatable customer pipeline, measure customer satisfaction and establish reliable revenue." },
  { step: "03", name: "Systems and Portfolio Development", text: "Document workflows, improve reporting and strengthen the businesses with the clearest commercial traction." },
  { step: "04", name: "Controlled Expansion", text: "Expand capacity and geographic reach where performance, cash flow and demand justify investment." },
  { step: "05", name: "Regional and International Growth", text: "Pursue partnerships and markets in Africa and beyond when the business model is ready." },
];

export interface Brand {
  name: string;
  category: string;
  tagline?: string;
  /** Page on this site. Brands without one show "Profile coming soon". */
  link?: string;
}

export const portfolio: Brand[] = [
  { name: "KachSound Media", category: "Media, entertainment and event production", link: "/kach-sound-media" },
  { name: "KBR Radio", category: "Radio and gospel-oriented media", tagline: "Taking the Gospel to the World.", link: "/kbr-radio" },
  { name: "KBR TV", category: "Television and digital media", tagline: "Taking the Gospel to the World.", link: "/kbr-tv" },
  { name: "Breakout Events", category: "Events and experiences", link: "/breakout-events" },
  { name: "KBR DJ Academy", category: "DJ education and skills development", tagline: "Where Passion Meets the Beat.", link: "/kbr-academy" },
  { name: "Links Auto Motors", category: "Automotive", link: "/links-auto-motors" },
  { name: "COVNT.", category: "Purpose-led apparel and lifestyle", tagline: "Wear Your Purpose.", link: "/covnt" },
  { name: "DJ KACH Ministries", category: "Christian ministry and gospel engagement", tagline: "The Gospel Sound Ambassador.", link: "/dj-kach-ministries" },
];

export const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Leadership", href: "/team" },
  { name: "CSR", href: "/csr" },
  { name: "Contact", href: "/contacts" },
];
