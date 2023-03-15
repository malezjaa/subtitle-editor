import { getExt } from "../components/Subtitles";
import { parse, stringify, compile, decompile } from "ass-compiler";

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

export default function ass2vtt(ass: string | undefined) {
  const re_ass = new RegExp(
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
    const timeArray = time.split(/:/);
    const secondsArray = timeArray[2].split(/\./);

    const hours = timeArray[0].padStart(2, "0");
    const minutes = timeArray[1].padStart(2, "0");
    const seconds = secondsArray[0].padStart(2, "0");
    const milliseconds = secondsArray[1].padEnd(3, "0");

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  return (
    "WEBVTT\n\n" +
    ass
      ?.split(/\r?\n/)
      .map((line) => {
        const m = line.match(re_ass);
        if (!m) return null;
        return {
          start: fixTime(m[1].trim()),
          end: fixTime(m[2].trim()),
          text: m[5]
            .replace(/{[\s\S]*?}/g, "")
            .replace(/(\\N)/g, "\n")
            .trim()
            .split(/\r?\n/)
            .map((item) => item.trim())
            .join("\n"),
        };
      })
      .filter((line) => line)
      .map((line, index) => {
        if (line) {
          return (
            index +
            1 +
            "\n" +
            line.start +
            " --> " +
            line.end +
            "\n" +
            line.text
          );
        } else {
          return "";
        }
      })
      .filter((line) => line.trim())
      .join("\n\n")
  );
}
