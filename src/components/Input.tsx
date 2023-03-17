import React, { useCallback, useEffect, useState } from "react";
import { file2sub, readFile } from "../utils";
import { Subtitle } from "../utils/types";

type Props = {
  subtitle?: Subtitle;
  isTextArea?: boolean;
  phase?: string;
};

const Input = ({ subtitle, isTextArea, phase }: Props) => {
  return (
    <>
      {isTextArea && (
        <textarea className="w-full text-primary h-full border-solid border-[1px] border-indigo-600 pl-2 bg-white focus:outline-none">
          {subtitle?.Text.raw}
        </textarea>
      )}

      {!isTextArea && (
        <input
          className="text-primary h-full border-solid border-l-[1px] border-r-[1px] border-indigo-600 pl-2 bg-white focus:outline-none "
          value={phase === "start" ? subtitle?.Start : subtitle?.End}
          type="number"
        />
      )}
    </>
  );
};

export default Input;
