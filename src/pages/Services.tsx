import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Mic, Users, Settings, Calendar, Heart } from "lucide-react"
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { ThemeProvider } from "@/components/ThemeProvider";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Church Services",
      description: "Professional DJ services for worship, prayer meetings, and church events",
      icon: Heart,
      features: ["Sound system setup", "Live mixing", "Worship music curation", "Technical support"],
      price: "From KSh 15,000",
      duration: "2-4 hours",
      popular: true
    },
    {
      id: 2,
      title: "Wedding DJ Services",
      description: "Make your special day unforgettable with professional wedding DJ services",
      icon: Users,
      features: ["Pre-event consultation", "Custom playlist", "MC services", "Equipment included"],
      price: "From KSh 35,000",
      duration: "6-8 hours",
      popular: true
    },
    {
      id: 3,
      title: "Corporate Events",
      description: "Professional entertainment for corporate functions and conferences",
      icon: Settings,
      features: ["Background music", "Presentation support", "Sound system", "Professional setup"],
      price: "From KSh 25,000",
      duration: "4-6 hours",
      popular: false
    },
    {
      id: 4,
      title: "Festival Performance",
      description: "High-energy performances for festivals and large gatherings",
      icon: Music,
      features: ["Stage performance", "Professional equipment", "Sound engineering", "Live mixing"],
      price: "From KSh 50,000",
      duration: "1-3 hours",
      popular: false
    },
    {
      id: 5,
      title: "Private Parties",
      description: "Customized entertainment for birthdays, anniversaries, and celebrations",
      icon: Calendar,
      features: ["Custom music selection", "Interactive DJ experience", "Sound system", "Lighting effects"],
      price: "From KSh 20,000",
      duration: "3-5 hours",
      popular: false
    },
    {
      id: 6,
      title: "MC Services",
      description: "Professional master of ceremonies for your events",
      icon: Mic,
      features: ["Event coordination", "Professional hosting", "Crowd engagement", "Smooth transitions"],
      price: "From KSh 10,000",
      duration: "Event duration",
      popular: false
    }
  ]

  // Remove the packages array and the packages section
  // Update Book Now button to redirect to /contacts
  // Ensure all services match event types in contact form
  // Update 'Ready to Book Your Event?' section
  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner title="Our Services" subtitle="Professional sound, lights, DJ, MC, stage and LED screen solutions for every occasion." eyebrow="What we do" crumb="Services" />
      <div className="pt-0">
        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our <span className="text-red">Services</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.id} className="card-divine group relative">
                    {service.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                        Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="group-hover:text-secondary transition-colors">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-foreground">{service.price}</div>
                              <div className="text-xs text-muted-foreground">{service.duration}</div>
                            </div>
                            <Button variant="divine" size="sm" onClick={() => window.location.href = '/contacts'}>
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
        {/* Ready to Book Your Event? Section */}
        <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center rounded-lg border shadow">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Event?</h2>
            <p className="text-lg text-muted-foreground mb-8">Let us help you create an unforgettable worship experience. Get a free quote or view our portfolio of past events.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="divine" size="lg" onClick={() => window.location.href = '/contacts'}>
                Get Free Quote
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/gallery'}>
                View Portfolio
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
};

export default Services;