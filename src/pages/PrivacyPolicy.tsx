import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const PrivacyPolicy = () => (
  <div className="corp min-h-screen bg-background">
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
    <div className="max-w-3xl mx-auto pt-32 pb-16 px-4">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">This is the Privacy Policy for K Group Kenya. Here you will find information about how we collect, use, and protect your personal data. (Add your full privacy policy here.)</p>
    </div>
    <Footer />
  </div>
);

export default PrivacyPolicy; 