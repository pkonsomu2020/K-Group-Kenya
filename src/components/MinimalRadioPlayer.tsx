import React, { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const MinimalRadioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioSrc = "https://fdsfdsfdsf.radio12345.com/intro.mp3"; // Using the working URL from the radio station

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log("Play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow-lg p-6 w-fit border-2 border-brand-red/20">
      {/* Play / Pause button */}
      <button
        onClick={togglePlay}
        className="p-3 rounded-full bg-brand-red hover:bg-brand-red/90 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
      </button>

      {/* Now Playing text */}
      <div className="flex flex-col">
        <span className="font-bold text-brand-red text-lg">KBR Radio 254</span>
        <span className="text-sm text-gray-600">
          {isPlaying ? "Now Playing: Live Stream" : "Click play to start"}
        </span>
      </div>

      {/* Volume control */}
      <div className="flex items-center gap-2 ml-4">
        <Volume2 size={20} className="text-gray-600" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-brand-red"
        />
      </div>

      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </div>
  );
};

export default MinimalRadioPlayer;
