import { parse, ParsedASS, ParsedASSStyles } from "ass-compiler";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { hexToHColor, hexCode } from "../utils";
import { Context } from "../utils/contexts/Context";
import { Subtitle } from "../utils/types";
import Export from "./Export";

const tabs = [
  {
    name: "Edit",
    value: "edit",
  },
  {
    name: "Fonts",
    value: "fonts",
  },
  {
    name: "Export",
    value: "export",
  },
];

const EditArea = () => {
  const [value, setValue] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [tab, setTab] = useState<string>("edit");
  const [mainColor, setMainColor] = useState<string>();
  const [outlineColor, setOutlineColor] = useState<string>();
  const [fontSize, setFontSize] = useState<string>();
  const [spacing, setSpacing] = useState<string>();
  const {
    subtitles,
    setSubtitles,
    parsedAss,
    setParsedAss,
    currentSub,
    setCurrentSub,
    currentFont,
    setCurrentFont,
    actors,
  } = useContext(Context);

  useEffect(() => {
    setValue(currentSub?.Text.raw.replaceAll(`\`N`, " <br/> ") as string);
    setStartTime(currentSub?.Start);
    setEndTime(currentSub?.End);
    const currentStyle = parsedAss?.styles.style.find(
      (e: any) => e.Name === currentSub?.Style
    );
    setCurrentFont(currentStyle);
  }, [currentSub]);

  useEffect(() => {
    if (currentSub) {
      const newSubs = subtitles?.map((e) => {
        if (e.index === currentSub.index && value) {
          e.Text.raw = value;
          e.Text.combined = value;
          e.Text.parsed[0].text = value;
        }
        return e;
      });
      setSubtitles(newSubs);
    }
  }, [value]);

  useEffect(() => {
    if (!subtitles) {
      setValue("");
      setMainColor("");
      setOutlineColor("");
      setFontSize("");
      setEndTime("");
      setStartTime("");
      setSpacing("");
    }
  }, [subtitles]);

  useEffect(() => {
    const curnFnt = parsedAss?.styles.style.find(
      (f) => f.Name === currentSub?.Style
    );

    if (curnFnt) {
      setCurrentFont(curnFnt);
      setMainColor(curnFnt.PrimaryColour);
      setOutlineColor(curnFnt.OutlineColour);
      setFontSize(curnFnt.Fontsize);
      setSpacing(curnFnt.Spacing);
    }
  }, [currentSub]);

  useEffect(() => {
    if (currentFont) {
      const index = parsedAss?.styles.style?.findIndex(
        (f) => f.Name === currentFont.Name
      );

      if (parsedAss && index !== undefined) {
        mainColor
          ? (parsedAss.styles.style[index].PrimaryColour = mainColor)
          : "";

        outlineColor
          ? (parsedAss.styles.style[index].OutlineColour = outlineColor)
          : "";

        fontSize
          ? (parsedAss.styles.style[index].Fontsize = fontSize as string)
          : "";
        spacing
          ? (parsedAss.styles.style[index].Spacing = spacing as string)
          : "";

        console.log(parsedAss)

        setParsedAss(parsedAss);
        setCurrentFont(parsedAss.styles.style[index]);
      }
    }
  }, [currentFont, mainColor, outlineColor, fontSize, spacing]);

  const handleFontChange = (e: any) => {
    if (currentSub) {
      if (parsedAss && currentSub) {
        currentSub.Style = e.target.value;
        parsedAss.events.dialogue[currentSub.index].Style = e.target.value;

        const index = parsedAss?.styles.style?.findIndex(
          (f) => f.Name === e.target.value
        );

        setParsedAss(parsedAss);

        setCurrentSub(currentSub);

        setCurrentFont(parsedAss.styles.style[index]);
      }
    }
  };

  const handleActorChange = (e: any) => {
    if (currentSub) {
      if (parsedAss && currentSub) {
        currentSub.Name = e.target.value;
        parsedAss.events.dialogue[currentSub.index].Name = e.target.value;

        const index = parsedAss?.styles.style?.findIndex(
          (f) => f.Name === e.target.value
        );

        setParsedAss(parsedAss);

        setCurrentSub(currentSub);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col p-10 w-1/2">
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
          {tab === "edit" && (
            <>
              <div className="m-5 flex flex-row">
                <input
                  type="time"
                  className="rounded-lg bg-base-300 p-2"
                  value={startTime ? startTime : ""}
                  onChange={(e) => setStartTime(e.target.value)}
                />

                <strong className="mx-2 mt-2">--</strong>

                <input
                  type="time"
                  className="rounded-lg bg-base-300 p-2"
                  value={endTime ? endTime : ""}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <select
                className="select bg-base-300 p-2 m-5 mt-0 w-full max-w-xs"
                onChange={(e) => handleFontChange(e)}
              >
                {parsedAss?.styles.style.map((e, i) => (
                  <option
                    value={e.Name}
                    selected={currentSub?.Style === e.Name ? true : false}
                  >
                    {e.Name}
                  </option>
                ))}
              </select>

              <select
                className="select bg-base-300 p-2 m-5 mt-0 w-full max-w-xs"
                onChange={(e) => handleActorChange(e)}
              >
                {actors?.map((e, i) => (
                  <option
                    value={e}
                    selected={currentSub?.Name === e ? true : false}
                  >
                    {e}
                  </option>
                ))}
              </select>

              <textarea
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full mx-5 p-2 rounded-lg bg-base-300"
              ></textarea>
            </>
          )}

          {tab === "fonts" && (
            <div className="flex flex-col p-10">
              <div className="flex flex-col px-3">
                {currentFont && (
                  <>
                    <div className="flex flex-row">
                      <p className="text-white mt-1">Color:</p>

                      <p className="ml-2 mt-1">Main color</p>
                      <div className="ml-3">
                        <input
                          type="color"
                          className="p-0.5 rounded-lg"
                          value={
                            mainColor?.startsWith("#")
                              ? mainColor
                              : hexCode(mainColor as string)
                          }
                          onChange={(e) => setMainColor(e.target.value)}
                        />
                      </div>

                      <p className="ml-2 mt-1">Outline color</p>
                      <div className="ml-3">
                        <input
                          type="color"
                          className="p-0.5 rounded-lg"
                          value={
                            outlineColor?.startsWith("#")
                              ? outlineColor
                              : hexCode(outlineColor as string)
                          }
                          onChange={(e) => setOutlineColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-row mt-3">
                      <p className="text-white mt-1">Font size:</p>

                      <input
                        type="number"
                        className="border text-sm rounded-lg block p-1.5 ml-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder=""
                        required
                        min="0"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-row mt-3">
                      <p className="text-white mt-1">Spacing:</p>

                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={spacing}
                        className="range mt-1 ml-2 w-1/2"
                        onChange={(e) => setSpacing(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {tab === "export" && (
              <Export/>
          )}
        </div>
      </div>
    </>
  );
};

export default EditArea;
