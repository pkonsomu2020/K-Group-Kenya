import type { LucideIcon } from "lucide-react";
import { Headphones, Mic, Speaker, Heart, Church, Briefcase, Tv } from "lucide-react";

/**
 * Content for the DJ KACH Ministries page.
 * Source: the DJ Kach website (dj-kach.netlify.app) and the K Group Kenya corporate profile.
 */

const B = "/dj-kach";

export const DJK = {
  name: "DJ KACH",
  ministry: "DJ KACH Ministries",
  roles: ["Gospel DJ", "Music Minister", "Event Specialist", "MC & Host", "Gospel Sound Ambassador"],
  tagline: "The Gospel Sound Ambassador.",
  intro:
    "Bringing the joy of gospel music to every celebration. Professional DJ services that uplift spirits and create unforgettable moments.",
  phones: [
    { display: "(+254) 723 157-309", tel: "+254723157309", wa: "254723157309" },
    { display: "(+254) 780 157-309", tel: "+254780157309", wa: "254780157309" },
  ],
  email: "bookings@djkach.com",
  place: "Dolphine Plaza, Ongata Rongai",
  response: "Within 24 hours",
};

export const slides = [1, 2, 3, 4, 5, 6].map((n) => `${B}/slides/${n}.jpg`);
export const logo = `${B}/logo-white.png`;

export const tickerItems = [
  "Gospel Festivals", "Weddings", "Church Events", "Corporate Functions", "Youth Concerts",
  "Children Concerts", "Pool Parties", "Radio Shows", "Album Launches", "Award Ceremonies",
];

export const stats = [
  { value: 500, suffix: "+", label: "Events played" },
  { value: 1000, suffix: "+", label: "Happy clients" },
  { value: 50, suffix: "K+", label: "People entertained" },
  { value: 15, suffix: "+", label: "Years of experience" },
];

export const about = {
  title: "Spreading Joy Through Gospel Music",
  paragraphs: [
    "With over 15 years of experience in the music industry, DJ Kach has become one of the most sought-after gospel DJs in the region. Known for creating an atmosphere of worship and celebration, every performance is crafted to touch hearts and lift spirits.",
    "From intimate church gatherings to large corporate events, DJ Kach brings the perfect blend of contemporary gospel, traditional hymns, and uplifting Christian music that resonates with audiences of all ages.",
  ],
  specializations: ["Gospel Music Mixing", "Live Event Performance", "Sound System Setup", "MC Services", "Music Production", "Wedding Ceremonies"],
  values: [
    { title: "Faith-Centered", text: "Every performance is rooted in faith and designed to uplift spirits and bring people closer to God through music." },
    { title: "Professional Excellence", text: "We maintain the highest standards of professionalism in every aspect of our service delivery." },
    { title: "Community Impact", text: "Committed to making a positive impact in our community through music ministry and entertainment." },
  ],
  mission:
    "To create unforgettable musical experiences that bring people together, celebrate life's precious moments, and spread the joy of gospel music throughout our community. We believe that music has the power to heal, inspire, and unite people from all walks of life.",
};

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  bullets: string[];
}

export const services: Service[] = [
  { id: "gospel-dj", icon: Headphones, title: "Gospel DJ Services", text: "Professional gospel music mixing for all types of events and celebrations.", bullets: ["Custom playlist creation", "Live mixing", "Request accommodations", "Premium sound quality"] },
  { id: "mc", icon: Mic, title: "MC & Hosting", text: "Complete event hosting services with professional announcements and crowd engagement.", bullets: ["Event coordination", "Professional announcements", "Crowd engagement", "Seamless transitions"] },
  { id: "sound", icon: Speaker, title: "Sound System Setup", text: "Professional audio equipment setup and management for any venue size.", bullets: ["Equipment delivery", "Professional setup", "Technical support", "Quality assurance"] },
  { id: "wedding", icon: Heart, title: "Wedding Ceremonies", text: "Special wedding packages with processional, ceremony, and reception music.", bullets: ["Bridal consultation", "Ceremony music", "Reception entertainment", "Special requests"] },
  { id: "church", icon: Church, title: "Church Events", text: "Specialized services for church services, conferences, and religious gatherings.", bullets: ["Worship integration", "Scripture-based selections", "Prayer support", "Ministry collaboration"] },
  { id: "corporate", icon: Briefcase, title: "Corporate Events", text: "Professional entertainment for corporate functions and business celebrations.", bullets: ["Brand alignment", "Professional atmosphere", "Client networking", "Custom experience"] },
  { id: "media", icon: Tv, title: "Media Services", text: "Professional TV and radio presenting services for media and broadcasting.", bullets: ["TV Presenter", "Radio Presenter", "Script preparation", "Professional delivery"] },
];

export const included = [
  "Professional equipment provided",
  "Backup systems available",
  "Liability insurance covered",
  "Flexible payment options",
  "Free consultation available",
  "Custom playlist creation",
];

export interface Moment {
  id: string;
  label: string;
  photo: string;
  serviceId: string;
  line: string;
}

export const moments: Moment[] = [
  { id: "wedding", label: "Wedding", photo: `${B}/gallery/weddings/wedding-2.jpg`, serviceId: "wedding", line: "From the processional to the last dance, the right song for every moment of your day." },
  { id: "church", label: "Church event", photo: `${B}/slides/4.jpg`, serviceId: "church", line: "Worship-centred music and scripture-based selections for services, conferences and gatherings." },
  { id: "corporate", label: "Corporate", photo: `${B}/gallery/corporate/corporate-2.jpg`, serviceId: "corporate", line: "A polished, professional atmosphere that keeps clients and staff engaged." },
  { id: "youth", label: "Youth concert", photo: `${B}/slides/1.jpg`, serviceId: "gospel-dj", line: "High-energy gospel that gets a whole room on its feet." },
  { id: "kids", label: "Children's event", photo: `${B}/gallery/children/children-2.jpg`, serviceId: "mc", line: "Fun, engaging hosting and music that kids and families love." },
  { id: "pool", label: "Pool party", photo: `${B}/gallery/pool/pool-3.jpg`, serviceId: "sound", line: "Sound set up and managed for any venue, even by the water." },
];

export interface DJEvent {
  date: string;
  title: string;
  venue: string;
  time: string;
  attendees: number;
  type: string;
  image: string;
}

export const events: DJEvent[] = [
  { date: "2025-08-23", title: "Jikubali Afrifest 2nd Edition, Nairobi", venue: "Focus Center, Kasarani", time: "TBA", attendees: 400, type: "African Festival", image: `${B}/events/jikubali-afrifest.jpg` },
  { date: "2025-01-18", title: "The Call Show", venue: "MMU Radio 99.9 FM / KBR Radio 254", time: "7pm – 10pm", attendees: 1000, type: "Radio Show", image: `${B}/events/call-show.jpg` },
  { date: "2024-11-26", title: "Amefanya Makuu, Thanksgiving Album Launch", venue: "CITAM Thika Road", time: "TBA", attendees: 200, type: "Album Launch", image: `${B}/events/amefanya-makuu.jpg` },
  { date: "2024-10-27", title: "Hour of Worship", venue: "See Light International Ministries, Along Magadi Road", time: "2pm – 4pm", attendees: 300, type: "Worship Service", image: `${B}/events/hour-of-worship.jpg` },
  { date: "2023-12-29", title: "FEMA 2023 Award", venue: "KICC, Nairobi", time: "TBA", attendees: 500, type: "Award Ceremony", image: `${B}/events/fema-2023.jpg` },
  { date: "2022-10-29", title: "BREAKOUT DJ Praise Experience Vol 10", venue: "Barizi Resort, Along Gataka Road", time: "6pm – 10pm", attendees: 150, type: "Gospel Experience", image: `${B}/events/breakout-praise.jpg` },
];

const nums = (n: number[], dir: string, prefix: string) => n.map((i) => `${B}/gallery/${dir}/${prefix}-${i}.jpg`);
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export const galleryCategories = [
  { id: "youth", label: "Youth Concerts", photos: nums([...range(1, 13), 15], "youth", "youth") },
  { id: "pool", label: "Pool Parties", photos: nums(range(1, 10), "pool", "pool") },
  { id: "weddings", label: "Wedding Ceremonies", photos: nums(range(1, 6), "weddings", "wedding") },
  { id: "corporate", label: "Corporate Events", photos: nums(range(1, 5), "corporate", "corporate") },
  { id: "children", label: "Children Concerts", photos: nums(range(1, 3), "children", "children") },
];

export const videos = [
  { src: `${B}/videos/video-1.mp4`, poster: `${B}/videos/poster-1.jpg`, title: "Wedding Highlight Reel", text: "Best moments from recent weddings" },
  { src: `${B}/videos/video-2.mp4`, poster: `${B}/videos/poster-2.jpg`, title: "Gospel Festival Performance", text: "Live performance at Gospel Festival 2024" },
  { src: `${B}/videos/video-3.mp4`, poster: `${B}/videos/poster-3.jpg`, title: "Corporate Event Compilation", text: "Highlights from various corporate events" },
  { src: `${B}/videos/video-4.mp4`, poster: `${B}/videos/poster-4.jpg`, title: "Youth Event Highlights", text: "Fun moments from youth events" },
];
