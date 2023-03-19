import React, { useContext, useEffect, useState } from "react";
import { file2sub, findSubtitleAtTime, readFile } from "../utils";
import { Context } from "../utils/contexts/Context";
import { convertToSplitedTime } from "../utils/date";
import { Subtitle } from "../utils/types";
import Input from "./Input";

export function getExt(url: string) {
  return url.trim().toLowerCase().split(".").pop();
}

const Subtitles = () => {
  const { subtitles, setSubtitles, setParsedAss, currentSub, setCurrentSub } =
    useContext(Context);

  const clearSubs = () => {
    setSubtitles([]);
  };

  const handleSubtitleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const ext = getExt(file.name);
      if (["ass"].includes(ext as string)) {
        file2sub(file)
          .then(async (res: any) => {
            res.events.dialogue?.forEach((e: any, i: number) => {
              e.End = convertToSplitedTime(e.End);
              e.Start = convertToSplitedTime(e.Start);
              e.index = i;
            });
            clearSubs();
            setSubtitles(res.events.dialogue);
            setParsedAss(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        console.log("error");
      }
    }
  };

  const onInputClick = (event: any) => {
    event.target.value = "";
  };

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
