import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="corp min-h-screen bg-background">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner title="404 - Page Not Found" subtitle="Oops! The page you are looking for does not exist. Please check the URL or return to the homepage." />
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-white mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <Link to="/" className="text-blue-500 underline">Go to K-GROUP KENYA Home</Link>
        <Link to="/kach-sound-media" className="text-blue-500 underline">Kach Sound Media</Link>
        <Link to="/links-auto-motors" className="text-blue-500 underline">Links Auto Motors</Link>
        <Link to="/breakout-events" className="text-blue-500 underline">Breakout Events</Link>
        <Link to="/kbr-tv" className="text-blue-500 underline">KBR TV</Link>
        <Link to="/kbr-radio" className="text-blue-500 underline">KBR Radio</Link>
        <Link to="/breakout-bible-fellowship" className="text-blue-500 underline">Breakout Bible Fellowship</Link>
        <Link to="/kbr-academy" className="text-blue-500 underline">KBR Academy</Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
