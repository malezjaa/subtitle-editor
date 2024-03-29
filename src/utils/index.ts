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

export function formatTimecode(time: number): string {
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

export function hexCode(aegisubColor: string) {
  const color = aegisubColor.replace(/&H/g, "");
  const red = parseInt(color.substring(2, 4), 16);
  const green = parseInt(color.substring(4, 6), 16);
  const blue = parseInt(color.substring(6, 8), 16);
  const alpha = parseInt(color.substring(8, 10), 16);
  return `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
}

export function hexToHColor(hexColor: string) {
  const red = parseInt(hexColor.substring(1, 3), 16);
  const green = parseInt(hexColor.substring(3, 5), 16);
  const blue = parseInt(hexColor.substring(5, 7), 16);
  const alpha = 0;
  const hColor = `&H${red.toString(16).toUpperCase().padStart(2, "0")}${green
    .toString(16)
    .toUpperCase()
    .padStart(2, "0")}${blue.toString(16).toUpperCase().padStart(2, "0")}${alpha
    .toString(16)
    .toUpperCase()
    .padStart(2, "0")}`;

  return hColor;
}

export function convertTimeToSeconds(timeStr: string) {
  const timeArr = timeStr.split(/[:.]/);
  const hours = parseInt(timeArr[0]);
  const minutes = parseInt(timeArr[1]);
  const seconds = parseInt(timeArr[2]);
  const milliseconds = parseInt(timeArr[3]);

  const totalSeconds =
    hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  return totalSeconds;
}
