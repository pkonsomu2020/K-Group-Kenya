import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import KBRRadioLogo from "/COMPANY LOGOS/KBRRADIO.jpg";
import heroImg from "/COMPANY LOGOS/KBRRADIO.jpg";
import Banner from "@/components/Banner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Phone, Smartphone, Facebook, Instagram, Youtube, Mail, Radio, Clock, Users } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import MinimalRadioPlayer from "@/components/MinimalRadioPlayer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const galleryImages = [
  ...[...Array(6)].map((_, i) => `/GALLERY/kbr radio/kbrradio ${i + 1}.jpg`)
];

const KBRRadio = () => (
  <div className="min-h-screen bg-background pt-16">
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
    {/* Hero Banner */}
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 bg-brand-black overflow-hidden">
      <img src="/assets/dj-kach-hero.jpg" alt="Banner Background" className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" />
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="relative w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-brand-red mt-0 mb-4 overflow-hidden">
          <img src={KBRRadioLogo} alt="KBR Radio Logo" className="object-cover w-full h-full" />
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-2">KBR Radio</h1>
        <span className="text-brand-red font-bold text-2xl mb-4 block">Voices that Resonate.</span>
        <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto mb-0 leading-relaxed">
          KBR Radio amplifies voices and stories that matter. Tune in for diverse programming, music, and conversations that inspire, inform, and entertain.
        </p>
      </div>
    </section>

    {/* Live Stream Section */}
    <section className="py-16 px-4 bg-gradient-to-br from-brand-red to-red-600">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Listen Live</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Tune in to KBR Radio 254 for the best in gospel music, inspirational shows, and community programming
          </p>
          <div className="mt-4 p-3 bg-white/10 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-white/80">
              <strong>Note:</strong> Stream availability may vary. If the player doesn't work, the station might be offline or broadcasting on FM frequencies.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center items-center">
          <MinimalRadioPlayer />
        </div>
      </div>
    </section>

    {/* About Section */}
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold uppercase mb-4 text-brand-red">About Us</h2>
          <p className="text-black mb-4 text-lg text-left">
            KBR Radio is the community-first digital and FM station of K-GROUP KENYA, giving a voice to the voiceless with gospel, talk shows, live DJ sets, and local news. We promote local artists, changemakers, and build cohesion through media.
          </p>
          <ul className="list-disc list-inside text-black text-left">
            <li>Gospel & Inspirational Music</li>
            <li>Talk Shows & Interviews</li>
            <li>Community News & Updates</li>
            <li>Live Broadcasts & Podcasts</li>
          </ul>
          <div className="mt-8">
            <h3 className="text-xl font-bold text-brand-red mb-2">Contacts</h3>
            <ul className="text-black text-lg">
              <li>Phone: 020-2113473</li>
              <li>Phone: 0768550331</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <img src={galleryImages[0]} alt="KBR Radio Gallery" className="rounded-xl shadow-lg object-contain max-h-[500px] mx-auto" />
        </div>
      </div>
    </section>



    {/* Gallery Section */}
    <section className="py-16 px-4 bg-brand-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="brand-section-title text-white">Gallery</h2>
        <div className="mt-8 relative">
          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((img, idx) => (
                <CarouselItem key={idx} className="flex items-center justify-center">
                  <img
                    src={img}
                    alt={`KBR Radio Gallery ${idx + 1}`}
                    className="rounded-xl shadow-lg object-contain max-h-[500px] mx-auto"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-20" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-20" />
          </Carousel>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section className="py-16 px-4 bg-brand-red text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* CTA Box */}
        <div className="text-center md:text-left flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Tune In & Connect</h2>
          <p className="mb-6 text-lg">Contact us for show participation, music submissions, or to become part of our community. Let your voice be heard!</p>
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
              <a href="tel:0202113473" className="bg-white text-brand-red font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition flex items-center gap-2">
                <Phone className="w-5 h-5 text-brand-red" />
                020-2113473
              </a>
              <a href="tel:0768550331" className="bg-white text-brand-red font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-brand-red" />
                0768550331
              </a>
            </div>
            <a href="mailto:breakoutradio@gmail.com" className="bg-white text-brand-red font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition flex items-center gap-2 mt-4 md:mt-0">
              <Mail className="w-5 h-5 text-brand-red" />
              breakoutradio@gmail.com
            </a>
            <div className="flex gap-4 justify-center md:justify-start mt-2">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200"><Facebook className="w-8 h-8" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200"><Instagram className="w-8 h-8" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200"><Youtube className="w-8 h-8" /></a>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div>
          <BookingForm companyEnquire="KBR Radio" />
        </div>
      </div>
    </section>
    <Footer />
  </div>
);
export default KBRRadio; 