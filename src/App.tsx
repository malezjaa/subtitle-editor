import { useEffect, useState } from "react";
import Subtitles, { Subtitle } from "./components/Subtitles";
import VideoPlayer from "./components/VideoPlayer";
import ass2vtt from "./utils";

function App() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>();
  const [ass, setAss] = useState<string>();
  const [currentSub, setCurrentSub] = useState<Subtitle | undefined>();

  return (
    <>
      <div className="flex flex-col w-full h-[100vh]">
        <div className="flex flex-col pt-10 h-[40%] w-[60%] justify-center items-center mt-[3.5rem] mb-[3.5rem]">
          <VideoPlayer subs={ass} />
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
