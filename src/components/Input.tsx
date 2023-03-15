import React, { useCallback, useEffect, useState } from "react";
import { file2sub, readFile } from "../utils";
import { Subtitle } from "./Subtitles";

type Props = {
  subtitle?: Subtitle;
  isTextArea?: boolean;
  phase?: string;
};

const Input = ({ subtitle, isTextArea, phase }: Props) => {
  return (
    <>
      {isTextArea && (
        <textarea className="w-full text-primary h-full border-solid border-r-[1px] border-indigo-600 pl-2">
          {subtitle?.Text.raw}
        </textarea>
      )}

      {!isTextArea && (
        <input
          className="text-primary h-full border-solid border-l-[1px] border-r-[1px] border-indigo-600 pl-2"
          value={phase === "start" ? subtitle?.Start : subtitle?.End}
          type="number"
        />
      )}
    </>
  );
};

export default Input;
