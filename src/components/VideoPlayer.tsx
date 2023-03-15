import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import video from "../assets/video.mp4";
import { Subtitle } from "./Subtitles";
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";

type Props = {
  subs: string | undefined;
};

const VideoPlayer = ({ subs }: Props) => {
  const [play, setPlay] = useState(false);
  const [maxDuration, setMaxDuration] = useState<number>();
  const [duration, setDuration] = useState<number>(0);
  const [player, setPlayer] = useState<ReactPlayer>();

  const ref = (player: any) => {
    setPlayer(player);
  };

  return (
    <>
      <ReactPlayer
        url={video}
        className="pl-20"
        width="100%"
        height="100%"
        pip
        playing={play}
        ref={ref}
        onProgress={(e) => setDuration(e.playedSeconds)}
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
        onDuration={(e) => setMaxDuration(e)}
      />

      <div className="w-full pl-20">
        <input
          type="range"
          min="0"
          max={maxDuration}
          value={duration}
          onChange={(e) => {
            player?.seekTo();
          }}
          className="range"
        />
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
