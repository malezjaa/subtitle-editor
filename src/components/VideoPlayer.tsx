import React, { useEffect, useRef, useState } from "react";
import { convertAssToVtt } from "../utils";
import { Subtitle } from "../utils/types";
import Player from "./Player";

type Props = {
  subtitles: Subtitle[] | undefined;
  ass: string | undefined;
  currentTime: number | undefined;
  setCurrentTime: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const VideoPlayer = ({
  subtitles,
  ass,
  currentTime,
  setCurrentTime,
}: Props) => {
  return (
    <>
      <div className="relative">
        <Player
          videoSrc={"https://artplayer.org/assets/sample/video.mp4"}
          subtitles={subtitles}
          ass={ass}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
