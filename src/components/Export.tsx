import {useContext, useEffect, useState} from "react";
import { Context } from "../utils/contexts/Context";
import { compile, ParsedASS, stringify } from "ass-compiler";
import { convertTimeToSeconds } from "../utils";

export default function Export() {
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
    const [toCompile, setToCompile] = useState<ParsedASS>()

    useEffect(() => {
        if (parsedAss) {
            const updatedDialogue = parsedAss.events.dialogue.map((e) => ({
                ...e,
                Start: convertTimeToSeconds(e.Start as unknown as string),
                End: convertTimeToSeconds(e.End as unknown as string),
            }));

            setToCompile({
                ...parsedAss,
                events: {
                    ...parsedAss.events,
                    dialogue: updatedDialogue,
                },
            });
        }
    }, []);

    const handleDownload = () => {
        if (toCompile) {
            const stringifiedText = stringify(toCompile);
            const element = document.createElement("a");
            const file = new Blob([stringifiedText], { type: "text/plain" });
            element.href = URL.createObjectURL(file);
            element.download = "subtitles.ass";
            document.body.appendChild(element);
            element.click();
        }
    };

    return <>
        <div className={"m-5"}>
            <button className={"btn"} onClick={() => handleDownload()}>Export</button>
        </div>
    </>;
}
