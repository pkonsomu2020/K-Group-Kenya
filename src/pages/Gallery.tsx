import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Download, Eye, X } from "lucide-react"
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { useState } from "react"
import { useEffect } from "react"
import { ThemeProvider } from "@/components/ThemeProvider";

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Gospel Festival 2024",
      category: "Festival",
      date: "December 2024",
      location: "Grace Convention Center",
      attendees: "5000+",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
      ],
      featured: true
    },
    {
      id: 2,
      title: "Youth Revival Night",
      category: "Revival",
      date: "November 2024",
      location: "Faith Church Auditorium",
      attendees: "800",
      images: [
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"
      ],
      featured: false
    },
    {
      id: 3,
      title: "Wedding Celebration",
      category: "Wedding",
      date: "October 2024",
      location: "Garden Paradise Venue",
      attendees: "150",
      images: [
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop"
      ],
      featured: false
    },
    {
      id: 4,
      title: "Church Anniversary",
      category: "Anniversary",
      date: "September 2024",
      location: "Victory Chapel",
      attendees: "1200",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop"
      ],
      featured: true
    },
    {
      id: 5,
      title: "Outdoor Crusade",
      category: "Crusade",
      date: "August 2024",
      location: "City Park Grounds",
      attendees: "3000+",
      images: [
        "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1415201364774-f60f62d808c0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=300&fit=crop"
      ],
      featured: false
    },
    {
      id: 6,
      title: "Corporate Event",
      category: "Corporate",
      date: "July 2024",
      location: "Business Center",
      attendees: "300",
      images: [
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop"
      ],
      featured: false
    }
  ]

  // Extract unique categories and years
  const categories = [
    { name: "All", count: galleryItems.length },
    ...Array.from(new Set(galleryItems.map(item => item.category))).map(cat => ({
      name: cat,
      count: galleryItems.filter(item => item.category === cat).length
    }))
  ]
  const years = Array.from(new Set(galleryItems.map(item => item.date.match(/\d{4}/)?.[0]))).sort((a, b) => b.localeCompare(a))

  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedYear, setSelectedYear] = useState<string>(years[0] || "")
  const [lightbox, setLightbox] = useState<{images: string[], index: number} | null>(null)

  // Facebook gallery state
  const [fbImages, setFbImages] = useState<string[]>([])
  const [fbError, setFbError] = useState<string>("")

  useEffect(() => {
    // Example: Fetch public photos from Facebook Graph API (requires a public access token)
    // Replace 'YOUR_ACCESS_TOKEN' with a valid token for production
    const fetchFacebookImages = async () => {
      try {
        const pageId = "kachthedj";
        const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with a valid token
        const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/photos?fields=images,link&access_token=${accessToken}`);
        const data = await res.json();
        if (data && data.data) {
          setFbImages(data.data.map((item: any) => item.images[0].source));
        } else {
          setFbError("No images found or API limit reached.");
        }
      } catch (err) {
        setFbError("Unable to load Facebook images. Please try again later.");
      }
    };
    fetchFacebookImages();
  }, []);

  const filteredItems = galleryItems.filter(item =>
    (selectedCategory === "All" || item.category === selectedCategory) &&
    (selectedYear === "All" || item.date.includes(selectedYear))
  )

  return (
    <div className="corp min-h-screen bg-background">
      <Banner title="Gallery" subtitle="Explore event photos, behind-the-scenes moments, and more from K-GROUP KENYA." />
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <div className="pt-0">
        {/* Filters */}
        <section className="py-4 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center mb-2">
            {categories.map(category => (
              <Button
                key={category.name}
                variant={category.name === selectedCategory ? "divine" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center">
            <Button
              key="AllYears"
              variant={selectedYear === "All" ? "divine" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setSelectedYear("All")}
            >
              All Years
            </Button>
            {years.map(year => (
              <Button
                key={year}
                variant={year === selectedYear ? "divine" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}
          </div>
        </section>
        {/* Gallery Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card key={item.id} className="card-divine group relative overflow-hidden">
                  {item.featured && (
                    <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground z-10">
                      Featured
                    </Badge>
                  )}
                  {/* Main Image */}
                  <div className="relative cursor-pointer" onClick={() => setLightbox({images: item.images, index: 0})}>
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="divine" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Gallery
                      </Button>
                    </div>
                    {/* Image Count */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      +{item.images.length - 1} more
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Event Info */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <div className="text-xs text-muted-foreground">{item.date}</div>
                        </div>
                        <h3 className="text-lg font-bold group-hover:text-secondary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      {/* Event Details */}
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {item.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {item.attendees} attendees
                        </div>
                      </div>
                      {/* Thumbnail Preview */}
                      <div className="flex gap-1">
                        {item.images.slice(1, 4).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${item.title} ${index + 2}`}
                            className="w-16 h-12 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Lightbox */}
        {lightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <button className="absolute top-4 right-4 text-white" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center">
              <img src={lightbox.images[lightbox.index]} alt="Gallery" className="max-h-[80vh] max-w-[90vw] rounded shadow-lg" />
              <div className="flex gap-2 mt-4">
                <Button size="icon" variant="outline" disabled={lightbox.index === 0} onClick={() => setLightbox(l => l && {...l, index: l.index - 1})}>
                  &larr;
                </Button>
                <Button size="icon" variant="outline" disabled={lightbox.index === lightbox.images.length - 1} onClick={() => setLightbox(l => l && {...l, index: l.index + 1})}>
                  &rarr;
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Facebook Feed Section */}
        <section className="py-12 border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Follow on <span className="text-blue-600">Facebook</span></h3>
            <p className="text-muted-foreground mb-6">See the latest event photos and behind-the-scenes moments on Facebook.</p>
            <div className="flex justify-center">
              <a
                href="https://www.facebook.com/kachthedj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow transition">
                  View on Facebook
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Gallery;