import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import video from "../assets/video.mp4";
import { Subtitle } from "./Subtitles";
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";
import Timeline from "./Timeline";

type Props = {
  subs: string | undefined;
};

const VideoPlayer = ({ subs }: Props) => {
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState<number>();

  return (
    <>
      <ReactPlayer
        url={video}
        className="pl-20"
        width="100%"
        height="100%"
        pip
        playing={play}
        config={{
          file: {
            tracks: [
              {
                src: "/src/assets/subtitles.ass",
                kind: "subtitles",
                srcLang: "en",
                label: "idk",
              },
            ],
          },
        }}
        onDuration={(e) => setDuration(e)}
      />

      <div className="w-full pl-2">
        <input
          id="default-range"
          type="range"
          value={0}
          max={duration}
          min={0}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        ></input>
      </div>

      <div className="flex flex-row m-3 ml-[5rem] gap-5">
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          .
        </kbd>

        <kbd
          onClick={() => (play ? setPlay(false) : setPlay(true))}
          className="px-2 py-1.5 text-xs pt-2 font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
        >
          {play ? <BsFillStopFill /> : <BsFillPlayFill />}
        </kbd>

        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          .
        </kbd>
      </div>
    </>
  );
};

export default VideoPlayer;
