import { parse } from "ass-compiler";
import React, { useState, useRef, useEffect } from "react";
import { findSubtitleAtTime, hexCode } from "../utils";
import { Subtitle } from "../utils/types";

type Props = {
  videoSrc: string | undefined;
  subtitles: Subtitle[] | undefined;
  ass: string | undefined;
  currentTime: number | undefined;
  setCurrentTime: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const Player = ({
  videoSrc,
  subtitles,
  ass,
  currentTime,
  setCurrentTime,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [currentSub, setCurrentSub] = useState<Subtitle>();
  const [hover, setHover] = useState<boolean>();

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      if (subtitles) {
        setCurrentSub(
          findSubtitleAtTime(subtitles, videoRef.current.currentTime)
        );
      }
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (ass) {
      const formated = parse(ass);
      const subtitle = subtitleRef.current;
      if (subtitle) {
        const currentStyle = formated.styles.style.find(
          (e: any) => e.Name === currentSub?.Style
        );

        if (!currentStyle) return;

        subtitle.style.textAlign = currentStyle?.Alignment as string;
        subtitle.style.fontSize = (currentStyle?.Fontsize + "px") as string;
        subtitle.style.fontWeight =
          currentStyle?.Bold === "-1" ? "bold" : "normal";
        subtitle.style.fontStyle =
          currentStyle?.Italic === "-1" ? "italic" : "normal";
        subtitle.style.color = hexCode(currentStyle?.PrimaryColour as string);
        subtitle.style.backgroundColor = hexCode(
          currentStyle?.BackColour as string
        );
        subtitle.style.textShadow = currentStyle?.Shadow as string;
        subtitle.style.letterSpacing = currentStyle?.Spacing as string;
        subtitle.style.wordSpacing = currentStyle?.Spacing as string;
        subtitle.style.textDecoration =
          currentStyle?.Underline === "-1" ? "underline" : "none";
        subtitle.style.textShadow = ``;
      }

      return () => {
        if (subtitle) {
          subtitle.removeEventListener("load", () => {});
        }
      };
    }
  }, [subtitles, currentTime]);

  useEffect(() => {
    if (!subtitles) {
      setCurrentSub(undefined);
    }
  }, [subtitles]);

  return (
    <div>
      <video
        className="w-full h-full max-w-full z-[60]"
        controls={hover ? true : false}
        controlsList="nodownload"
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        Przeglądarka nie obsługuje tagu video.
      </video>
      <div>
        <div
          className="z-[20] w-full text-center pointer-events-none transition-all duration-[200ms] ease-in-out absolute bottom-[10px] justify-center overflow-hidden flex"
          ref={subtitleRef}
        >
          <div className="inline-flex flex-col p-[0px_5px] mb-[20px]">
            <h1 className="sub">{currentSub?.Text.combined}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
