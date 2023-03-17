import { getExt } from "../components/Subtitles";
import { parse, stringify, compile, decompile } from "ass-compiler";
import { Subtitle } from "./types";

export function file2sub(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const ext = getExt(file.name);
      //@ts-ignore
      const text = reader?.result?.replace(/{[\s\S]*?}/g, "");
      switch (ext) {
        case "ass": {
          const parsedASS = parse(text);
          console.log(parsedASS);
          resolve(parsedASS);
          break;
        }
        default:
          resolve([]);
          break;
      }
    };
    reader.readAsText(file);
  });
}

export function readFile(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const ext = getExt(file.name);
      //@ts-ignore
      const text = reader?.result?.replace(/{[\s\S]*?}/g, "");

      if (text) {
        resolve(text);
      } else {
        resolve("");
      }
    };
    reader.readAsText(file);
  });
}

export const convertAssToVtt = (ass: string) => {
  const regex = new RegExp(
    "Dialogue:\\s\\d," +
      "(\\d+:\\d\\d:\\d\\d.\\d\\d)," +
      "(\\d+:\\d\\d:\\d\\d.\\d\\d)," +
      "([^,]*)," +
      "([^,]*)," +
      "(?:[^,]*,){4}" +
      "([\\s\\S]*)$",
    "i"
  );

  function fixTime(time = "") {
    const [hours, minutes, seconds, milliseconds] = time
      .split(/[:.]/)
      .map((item) => parseInt(item));

    if (isNaN(milliseconds)) return "";

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  }

  const lines = ass
    .split(/\r?\n/)
    .map((line: any) => {
      const match = line.match(regex);

      if (!match) return null;

      const [, start, end, , , text] = match;

      return {
        start: fixTime(start),
        end: fixTime(end),
        text: text
          .replace(/{[\s\S]*?}/g, "")
          .replace(/(\\N)/g, "\n")
          .trim(),
      };
    })
    .filter(Boolean)
    .map(
      ({ start, end, text }: any, index: number) =>
        `${index + 1}\n${start} --> ${end}\n${text}`
    )
    .join("\n\n");

  return `WEBVTT\n\n${lines}`;
};

export function findSubtitleAtTime(
  subtitles: Subtitle[],
  time: number
): Subtitle | undefined {
  const timecode = formatTimecode(time);
  return subtitles.find((subtitle) => {
    const start = subtitle.Start;
    const end = subtitle.End;
    return start <= timecode && end >= timecode;
  });
}

function formatTimecode(time: number): string {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((time % 1) * 1000)
    .toString()
    .padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function hexCode(colorCode: string) {
  return `#` + parseInt(colorCode.substr(2), 16).toString(16).toUpperCase();
}
