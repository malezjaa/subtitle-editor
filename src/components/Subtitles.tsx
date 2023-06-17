import React, { useContext, useEffect, useState } from "react";
import {
  convertTimeToSeconds,
  file2sub,
  findSubtitleAtTime,
  formatTimecode,
  readFile,
} from "../utils";
import { Context } from "../utils/contexts/Context";

export function getExt(url: string) {
  return url.trim().toLowerCase().split(".").pop();
}

const Subtitles = () => {
  const {
    subtitles,
    setSubtitles,
    setParsedAss,
    currentSub,
    setCurrentSub,
    video,
    subtitleFile,
  } = useContext(Context);

  const clearSubs = () => {
    setSubtitles([]);
  };

  useEffect(() => {
    const file = subtitleFile;
    if (file) {
      const ext = getExt(file.name);
      if (["ass"].includes(ext as string)) {
        file2sub(file)
          .then(async (res: any) => {
            res.events.dialogue?.forEach((e: any, i: number) => {
              e.End = formatTimecode(e.End);
              e.Start = formatTimecode(e.Start);
              e.index = i;
            });
            clearSubs();
            setSubtitles(res.events.dialogue);
            setParsedAss(res);
            setCurrentSub(res.events.dialogue[0]);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        console.log("error");
      }
    }
  }, [subtitleFile]);

  const onInputClick = (event: any) => {
    event.target.value = "";
  };

  return (
    <>
      <div className="overflow-x-auto m-10 h-[350px]">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Start</th>
              <th>End</th>
              <th>Actor</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {subtitles?.map((sub, i) => (
              <tr
                key={i}
                onClick={(e) => {
                  const time = convertTimeToSeconds(sub?.Start) + 0.01;

                  if (!video) return;

                  if (time > video?.duration) {
                    return;
                  }

                  if (video) {
                    setCurrentSub(sub);

                    video.currentTime = time;

                    video.pause();
                  }
                }}
                className={`${i === currentSub?.index ? "active" : ""}`}
              >
                <td>{i + 1}</td>

                <td>{sub.Start ? sub.Start : ""}</td>

                <td>{sub.End ? sub.End : ""}</td>

                <td>{sub.Name ? sub.Name : ""}</td>

                <td>{sub.Text.raw ? sub.Text.raw : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Subtitles;
