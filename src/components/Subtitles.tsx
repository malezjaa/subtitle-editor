import React, { useCallback, useEffect, useState } from "react";
import { file2sub, readFile } from "../utils";
import { convertToSplitedTime } from "../utils/date";
import Input from "./Input";

export type Subtitle = {
  Start: number | string;
  End: number | string;
  Text: Text;
  Style: string;
  index?: number;
};

export type Text = {
  combined: string;
  raw: string;
  parsed: any[];
};

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
                console.log(e.End);
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

  useEffect(() => {
    console.log(subtitles);
  }, [subtitles]);

  return (
    <>
      {subtitles![0] && (
        <div>
          <button className="btn btn-outline m-5" onClick={() => clearSubs()}>
            Clear subs
          </button>
        </div>
      )}

      {!subtitles![0] && (
        <div>
          <input
            type="file"
            className="text-white bg-purple-600 placeholder-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            accept=".ass"
            onClick={onInputClick}
            onChange={handleSubtitleChange}
          />
        </div>
      )}

      <div className="w-full flex flex-col pl-20 h-[280px] overflow-y-scroll mt-10">
        <div>
          {subtitles
            ? subtitles?.map((e, i) => (
                <div
                  className="text-white w-full rounded-lg flex h-[40px]"
                  key={i}
                  onClick={() => setCurrentSub({ ...e, index: i })}
                >
                  <div className="flex flex-row w-full relative h-full border-[1px] border-indigo-600 bg-white">
                    <p className="h-full px-3 p-[0.25rem] w-[65px] border-solid border-[1px] border-indigo-600 text-primary bg-white">
                      <strong>{i + 1}</strong>
                    </p>

                    <p className="h-full px-3 p-[0.25rem] border-solid border-[1px] w-[150px] border-indigo-600 text-primary bg-white">
                      {e.Start}
                    </p>

                    <p className="h-full px-3 p-[0.25rem] border-solid border-[1px] w-[150px] border-indigo-600 text-primary bg-white">
                      {e.End}
                    </p>

                    <Input isTextArea={true} subtitle={e} />
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default Subtitles;
