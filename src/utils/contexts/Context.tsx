import { ParsedASS, ParsedASSEvent, ParsedASSStyles } from "ass-compiler";
import React, { createContext, useContext } from "react";
import { FontType, Subtitle } from "../types";

interface ContextProps {
  subtitles: Subtitle[] | undefined;
  setSubtitles: React.Dispatch<React.SetStateAction<Subtitle[] | undefined>>;
  parsedAss: ParsedASS | undefined;
  setParsedAss: React.Dispatch<React.SetStateAction<ParsedASS | undefined>>;
  currentTime: number | undefined;
  setCurrentTime: React.Dispatch<React.SetStateAction<number | undefined>>;
  currentSub: Subtitle | undefined;
  setCurrentSub: React.Dispatch<React.SetStateAction<Subtitle | undefined>>;
  video: HTMLVideoElement | undefined;
  setVideo: React.Dispatch<React.SetStateAction<HTMLVideoElement | undefined>>;
  subtitleFile: File | undefined;
  setSubtitleFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  videoFile: File | undefined;
  setVideoFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  currentFont: FontType | undefined;
  setCurrentFont: React.Dispatch<React.SetStateAction<FontType | undefined>>;
  actors: string[] | undefined;
  setActors: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export const Context = createContext<ContextProps>({
  subtitles: undefined,
  setSubtitles: () => {},
  parsedAss: undefined,
  setParsedAss: () => {},
  currentTime: undefined,
  setCurrentTime: () => {},
  currentSub: undefined,
  setCurrentSub: () => {},
  video: undefined,
  setVideo: () => {},
  subtitleFile: undefined,
  setSubtitleFile: () => {},
  videoFile: undefined,
  setVideoFile: () => {},
  currentFont: undefined,
  setCurrentFont: () => {},
  actors: undefined,
  setActors: () => {},
});
