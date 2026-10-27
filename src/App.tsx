import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
const Events = lazy(() => import("./pages/Events"));
const Services = lazy(() => import("./pages/Services"));
const AudioMixes = lazy(() => import("./pages/AudioMixes"));
const VideoMixes = lazy(() => import("./pages/VideoMixes"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contacts = lazy(() => import("./pages/Contacts"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const BookingTerms = lazy(() => import("./pages/BookingTerms"));
const KachSoundMedia = lazy(() => import("./pages/KachSoundMedia"));
const LinksAutoMotors = lazy(() => import("./pages/LinksAutoMotors"));
const BreakoutEvents = lazy(() => import("./pages/BreakoutEvents"));
const KBRRadio = lazy(() => import("./pages/KBRRadio"));
const KBRAcademy = lazy(() => import("./pages/KBRAcademy"));
const KBRTV = lazy(() => import("./pages/KBRTV"));
const BreakoutBibleFellowship = lazy(() => import("./pages/BreakoutBibleFellowship"));
import { ThemeProvider } from "@/components/ThemeProvider";
import { KMark } from "@/components/corp/Logo";
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const CSR = lazy(() => import("./pages/CSR"));
const COVNT = lazy(() => import("./pages/COVNT"));
const DJKachMinistries = lazy(() => import("./pages/DJKachMinistries"));

const queryClient = new QueryClient();

// Scroll to the #anchor of a link (for example /#portfolio) once the page has rendered.
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 120);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);
  return null;
};

const WHATSAPP_NUMBER = "254768550331"; // Updated WhatsApp number
const WHATSAPP_MESSAGE = encodeURIComponent("Hello K-GROUP KENYA! I found your website and would like to connect.");

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B1F3B]">
          <div className="flex flex-col items-center">
            <KMark className="h-20 w-20 animate-pulse" arc="#F8F9FB" />
            <div className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">K Group Kenya</div>
          </div>
        </div>
      )}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToHash />
            <Suspense fallback={<div className="min-h-screen bg-[#0B1F3B]" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/kach-sound-media" element={<KachSoundMedia />} />
              <Route path="/links-auto-motors" element={<LinksAutoMotors />} />
              <Route path="/breakout-events" element={<BreakoutEvents />} />
              <Route path="/kbr-radio" element={<KBRRadio />} />
              <Route path="/kbr-academy" element={<KBRAcademy />} />
              <Route path="/kbr-tv" element={<KBRTV />} />
              <Route path="/breakout-bible-fellowship" element={<BreakoutBibleFellowship />} />
              <Route path="/events" element={<Events />} />
              <Route path="/services" element={<Services />} />
              <Route path="/audio-mixes" element={<AudioMixes />} />
              <Route path="/video-mixes" element={<VideoMixes />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/booking-terms" element={<BookingTerms />} />
              <Route path="/team" element={<Team />} />
              <Route path="/csr" element={<CSR />} />
              <Route path="/covnt" element={<COVNT />} />
              <Route path="/dj-kach-ministries" element={<DJKachMinistries />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.09 1.6 5.85L0 24l6.32-1.65A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.75.98.99-3.65-.24-.38A9.96 9.96 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.62-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
        </svg>
      </a>
    </div>
  );
};

export default App;
