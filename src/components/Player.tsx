import { parse } from "ass-compiler";
import React, { useState, useRef, useEffect, useContext } from "react";
import { convertTimeToSeconds, findSubtitleAtTime, hexCode } from "../utils";
import { Context } from "../utils/contexts/Context";
import { Subtitle } from "../utils/types";
import Sub from "./Sub";

interface Props {
  videoSrc: string;
}

const Player: React.FC<Props> = ({ videoSrc }) => {
  const {
    currentSub,
    setCurrentSub,
    subtitles,
    parsedAss,
    setCurrentTime,
    currentTime,
    setVideo,
    videoFile,
  } = useContext(Context);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      setVideo(videoRef.current);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && subtitles) {
      const crnsub = findSubtitleAtTime(
        subtitles as Subtitle[],
        videoRef.current.currentTime
      );
      setCurrentSub(crnsub);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (videoFile) {
      const media = URL.createObjectURL(videoFile);
      if (videoRef.current) {
        videoRef.current.src = media;
      }
    }
  }, [videoFile]);

  return (
    <>
      <div className="relative">
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
          Browser does not support video.
        </video>

        <div className="z-[20] w-full text-center pointer-events-none transition-all duration-[200ms] ease-in-out absolute bottom-[10px] justify-center overflow-hidden flex">
          <div className="inline-flex flex-col p-[0px_5px] mb-[20px]">
            <h1 className="sub w-full">
              <React.Fragment>
                {currentSub?.Text.raw.split(/\\N+/g).map((line, index) => (
                  <Sub index={index} line={line} />
                ))}
              </React.Fragment>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
