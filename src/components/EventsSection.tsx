import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, ExternalLink, Image as ImageIcon } from "lucide-react"
import { useState } from "react"

const EventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Gospel Festival 2024",
      date: "July 15, 2024",
      time: "6:00 PM - 11:00 PM",
      location: "Grace Convention Center",
      city: "Downtown",
      type: "Festival",
      capacity: "5000+",
      status: "Available",
      description: "Annual gospel music festival featuring multiple artists and DJs",
      price: "Contact for booking"
    },
    {
      id: 2,
      title: "Youth Revival Night",
      date: "July 22, 2024", 
      time: "7:00 PM - 10:00 PM",
      location: "Faith Church Auditorium",
      city: "Westside",
      type: "Revival",
      capacity: "800",
      status: "Confirmed",
      description: "High-energy worship night designed for young believers",
      price: "Booked"
    },
    {
      id: 3,
      title: "Wedding Celebration",
      date: "August 5, 2024",
      time: "4:00 PM - 12:00 AM",
      location: "Garden Paradise Venue",
      city: "Riverside",
      type: "Wedding",
      capacity: "150",
      status: "Available",
      description: "Christian wedding celebration with gospel music",
      price: "Contact for quote"
    },
    {
      id: 4,
      title: "Church Anniversary",
      date: "August 18, 2024",
      time: "3:00 PM - 8:00 PM", 
      location: "Victory Chapel",
      city: "Central",
      type: "Anniversary",
      capacity: "1200",
      status: "Available",
      description: "50th anniversary celebration with special performances",
      price: "Contact for booking"
    }
  ]

  const eventTypes = [
    { name: "Church Events", count: "50+", color: "bg-primary" },
    { name: "Weddings", count: "120+", color: "bg-secondary" },
    { name: "Festivals", count: "25+", color: "bg-accent" },
    { name: "Revivals", count: "80+", color: "bg-destructive" },
  ]

  const [modalEvent, setModalEvent] = useState<any>(null);

  return (
    <section id="events" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Event Types Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {eventTypes.map((type, index) => (
              <div key={index} className="text-center">
                <div className={`w-3 h-3 ${type.color} rounded-full mx-auto mb-2`}></div>
                <div className="text-lg font-bold text-foreground">{type.count}</div>
                <div className="text-sm text-muted-foreground">{type.name}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Events List - New Format */}
        <div className="flex flex-col gap-8 mb-16">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-8 bg-white rounded-lg shadow p-6">
              {/* Logo/Avatar Placeholder */}
              <div className="flex flex-col items-center justify-center min-w-[80px]">
                <div className="text-5xl font-bold text-red-600 leading-none mb-1">{new Date(event.date).getDate()}</div>
                <div className="text-lg text-red-600">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{event.title}</span>
                </div>
                <div className="text-lg text-muted-foreground mt-1">{event.time} • {event.location}{event.city ? ` - ${event.city}` : ''}</div>
              </div>
              <div>
                <Button variant="outline" size="lg" onClick={() => setModalEvent(event)}>
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Modal for Event Details */}
        {modalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row relative max-h-[90vh]">
              <button className="absolute top-4 right-4 text-2xl" onClick={() => setModalEvent(null)}>&times;</button>
              <div className="flex-1 p-8 overflow-y-auto max-h-[90vh]">
                <h2 className="text-3xl font-bold mb-2">{modalEvent.title}</h2>
                <div className="text-lg text-muted-foreground mb-4">{modalEvent.location}{modalEvent.city ? `, ${modalEvent.city}` : ''}</div>
                {/* Google Maps Embed */}
                <iframe
                  title="Event Location"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(modalEvent.location + (modalEvent.city ? ', ' + modalEvent.city : ''))}&output=embed`}
                  allowFullScreen
                ></iframe>
                <div className="mt-6 space-y-2">
                  <div><b>Date:</b> {modalEvent.date}</div>
                  <div><b>Time:</b> {modalEvent.time}</div>
                  <div><b>Type:</b> {modalEvent.type}</div>
                  <div><b>Capacity:</b> {modalEvent.capacity}</div>
                  <div><b>Status:</b> {modalEvent.status}</div>
                  <div><b>Description:</b> {modalEvent.description}</div>
                  <div><b>Price:</b> {modalEvent.price}</div>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-8">
                {/* Logo/Avatar Placeholder */}
                <div className="flex flex-col items-center">
                  <div className="text-7xl font-bold text-red-600 leading-none mb-2">{new Date(modalEvent.date).getDate()}</div>
                  <div className="text-2xl text-red-600">{new Date(modalEvent.date).toLocaleString('default', { month: 'long' })}</div>
                  <div className="mt-4 text-xl font-bold text-foreground">{modalEvent.title}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Call to Action */}
        <div className="text-center">
          <Card className="card-divine max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-divine">Need DJ Services?</h3>
              <p className="text-muted-foreground mb-6">
                Planning a gospel event, wedding, or church celebration? Let's create an unforgettable 
                worship experience together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="divine" size="lg" onClick={() => window.location.href = '/contacts'}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default EventsSection