import { parse } from "ass-compiler";
import React, { useState, useRef, useEffect, useContext } from "react";
import { findSubtitleAtTime, hexCode } from "../utils";
import { Context } from "../utils/contexts/Context";
import { Subtitle } from "../utils/types";

interface Props {
  videoSrc: string;
}

const Player: React.FC<Props> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [currentSub, setCurrentSub] = useState<Subtitle | undefined>();
  const [hover, setHover] = useState<boolean>(false);

  const { subtitles, parsedAss, setCurrentTime, currentTime } =
    useContext(Context);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentSub = findSubtitleAtTime(
        subtitles as Subtitle[],
        videoRef.current.currentTime
      );
      setCurrentSub(currentSub);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (parsedAss && subtitleRef.current) {
      const currentStyle = parsedAss.styles.style.find(
        (e: any) => e.Name === currentSub?.Style
      );

      if (!currentStyle) return;

      const outline = Number(currentStyle.Outline);
      const outlineColor = currentStyle.OutlineColour.slice(4);

      const style: React.CSSProperties = {
        fontFamily: currentStyle.Fontname,
        fontSize: `${currentStyle.Fontsize}px`,
        fontWeight: currentStyle.Bold === "1" ? "bold" : "normal",
        color: `#${currentStyle.PrimaryColour.slice(4)}`,
        textShadow: `#${outlineColor} ${outline}px ${outline}px ${outline}px, #${outlineColor} ${outline}px ${outline}px ${outline}px, #${outlineColor} ${-outline}px ${outline}px ${outline}px, #${outlineColor} ${outline}px ${-outline}px ${outline}px, #${outlineColor} ${outline}px ${outline}px ${outline}px, #${outlineColor} ${-outline}px ${-outline}px ${outline}px, #${outlineColor} ${outline}px ${-outline}px ${outline}px, #${outlineColor} ${-outline}px ${outline}px ${outline}px, #${outlineColor} ${outline}px ${outline}px 0px, #${outlineColor} ${outline}px ${outline}px 0px, #${outlineColor} ${outline}px ${outline}px 0px`,
        letterSpacing: `${currentStyle.Spacing}px`,
        textDecoration:
          currentStyle.StrikeOut === "1"
            ? "line-through"
            : currentStyle.Underline === "1"
            ? "underline"
            : "none",
        textAlign:
          currentStyle.Alignment === "2"
            ? "center"
            : currentStyle.Alignment === "4"
            ? "justify"
            : "left",
      };

      Object.assign(subtitleRef.current.style, style);
    }
  }, [parsedAss, subtitles, currentSub, subtitleRef]);

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
            <h1 className="sub">{currentSub?.Text.raw}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
