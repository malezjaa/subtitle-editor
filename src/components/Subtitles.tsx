import React, { useCallback, useEffect, useState } from "react";
import { file2sub, findSubtitleAtTime, readFile } from "../utils";
import { convertToSplitedTime } from "../utils/date";
import { Subtitle } from "../utils/types";
import Input from "./Input";

export function getExt(url: string) {
  return url.trim().toLowerCase().split(".").pop();
}

type Props = {
  subtitles: Subtitle[] | undefined;
  setSubtitles: React.Dispatch<React.SetStateAction<Subtitle[] | undefined>>;
  setAss: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCurrentSub: React.Dispatch<React.SetStateAction<Subtitle | undefined>>;
  currentSub: Subtitle | undefined;
};

const Subtitles = ({
  subtitles,
  setSubtitles,
  setAss,
  setCurrentSub,
  currentSub,
}: Props) => {
  const clearSubs = useCallback(() => {
    //@ts-ignore
    setSubtitles([]);
  }, [setSubtitles]);

  const handleSubtitleChange = useCallback(
    (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const ext = getExt(file.name);
        //@ts-ignore
        if (["ass"].includes(ext)) {
          file2sub(file)
            .then(async (res: any) => {
              res.events.dialogue?.forEach((e: any, i: number) => {
                e.End = convertToSplitedTime(e.End);
                e.Start = convertToSplitedTime(e.Start);
                e.index = i;
              });
              clearSubs();
              setSubtitles(res.events.dialogue);
              const text = (await readFile(file)) as string;
              setAss(text);
            })
            .catch((err: any) => {
              console.log(err);
            });
        } else {
          console.log("error");
        }
      }
    },
    [setSubtitles, clearSubs]
  );

  const onInputClick = useCallback((event: any) => {
    event.target.value = "";
  }, []);

  return (
    <>
      {subtitles?.length && (
        <div>
          <button
            className="btn btn-outline m-5 ml-20"
            onClick={() => clearSubs()}
          >
            Wyczyść napisy.
          </button>
        </div>
      )}

      {!subtitles?.length && (
        <div>
          <input
            type="file"
            className="file-input ml-20 file-input-bordered file-input-primary w-full max-w-xs"
            accept=".ass"
            onClick={onInputClick}
            onChange={handleSubtitleChange}
          />
        </div>
      )}

      <div className="overflow-x-auto m-10 h-[350px]">
        <table className="table w-full">
          {/* head*/}
          <thead>
            <tr>
              <th></th>
              <th>Start</th>
              <th>Koniec</th>
              <th>Aktor</th>
              <th>Tekst</th>
            </tr>
          </thead>
          <tbody>
            {subtitles?.map((sub, i) => (
              <tr
                key={i}
                onClick={(e) => setCurrentSub(sub)}
                className={`${i === currentSub?.index ? "active" : ""}`}
              >
                <td>{i + 1}</td>

                <td>{sub.Start}</td>

                <td>{sub.End}</td>

                <td>{sub.Name}</td>

                <td>{sub.Text.raw}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Subtitles;
