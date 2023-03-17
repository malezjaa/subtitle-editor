import { useEffect, useState } from "react";
import EditArea from "./components/EditArea";
import Subtitles from "./components/Subtitles";
import VideoPlayer from "./components/VideoPlayer";
import { Subtitle } from "./utils/types";

function App() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>();
  const [ass, setAss] = useState<string>();
  const [currentSub, setCurrentSub] = useState<Subtitle | undefined>();
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);

  return (
    <>
      <div className="flex flex-col w-full h-[100vh]">
        <div className="flex flex-row mt-5">
          <div className="flex flex-col pt-5 h-full w-full md:h-[70%] md:w-[80%] lg:w-[45%] lg:h-[80%] mt-5 justify-center sm:ml-10">
            <VideoPlayer
              subtitles={subtitles}
              ass={ass}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
          </div>

          <EditArea
            subtitles={subtitles}
            setCurrentSub={setCurrentSub}
            currentSub={currentSub}
          />
        </div>
        <Subtitles
          subtitles={subtitles}
          setAss={setAss}
          setSubtitles={setSubtitles}
          setCurrentSub={setCurrentSub}
          currentSub={currentSub}
        />
      </div>
    </>
  );
}

export default App;
