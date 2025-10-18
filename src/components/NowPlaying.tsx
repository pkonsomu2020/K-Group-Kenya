import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Clock, Users, Radio } from 'lucide-react';

interface NowPlayingProps {
  isLive: boolean;
  currentTrack?: {
    title: string;
    artist: string;
    duration?: string;
  };
  listeners?: number;
  showName?: string;
  nextShow?: {
    name: string;
    time: string;
  };
}

const NowPlaying: React.FC<NowPlayingProps> = ({ 
  isLive, 
  currentTrack, 
  listeners = 0,
  showName,
  nextShow 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Card className="w-full bg-gradient-to-r from-brand-black to-gray-800 text-white border-0 shadow-lg">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Now Playing</h3>
              <p className="text-sm text-gray-300">{formatTime(currentTime)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant={isLive ? "default" : "secondary"} 
              className={isLive ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"}
            >
              {isLive ? "LIVE" : "OFFLINE"}
            </Badge>
            {listeners > 0 && (
              <Badge variant="outline" className="border-white/30 text-white">
                <Users className="w-3 h-3 mr-1" />
                {listeners}
              </Badge>
            )}
          </div>
        </div>

        {/* Current Track */}
        {isLive && currentTrack ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="w-12 h-12 bg-brand-red/20 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-brand-red" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-white">{currentTrack.title}</h4>
                <p className="text-gray-300">{currentTrack.artist}</p>
                {currentTrack.duration && (
                  <p className="text-sm text-gray-400 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentTrack.duration}
                  </p>
                )}
              </div>
            </div>

            {/* Show Information */}
            {showName && (
              <div className="p-3 bg-brand-red/10 rounded-lg border border-brand-red/20">
                <p className="text-sm text-brand-red font-medium">Current Show: {showName}</p>
              </div>
            )}

            {/* Next Show */}
            {nextShow && (
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="text-white font-medium">Next:</span> {nextShow.name} at {nextShow.time}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Radio className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400">No stream currently playing</p>
            <p className="text-sm text-gray-500 mt-2">Tune in to hear our live programming</p>
          </div>
        )}

        {/* Station Info */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>KBR Radio 254</span>
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NowPlaying;

