import React from "react";
import video from "../assets/video.mp4";
const VideoPlayer = () => {
  return (
    <>
      <video className="w-full h-auto max-w-full p-20" controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default VideoPlayer;
