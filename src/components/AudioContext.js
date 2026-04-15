import React, { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const playerRef = useRef(null);

  const [audio, setAudio] = useState(null);
  const [paused, setPaused] = useState(true);

  const play = (data) => {
    setAudio(data);
    setPaused(false);
  };

  const pause = () => setPaused(true);
  const toggle = () => setPaused(p => !p);
  const stop = () => {
    setPaused(true);
    setAudio(null);
  };

  return (
    <AudioContext.Provider
      value={{
        playerRef,
        audio,
        paused,
        play,
        pause,
        toggle,
        stop,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};