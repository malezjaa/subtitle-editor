import { ParsedASS } from "ass-compiler";
import { useCallback, useEffect, useState } from "react";
import EditArea from "./components/EditArea";
import Navbar from "./components/Layout/Navbar";
import Subtitles from "./components/Subtitles";
import VideoPlayer from "./components/VideoPlayer";
import { convertTimeToSeconds } from "./utils";
import { Context } from "./utils/contexts/Context";
import { Subtitle } from "./utils/types";

function App() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>();
  const [styles, setStyles] = useState<any>();
  const [parsedAss, setParsedAss] = useState<ParsedASS | undefined>();
  const [currentSub, setCurrentSub] = useState<Subtitle | undefined>();
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);
  const [video, setVideo] = useState<HTMLVideoElement | undefined>();
  const [videoFile, setVideoFile] = useState<File | undefined>();
  const [subtitleFile, setSubtitleFile] = useState<File | undefined>();

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        (event.target as HTMLInputElement).nodeName === "INPUT" ||
        (event.target as HTMLInputElement).nodeName === "TEXTAREA" ||
        (event.target as HTMLInputElement).nodeName === "VIDEO"
      ) {
        return;
      }

      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (subtitles) {
            if (event.key === "Enter") {
              if (currentSub) {
                const nextIndex =
                  currentSub.index !== undefined ? currentSub.index + 1 : 0;
                const target = subtitles[nextIndex] || subtitles[0];
                const time = convertTimeToSeconds(target?.Start) + 0.01;

                if (video && time > video?.duration) {
                  return;
                }

                setCurrentSub(target);
              }
            }
          }
          break;
        default:
          break;
      }
    },
    [subtitles, currentSub]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <>
      <Context.Provider
        value={{
          subtitles,
          setSubtitles,
          parsedAss,
          setParsedAss,
          currentSub,
          setCurrentSub,
          currentTime,
          setCurrentTime,
          video,
          setVideo,
          videoFile,
          setVideoFile,
          subtitleFile,
          setSubtitleFile,
        }}
      >
        <div className="flex flex-col w-full h-[100vh]">
          <Navbar />
          <div className="flex flex-row mt-5">
            <div className="flex flex-col pt-5 h-full w-full md:h-[70%] md:w-[80%] lg:w-[45%] lg:h-[80%] mt-5 justify-center sm:ml-10">
              <VideoPlayer />
            </div>

            <EditArea />
          </div>
          <Subtitles />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
