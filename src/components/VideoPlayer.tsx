import React, { useContext, useEffect, useRef, useState } from "react";
import { convertAssToVtt } from "../utils";
import { Context } from "../utils/contexts/Context";
import { Subtitle } from "../utils/types";
import Player from "./Player";

const VideoPlayer = () => {
  return (
    <>
      <div className="relative">
        <Player videoSrc={"https://artplayer.org/assets/sample/video.mp4"} />
      </div>
    </>
  );
};

export default VideoPlayer;
