import React, { useCallback, useEffect, useState } from "react";
import { file2sub } from "../assets/utils";

type Subtitle = {
  start: number;
  end: number;
  value: string;
};

export function getExt(url: string) {
  return url.trim().toLowerCase().split(".").pop();
}

const Subtitles = () => {
  const [subitles, setSubtitles] = useState<Subtitle>();
  const [file, setFile] = useState<any>();

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
            .then((res: any) => {
              clearSubs();
              setSubtitles(res);
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
    console.log(subitles);
  }, [subitles]);

  const onInputClick = useCallback((event: any) => {
    event.target.value = "";
  }, []);

  return (
    <div className="w-[40%] flex flex-col pt-20">
      <div>
        <input
          type="file"
          className="text-white bg-purple-600 placeholder-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          accept=".ass"
          onClick={onInputClick}
          onChange={handleSubtitleChange}
        />
      </div>
    </div>
  );
};

export default Subtitles;
