import React, { useEffect, useState } from "react";
import { Subtitle } from "../utils/types";

type Props = {
  subtitles: Subtitle[] | undefined;
  setCurrentSub: React.Dispatch<React.SetStateAction<Subtitle | undefined>>;
  currentSub: Subtitle | undefined;
};

const tabs = [
  {
    name: "Edytuj",
    value: "edit",
  },
  {
    name: "Czcionki",
    value: "fonts",
  },
  {
    name: "Eksportuj",
    value: "export",
  },
];

const EditArea = ({ subtitles, setCurrentSub, currentSub }: Props) => {
  const [value, setValue] = useState<string>(currentSub?.Text.raw as string);
  const [tab, setTab] = useState<string>("edit");

  useEffect(() => {
    setValue(currentSub?.Text.raw as string);
  }, [currentSub]);

  return (
    <>
      <div className="flex flex-col p-10">
        <div className="tabs tabs-boxed">
          {tabs.map((e) => (
            <a
              className={`tab ${e.value === tab ? "tab-active" : ""}`}
              key={e.value}
              onClick={() => setTab(e.value)}
            >
              {e.name}
            </a>
          ))}
        </div>

        <div>
          <textarea>wd</textarea>
        </div>
      </div>
    </>
  );
};

export default EditArea;
