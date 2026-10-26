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

const VideoMixes = () => {
  const [mixes, setMixes] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
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
    const videoMixes = data.filter((mix: any) => mix.type === "video")
    setMixes(videoMixes)
    if (videoMixes.length > 0 && !selectedYear) setSelectedYear(videoMixes[0].date?.slice(0, 4))
    // Do NOT auto-select or auto-play any video after upload
    // setSelectedId(null)
  }

  const years = Array.from(new Set(mixes.map(mix => mix.date?.slice(0, 4)))).sort((a, b) => b.localeCompare(a))
  const filteredMixes = mixes.filter(mix => mix.date?.slice(0, 4) === selectedYear)
  const selectedMix = mixes.find(mix => mix.id === selectedId) || null

  const handleWatch = (id: number) => {
    setSelectedId(id); // Always update selectedId, even if a video is already playing
  }

  const handleDownload = (mix: any) => {
    const link = document.createElement('a');
    // Use the backend download endpoint to force download
    const filename = mix.filename || (mix.url ? mix.url.split('/').pop() : 'video-mix.mp4');
    link.href = `${API_URL}/api/mixes/download/${filename}`;
    link.setAttribute('download', mix.title ? `${mix.title}.mp4` : 'video-mix.mp4');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleShare = (mix: any) => {
    const url = window.location.origin + `/video-mixes?id=${mix.id}`
    navigator.clipboard.writeText(url)
    setShareMsg(`Link copied for "${mix.title}"!`)
    setShareOpenId(mix.id)
    setTimeout(() => {
      setShareMsg("")
      setShareOpenId(null)
    }, 2000)
  }

  const handleSocialShare = (mix: any, platform: string) => {
    const url = encodeURIComponent(window.location.origin + `/video-mixes?id=${mix.id}`)
    const text = encodeURIComponent(`Check out this gospel video mix: ${mix.title}`)
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
    formData.append("type", "video")
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
      <Banner title="Video Mixes" subtitle="Watch inspiring gospel video mixes and live DJ sets." eyebrow="Watch" crumb="Video Mixes" />
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
        {/* Selected Video Player */}
        {selectedMix ? (
          <section className="py-8">
            <div className="max-w-3xl mx-auto px-4">
              <Card className="mb-8 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="text-xs mb-2">
                      {selectedMix.category}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{selectedMix.date}</div>
                  </div>
                  <CardTitle className="text-2xl">
                    {selectedMix.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{selectedMix.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <video key={selectedMix.filename || selectedMix.url} controls autoPlay className="w-full h-full">
                      <source src={`${API_URL}${selectedMix.url}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="divine" size="sm" onClick={() => handleDownload(selectedMix)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare(selectedMix)}>
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  {/* Share Socials */}
                  {shareOpenId === selectedMix.id && (
                    <div className="flex gap-2 mt-2">
                      <Button size="icon" variant="outline" onClick={() => handleSocialShare(selectedMix, 'facebook')} aria-label="Share on Facebook"><Facebook className="w-5 h-5" /></Button>
                      <Button size="icon" variant="outline" onClick={() => handleSocialShare(selectedMix, 'twitter')} aria-label="Share on Twitter"><Twitter className="w-5 h-5" /></Button>
                      <Button size="icon" variant="outline" onClick={() => handleSocialShare(selectedMix, 'whatsapp')} aria-label="Share on WhatsApp"><MessageCircle className="w-5 h-5" /></Button>
                      {shareMsg && <span className="text-green-600 text-xs ml-2">{shareMsg}</span>}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          <section className="py-8">
            <div className="max-w-3xl mx-auto px-4 text-center text-muted-foreground">
              <div className="text-lg">Select a video to watch</div>
            </div>
          </section>
        )}
        {/* Video Mixes Grid */}
        <section className="py-8">
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
                          onClick={() => handleWatch(mix.id)}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Watch
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

export default VideoMixes;