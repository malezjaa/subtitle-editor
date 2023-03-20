import { ParsedASS } from "ass-compiler";
import { createContext, useContext } from "react";
import { Subtitle } from "../types";

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
});
