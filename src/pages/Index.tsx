import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "./Home";
import { ThemeProvider } from "@/components/ThemeProvider";

const Index = () => {
  return (
    <div className="corp min-h-screen bg-background">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Home />
      <Footer />
    </div>
  );
};

export default Index;
