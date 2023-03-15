import { useState } from "react";
import Subtitles, { Subtitle } from "./components/Subtitles";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>();
  const [ass, setAss] = useState<string>();
  const [currentSub, setCurrentSub] = useState<Subtitle | undefined>();

  return (
    <>
      <div className="flex flex-col w-full h-[100vh]">
        <div className="flex flex-col pt-10 w-[40%] h-1/2 justify-center items-center">
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
