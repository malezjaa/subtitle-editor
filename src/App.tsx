import { ParsedASS } from "ass-compiler";
import { useEffect, useState } from "react";
import EditArea from "./components/EditArea";
import Subtitles from "./components/Subtitles";
import VideoPlayer from "./components/VideoPlayer";
import { Context } from "./utils/contexts/Context";
import { Subtitle } from "./utils/types";

function App() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>();
  const [styles, setStyles] = useState<any>();
  const [parsedAss, setParsedAss] = useState<ParsedASS | undefined>();
  const [currentSub, setCurrentSub] = useState<Subtitle | undefined>();
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);

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
        }}
      >
        <div className="flex flex-col w-full h-[100vh]">
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
