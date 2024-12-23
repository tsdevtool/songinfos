import { usePlayerStore } from "@/ui/stores/usePlayerStore";
import React, { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  //Handle play/pause logic
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else audioRef.current?.pause();
  }, [isPlaying]);

  //handle song end
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  //Handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    //check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      //reset the playback position
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);
  return <audio ref={audioRef} />;

  return <div>AudioPlayer</div>;
};

export default AudioPlayer;
