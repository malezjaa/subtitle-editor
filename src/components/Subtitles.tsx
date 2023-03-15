import React, { useCallback, useEffect, useState } from "react";
import { file2sub, readFile } from "../utils";
import Input from "./Input";

export type Subtitle = {
  Start: number;
  End: number;
  Text: Text;
  Style: string;
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
};

const Subtitles = ({ subtitles, setSubtitles, setAss }: Props) => {
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

  useEffect(() => {
    subtitles?.forEach((e, i) => console.log(e.Text.raw));
  }, [subtitles]);

  const onInputClick = useCallback((event: any) => {
    event.target.value = "";
  }, []);

  return (
    <div className="w-full flex flex-col pl-20 pr-20 h-[280px]  overflow-y-scroll">
      {subtitles ? (
        ""
      ) : (
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
      <div>
        {subtitles
          ? subtitles?.map((e, i) => (
              <div
                className="text-white w-full rounded-lg flex h-[40px]"
                key={i}
              >
                <div className="flex flex-row w-full relative h-full border-[1px] border-indigo-600">
                  <p className="h-full px-3 p-[0.25rem] border-solid border-l-[1px] border-indigo-600 text-primary">
                    <strong>{i + 1}</strong>
                  </p>
                  <Input isTextArea={false} subtitle={e} phase={"start"} />

                  <Input isTextArea={false} subtitle={e} phase={"end"} />

                  <Input isTextArea={true} subtitle={e} />
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Subtitles;
