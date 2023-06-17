import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../utils/contexts/Context";
import { hexCode } from "../utils";

interface SubProps {
  line: string;
  index: number;
}


const Sub = ({ line, index }: SubProps) => {
  const { currentSub, setCurrentSub, subtitles, parsedAss, currentFont } =
      useContext(Context);
  const subtitleRef = useRef<HTMLDivElement>(null);

  const updateSubtitleStyle = () => {
    if (parsedAss && subtitleRef.current) {
      const currentStyle = parsedAss.styles.style.find(
          (e: any) => e.Name === currentSub?.Style
      );

      if (!currentStyle) {
        return;
      }

      const outline = Number(currentStyle.Outline);
      const outlineColor = currentStyle.OutlineColour.startsWith("#")
          ? currentStyle.OutlineColour
          : hexCode(currentStyle.OutlineColour);

      subtitleRef.current.style.fontFamily = currentStyle.Fontname;
      subtitleRef.current.style.fontSize = `${currentStyle.Fontsize}px`;
      subtitleRef.current.style.fontWeight =
          currentStyle.Bold === "1" ? "bold" : "normal";
      subtitleRef.current.style.color =
          currentStyle.PrimaryColour.startsWith("#")
              ? currentStyle.PrimaryColour
              : hexCode(currentStyle.PrimaryColour);
      subtitleRef.current.style.textShadow = `${outlineColor} ${outline}px ${outline}px ${outline}px, ${outlineColor} ${outline}px ${outline}px ${outline}px, ${outlineColor} ${-outline}px ${outline}px ${outline}px, ${outlineColor} ${outline}px ${-outline}px ${outline}px, ${outlineColor} ${outline}px ${outline}px ${outline}px, ${outlineColor} ${-outline}px ${-outline}px ${outline}px, ${outlineColor} ${outline}px ${-outline}px ${outline}px, ${outlineColor} ${-outline}px ${outline}px ${outline}px, ${outlineColor} ${outline}px ${outline}px 0px, ${outlineColor} ${outline}px ${outline}px 0px,${ outlineColor} ${
          outline
      }px ${
          outline
      }px 0px`;
      subtitleRef.current.style.letterSpacing = `${currentStyle.Spacing}px`;
      subtitleRef.current.style.textDecoration =
          currentStyle.StrikeOut === "1"
              ? "line-through"
              : currentStyle.Underline === "1"
                  ? "underline"
                  : "none";
      subtitleRef.current.style.justifyItems =
          currentStyle.Alignment === "2"
              ? "center"
              : currentStyle.Alignment === "4"
                  ? "justify"
                  : "left";
      subtitleRef.current.style.fontStyle =
          currentStyle?.Italic === "-1" ? "italic" : "";
    }
  };

  useEffect(() => {
    updateSubtitleStyle();
  }, [
    parsedAss,
    subtitles,
    currentSub,
    subtitleRef,
    parsedAss?.styles.style,
    currentFont,
  ]);

  return (
        <div key={index} ref={subtitleRef}>
          {" "}
          {line.trim()}
          {index > 0 && <br />}
        </div>
  );
};

export default Sub;
