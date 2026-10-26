import EventsSection from "@/components/EventsSection"
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { ThemeProvider } from "@/components/ThemeProvider";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner title="Upcoming Events" subtitle="Join us at these events and experience live worship, music and community." eyebrow="What's on" crumb="Events" />
      <div className="pt-0">
        <EventsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Events;