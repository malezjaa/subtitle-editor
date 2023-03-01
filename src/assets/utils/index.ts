import { getExt } from "../../components/Subtitles";
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
