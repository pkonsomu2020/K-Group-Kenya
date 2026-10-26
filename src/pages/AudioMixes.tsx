import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Play, Pause, Clock, Users, Share2, Facebook, Twitter, MessageCircle, UploadCloud } from "lucide-react"
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { ThemeProvider } from "@/components/ThemeProvider";

const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const AudioMixes = () => {
  const [mixes, setMixes] = useState<any[]>([])
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [shareMsg, setShareMsg] = useState<string>("")
  const [shareOpenId, setShareOpenId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    fetchMixes()
  }, [])

  const fetchMixes = async () => {
    let data: any[] = []
    try {
      const res = await fetch(`${API_URL}/api/mixes`)
      if (!res.ok) throw new Error("Request failed")
      data = await res.json()
    } catch {
      // Server unreachable: show the empty state instead of crashing the page
      return
    }
    const audioMixes = data.filter((mix: any) => mix.type === "audio")
    setMixes(audioMixes)
    if (audioMixes.length > 0) setSelectedYear(audioMixes[0].date?.slice(0, 4))
  }

  const years = Array.from(new Set(mixes.map(mix => mix.date?.slice(0, 4)))).sort((a, b) => b.localeCompare(a))
  const filteredMixes = mixes.filter(mix => mix.date?.slice(0, 4) === selectedYear)

  const handlePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id)
  }

  const handleDownload = (mix: any) => {
    const link = document.createElement('a');
    // Use the backend download endpoint to force download
    const filename = mix.filename || (mix.url ? mix.url.split('/').pop() : 'audio-mix.mp3');
    link.href = `${API_URL}/api/mixes/download/${filename}`;
    link.setAttribute('download', mix.title ? `${mix.title}.mp3` : 'audio-mix.mp3');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleShare = (mix: any) => {
    const url = window.location.origin + `/audio-mixes?id=${mix.id}`
    navigator.clipboard.writeText(url)
    setShareMsg(`Link copied for "${mix.title}"!`)
    setShareOpenId(mix.id)
    setTimeout(() => {
      setShareMsg("")
      setShareOpenId(null)
    }, 2000)
  }

  const handleSocialShare = (mix: any, platform: string) => {
    const url = encodeURIComponent(window.location.origin + `/audio-mixes?id=${mix.id}`)
    const text = encodeURIComponent(`Check out this gospel audio mix: ${mix.title}`)
    let shareUrl = ""
    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
    } else if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${text}%20${url}`
    }
    window.open(shareUrl, '_blank')
  }

  // Upload form logic
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)
    setUploadError("")
    setUploadSuccess("")
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("type", "audio")
    try {
      const res = await fetch(`${API_URL}/api/mixes/upload`, {
        method: "POST",
        body: formData
      })
      if (!res.ok) throw new Error("Upload failed")
      setUploadSuccess("Upload successful!")
      form.reset()
      fetchMixes()
    } catch (err) {
      setUploadError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
      setTimeout(() => setUploadSuccess(""), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner title="Audio Mixes" subtitle="Listen to inspiring gospel mixes and live DJ sets." eyebrow="Listen" crumb="Audio Mixes" />
      <div className="pt-0">
        {/* Year Filter Tabs */}
        <section className="py-4 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center">
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
        {/* Audio Mixes Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMixes.map((mix) => (
                <Card key={mix.id} className="card-divine group relative">
                  {mix.featured && (
                    <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                      Featured
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="text-xs mb-2">
                        {mix.category}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{mix.date}</div>
                    </div>
                    <CardTitle className="group-hover:text-secondary transition-colors">
                      {mix.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">{mix.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mix Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {mix.duration}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="w-4 h-4 mr-1" />
                          {mix.downloads ? mix.downloads.toLocaleString() : "-"}
                        </div>
                      </div>
                      {/* File Size */}
                      <div className="text-xs text-muted-foreground">
                        File size: {mix.size}
                      </div>
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePlay(mix.id)}
                          className="flex-1"
                        >
                          {playingId === mix.id ? (
                            <Pause className="w-4 h-4 mr-1" />
                          ) : (
                            <Play className="w-4 h-4 mr-1" />
                          )}
                          {playingId === mix.id ? "Pause" : "Play"}
                        </Button>
                        <Button variant="divine" size="sm" className="flex-1" onClick={() => handleDownload(mix)}>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleShare(mix)}>
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                      {/* Audio Player */}
                      {playingId === mix.id && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <audio controls autoPlay className="w-full">
                            <source src={`${API_URL}${mix.url}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                      {/* Share Socials */}
                      {shareOpenId === mix.id && (
                        <div className="flex gap-2 mt-2">
                          <Button size="icon" variant="outline" onClick={() => handleSocialShare(mix, 'facebook')} aria-label="Share on Facebook"><Facebook className="w-5 h-5" /></Button>
                          <Button size="icon" variant="outline" onClick={() => handleSocialShare(mix, 'twitter')} aria-label="Share on Twitter"><Twitter className="w-5 h-5" /></Button>
                          <Button size="icon" variant="outline" onClick={() => handleSocialShare(mix, 'whatsapp')} aria-label="Share on WhatsApp"><MessageCircle className="w-5 h-5" /></Button>
                          {shareMsg && <span className="text-green-600 text-xs ml-2">{shareMsg}</span>}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default AudioMixes;