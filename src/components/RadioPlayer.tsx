import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  Wifi, 
  WifiOff,
  Music,
  Clock
} from 'lucide-react';

interface RadioPlayerProps {
  streamUrl: string;
  stationName: string;
  autoPlay?: boolean;
  showMetadata?: boolean;
}

interface StreamMetadata {
  title: string;
  artist: string;
  listeners: number;
  status: 'online' | 'offline' | 'connecting';
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ 
  streamUrl, 
  stationName, 
  autoPlay = false,
  showMetadata = true 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [streamStatus, setStreamStatus] = useState<'online' | 'offline' | 'connecting'>('offline');
  const [metadata, setMetadata] = useState<StreamMetadata>({
    title: 'KBR Radio 254',
    artist: 'Live Stream',
    listeners: 0,
    status: 'offline'
  });
  const [error, setError] = useState<string | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Handle play/pause
  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      setIsLoading(true);
      setError(null);

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setStreamStatus('offline');
      } else {
        setStreamStatus('connecting');
        
        // Try multiple stream URLs as fallbacks
        const streamUrls = [
          streamUrl,
          'https://kbrradio254.radio12345.com/stream',
          'https://kbrradio254.radio12345.com/',
          'https://listen2myradio.com/stream/kbrradio254'
        ];
        
        let connected = false;
        for (const url of streamUrls) {
          try {
            audioRef.current.src = url;
            await audioRef.current.play();
            connected = true;
            break;
          } catch (urlError) {
            console.log(`Failed to connect to ${url}:`, urlError);
            continue;
          }
        }
        
        if (connected) {
          setIsPlaying(true);
          setStreamStatus('online');
        } else {
          throw new Error('Unable to connect to any stream source');
        }
      }
    } catch (err) {
      console.error('Stream error:', err);
      setError('Stream is currently offline. Please try again later or contact us for assistance.');
      setStreamStatus('offline');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  // Audio event handlers
  const handleLoadStart = () => {
    setIsLoading(true);
    setStreamStatus('connecting');
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setStreamStatus('online');
    setError(null);
  };

  const handleError = () => {
    setIsLoading(false);
    setStreamStatus('offline');
    setIsPlaying(false);
    setError('Stream connection failed. Please check your internet connection.');
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setStreamStatus('offline');
  };

  // Simulate metadata updates (in real implementation, this would come from the stream)
  useEffect(() => {
    if (isPlaying && showMetadata) {
      const interval = setInterval(() => {
        setMetadata(prev => ({
          ...prev,
          listeners: Math.floor(Math.random() * 50) + 10, // Simulate listener count
          title: prev.title === 'KBR Radio 254' ? 'Gospel Mix Live' : 'KBR Radio 254'
        }));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, showMetadata]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-r from-brand-red to-red-600 text-white border-0 shadow-2xl">
      <CardContent className="p-6">
        {/* Station Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Radio className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{stationName}</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  streamStatus === 'online' ? 'bg-green-400' : 
                  streamStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 
                  'bg-red-400'
                }`} />
                <span className="text-sm opacity-90">
                  {streamStatus === 'online' ? 'LIVE' : 
                   streamStatus === 'connecting' ? 'CONNECTING...' : 
                   'OFFLINE'}
                </span>
              </div>
            </div>
          </div>
          
          {showMetadata && streamStatus === 'online' && (
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Wifi className="w-3 h-3 mr-1" />
              {metadata.listeners} listeners
            </Badge>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
            <p className="text-sm text-red-100">{error}</p>
          </div>
        )}

        {/* Now Playing Info */}
        {showMetadata && isPlaying && (
          <div className="mb-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <Music className="w-5 h-5 text-white/80" />
              <div className="flex-1">
                <p className="font-semibold text-white">{metadata.title}</p>
                <p className="text-sm text-white/80">{metadata.artist}</p>
              </div>
              <Clock className="w-4 h-4 text-white/60" />
            </div>
          </div>
        )}

        {/* Player Controls */}
        <div className="space-y-4">
          {/* Main Play/Pause Button */}
          <div className="flex justify-center">
            <Button
              onClick={togglePlayPause}
              disabled={isLoading}
              size="lg"
              className="w-16 h-16 rounded-full bg-white text-brand-red hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
            
            <span className="text-sm text-white/80 w-8">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>

        {/* Stream Info */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>Stream Quality: 128kbps</span>
            <span>Format: MP3</span>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onEnded={handleEnded}
          preload="none"
          crossOrigin="anonymous"
        />
      </CardContent>
    </Card>
  );
};

export default RadioPlayer;
