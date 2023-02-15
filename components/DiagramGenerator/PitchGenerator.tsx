import { useState , useRef, useMemo } from "react"

import {FileDownloadOutlined, SettingsOutlined} from '@mui/icons-material';
import {TextField, IconButton, Tooltip} from '@mui/material';

import toMora from '../../lib/moraParser';

import GeneratorSettings from "./GeneratorSettings";
import DownloadButton from "./DownloadButton";
// import PitchDiagram from "../PitchDiagram/PitchDiagram";

import DotDiagram from "../PitchDiagrams/DotDiagram";
import CompactDiagram from "../PitchDiagrams/CompactDiagram";

import { saveAs } from 'file-saver';
import * as ReactDOMServer from 'react-dom/server';


const buttonStyle = "flex justify-end";

export default function PitchGenerator() {
  
    //State for diagram text.
    const [diagramText, changeText] = useState<string>("");

    //State for diagram pitch pattern.
    const [pitchPattern, changePitch] = useState<number[]>([]);

    //Used to keep track of selected color
    const [color, changeDiagramColor] = useState<string>("#000000");

    //Used to enable/disable diagram settings.
    const [settingsDisplayStatus, displaySettings] = useState<boolean>(false);

    //Used to allow user to select type of download.
    const [downloadFormat, changeDownloadFormat] = useState<string>("PNG");

    //Used to store dimensions of download.
    const [downloadDimensions, changeDownloadDimensions] = useState<{width: number, height:number}>({width: 500, height: 250});

    // Used to store state of whether pitchaccent pattern is valid
    const [errorValue, changeErrorValue] = useState<boolean>(false);

    //Used so we can access Pitch Diagram SVG from DOM for use when downloading
    const diagramContainer = useRef(null);

    //Used to store pitchDiagram generator
    const pitchDiagram: JSX.Element = useMemo(() => {
        return <DotDiagram mora={toMora(diagramText)} pitchPattern={pitchPattern} color={color}/>
    }, [diagramText, pitchPattern, color]);


    function downloadAsSVG(): void {
        
        //TODO change size of svg attributes and styling to match dimensions input.
        
        //Convert pitch accent DOM
        let diagramString = ReactDOMServer.renderToString(pitchDiagram)
        const blob = new Blob([diagramString], {type: 'image/svg+xml;charset=utf-16'});
        saveAs(blob, `${diagramText}_pitch_diagram.svg`);
    
        //TODO if filename too large shorten
    }

    // //Used for pitchPattern TextField so we can change value of input.
    // const pitchTextField = useRef(null);
    function downloadAsPNG(): void {

        //Get diagram DOM Element.
        const svg = diagramContainer.current.children[0];
        console.log(svg)

        //Set for firefox as svg needs stying in both style and height/width attributes.
        //THIS IS A DUMB Nuance BUT I GUESS I HAVE TO DO IT.
        svg.setAttribute("width", downloadDimensions.width);
        svg.setAttribute("height", downloadDimensions.height);
    
        let image = new Image();
        
        //Turn svg image into a string.
        const SVGDiagramString: string = new XMLSerializer().serializeToString(svg);
        //Turn SVG diagram string into base64 string.
        const base64SVG: string = window.btoa(decodeURIComponent(encodeURIComponent(SVGDiagramString)));
        
    
        image.src = `data:image/svg+xml;base64,${base64SVG}`;
    
        image.onload = () => {
            //Create canvas and draw to it.
            let canvas: HTMLCanvasElement = document.createElement('canvas');
            //Get width and height and make canvas is proper size.
            canvas.width = downloadDimensions.width;
            canvas.height = downloadDimensions.height;
            let context: CanvasRenderingContext2D | null = canvas.getContext('2d');
            context.drawImage(image, 0, 0, downloadDimensions.width, downloadDimensions.height);
            //Download image.
            canvas.toBlob(blob => {saveAs(blob, `${diagramText}_pitch_diagram.png`)});
        }
    }

    /**
     * 
     * @param fileFormat String that defines what download format has been selected.
     */
    function changeFileFormat(fileFormat:string): void
    {
        switch (fileFormat) {
            case "SVG" : changeDownloadFormat("SVG");
                        break; 
            case "PNG" : changeDownloadFormat("PNG");
                        break;
            default: console.log(`Unknown file format: ${fileFormat}`);
        }
    }

    /**
     * 
     * @param pattern Pitch Accent pattern inputted by user.
     */
    function inputPattern(pattern:string): void {
        
        //Case insensitive regex
        const regex = new RegExp("[^01０１lｌhｈ]+", "i");
        //Used to check if we are not using 0 or 1.
        const regexSwitch = new RegExp("[0０lｌ]", "i");

        //If string doesnt match, set error value
        if(regex.test(pattern)){
            changeErrorValue(() => true);
            console.log("Here", pattern)
            return;
        }

        // Set pitch pattern input box to non-error
        changeErrorValue(() => false);

        let parsedPattern: number[] = [];

        //Change all non 0/1 characters into 0/1's.
        for (const char of pattern) 
        {    
            //Values inverted to make diagram creation easier. 2 is low node, 1 is high node
            parsedPattern.push(regexSwitch.test(char) ? 2 : 1);
        }

        changePitch(() => parsedPattern);

    }

    return (
        <div className="flex flex-col justify-center items-center h-full w-full gap-y-4">
            
            {/* Diagram inputs */}
            <div className="flex flex-wrap items-center w-full h-full gap-x-4 gap-y-3">
                
                {/* Input textfield */}
                <TextField className="grow-[2]" label="Input text" onChange={event => changeText(event.target.value)}
                placeholder="Ex. はつおん" autoFocus={true}/>
            
                {/* Pitch Pattern textfield */}
                <TextField className="grow-[2]" label="Pitch Pattern" helperText={errorValue ? "Text field contains invalid characters.": null}
                placeholder="Ex. 0111 or lhhh" error={errorValue} onChange={event => inputPattern(event.target.value)}/>

{/* onChange={() => changePitch((event:any) => Number(event.target.value))} */}
                
                {/* Diagram Buttons */}
                <div className="flex gap-x-1">
                    {/* Download button */}
                    <Tooltip title="Download" placement="top">
                        <span>
                            <IconButton className={buttonStyle} onClick={downloadFormat === "SVG" ? downloadAsSVG : downloadAsPNG} 
                                disabled={diagramText === "" && pitchPattern.length === 0 ? true : false}>
                                <FileDownloadOutlined/>
                            </IconButton>
                        </span>
                    </Tooltip>
                    {/* Settings button */}
                    <Tooltip title="Settings" placement="top">
                        <IconButton className={buttonStyle} onClick={() => {displaySettings(value => !value)}}>
                            <SettingsOutlined/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            
            {/* Diagram Display */}
            <div className = "w-full h-full overflow-x-auto overflow-y-hidden bg-[#cececec2] border-2 border-black rounded-md" ref={diagramContainer}>
                {pitchDiagram}
            </div>

            {/* Diagram options box */}
            {settingsDisplayStatus ? 
            <GeneratorSettings downloadFormat={downloadFormat} color={color} downloadDimensions={downloadDimensions}
                changeFileFormat={changeFileFormat} changeColor={changeDiagramColor} changeDownloadDimensions={changeDownloadDimensions}/> 
            : null}
        </div>
  );
}