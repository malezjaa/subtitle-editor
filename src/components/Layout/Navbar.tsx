import React, { useContext, useRef } from "react";
import { MdSubtitles } from "react-icons/md";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Context } from "../../utils/contexts/Context";

const Navbar = () => {
  const inputVideoRef = useRef<HTMLInputElement>(null);
  const subtitleVideoRef = useRef<HTMLInputElement>(null);
  const { setVideoFile, setSubtitleFile } = useContext(Context);

  const onVideoClick = () => {
    if (inputVideoRef.current) {
      inputVideoRef.current.click();
    }
  };

  const onSubtitleClick = () => {
    if (subtitleVideoRef.current) {
      subtitleVideoRef.current.click();
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSubtitleFile(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        id="file"
        ref={inputVideoRef}
        style={{ display: "none" }}
        accept="video/*, .mp4, .webm, .ogg, .mkv"
        onChange={(e) => handleVideoChange(e)}
      />
      <input
        type="file"
        id="file"
        ref={subtitleVideoRef}
        style={{ display: "none" }}
        accept=".ass"
        onChange={(e) => handleSubtitleChange(e)}
      />
      <div className="navbar bg-base-300 mb-5">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li onClick={(e) => onVideoClick()}>
              <a>
                <AiOutlineVideoCameraAdd />
                Import video
              </a>
            </li>
            <li onClick={(e) => onSubtitleClick()}>
              <a>
                <MdSubtitles /> Import subtitles
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
