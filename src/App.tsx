import Subtitles from "./components/Subtitles";
import Timeline from "./components/Timeline";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <>
      <div className="flex flex-row w-full h-[100vh]">
        <div className="flex flex-col w-full h-full">
          <VideoPlayer />

          <Timeline />
        </div>

        <Subtitles />
      </div>
    </>
  );
}

export default App;
