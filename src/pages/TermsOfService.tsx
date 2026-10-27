import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const TermsOfService = () => (
  <div className="corp min-h-screen bg-background">
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
    <div className="max-w-3xl mx-auto pt-32 pb-16 px-4">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">These are the Terms of Service for K Group Kenya. Please read them carefully before using our website or services. (Add your full terms of service here.)</p>
    </div>
    <Footer />
  </div>
);

export default TermsOfService; 