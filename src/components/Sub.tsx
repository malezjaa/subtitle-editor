import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../utils/contexts/Context";

const Sub = ({ line, index }: any) => {
  const {
    currentSub,
    setCurrentSub,
    subtitles,
    parsedAss,
    setCurrentTime,
    currentTime,
    setVideo,
    videoFile,
  } = useContext(Context);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parsedAss && subtitleRef.current) {
      const currentStyle = parsedAss.styles.style.find(
        (e: any) => e.Name === currentSub?.Style
      );

      console.log(currentStyle);

      if (!currentStyle) {
        return;
      }

      const outline = Number(currentStyle.Outline);
      const outlineColor = currentStyle.OutlineColour;

      (subtitleRef.current.style.fontFamily = currentStyle.Fontname),
        (subtitleRef.current.style.fontSize = `${currentStyle.Fontsize}px`),
        (subtitleRef.current.style.fontWeight =
          currentStyle.Bold === "1" ? "bold" : "normal"),
        (subtitleRef.current.style.color = `${currentStyle.PrimaryColour}`),
        (subtitleRef.current.style.textShadow = `${outlineColor} ${outline}px ${outline}px ${outline}px, ${outlineColor} ${outline}px ${outline}px ${outline}px, ${outlineColor} ${-outline}px ${outline}px ${outline}px, ${outlineColor} ${outline}px ${-outline}px ${outline}px, ${outlineColor} ${outline}px ${outline}px ${outline}px, ${outlineColor} ${-outline}px ${-outline}px ${outline}px, ${outlineColor} ${outline}px ${-outline}px ${outline}px, ${outlineColor} ${-outline}px ${outline}px ${outline}px, ${outlineColor} ${outline}px ${outline}px 0px, ${outlineColor} ${outline}px ${outline}px 0px, ${outlineColor} ${outline}px ${outline}px 0px`),
        (subtitleRef.current.style.letterSpacing = `${currentStyle.Spacing}px`),
        (subtitleRef.current.style.textDecoration =
          currentStyle.StrikeOut === "1"
            ? "line-through"
            : currentStyle.Underline === "1"
            ? "underline"
            : "none"),
        (subtitleRef.current.style.textAlign =
          currentStyle.Alignment === "2"
            ? "center"
            : currentStyle.Alignment === "4"
            ? "justify"
            : "left"),
        (subtitleRef.current.style.fontStyle =
          currentStyle?.Italic === "-1" ? "italic" : "");
    }
  }, [parsedAss, subtitles, currentSub, subtitleRef, parsedAss?.styles.style]);

  return (
    <>
      <div key={index} ref={subtitleRef}>
        {" "}
        {line.trim()}
        {index > 0 && <br />}
      </div>
      ;
    </>
  );
};

export default Sub;
