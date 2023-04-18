// React/MUI
import { useState , useRef, useMemo, ReactNode } from "react"
import {FileDownloadOutlined, SettingsOutlined} from '@mui/icons-material';
import {TextField, IconButton, ToggleButton as MuiToggleButton, 
        ToggleButtonGroup,Tooltip} from '@mui/material';
import { styled } from "@mui/material/styles";
// Other imports
import { saveAs } from 'file-saver';
import * as ReactDOMServer from 'react-dom/server';
// Custom functions
import toMora from '../../lib/moraParser';
// Custom components
import GeneratorSettings from "./GeneratorSettings";
import DotDiagram from "../PitchDiagrams/DotDiagram";
import CompactDiagram from "../PitchDiagrams/CompactDiagram";


const buttonStyle: string = "flex justify-end";

// Change ToggleButtom Color
const ToggleButton = styled(MuiToggleButton)(({ color /*, backgroundColor*/ }) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: color,
    //   backgroundColor: backgroundColor
    }
  }));

export default function PitchGenerator(): JSX.Element {
  
    //State for diagram text.
    const [diagramText, changeText] = useState<string>("");

    //State for diagram pitch pattern.
    const [pitchPattern, changePitch] = useState<number[]>([]);

    //Used to keep track of selected color for diagram
    const [color, changeDiagramColor] = useState<string>("#000000");

    //Used to enable/disable diagram settings.
    const [settingsDisplayStatus, displaySettings] = useState<boolean>(false);

    //Used to allow user to select type of download.
    const [downloadFormat, changeDownloadFormat] = useState<string>("PNG");

    //Used to store dimensions of download.
    const [downloadDimensions, changeDownloadDimensions] = useState<{width: number, height:number}>({width: 500, height: 250});

    // Used to keep current state of diagram type selector.
    const [diagramType, setDiagramType] = useState<string>('Dot');

    //Used so we can access Pitch Diagram SVG from DOM for use when downloading
    const diagramContainer = useRef<HTMLDivElement | null>(null);

    //Used to store pitchDiagram generator
    const pitchDiagram: JSX.Element = useMemo(() => {
        return diagramType === 'Dot' ?
            <DotDiagram mora={toMora(diagramText)} pitchPattern={pitchPattern} color={color}/>
            : <CompactDiagram mora={toMora(diagramText)} pitchPattern={pitchPattern} color={color}/>
    }, [diagramText, pitchPattern, color, diagramType]);


    /**
     * Allows the download of the diagram as a PNG when called by a click event from the download button.
     * ASSUMPTION: download format is set to PNG in diagram settings selector
     */
    function downloadAsSVG(): void 
    {    
        //TODO change size of svg attributes and styling to match dimensions input.
        
        //Convert pitch accent DOM
        let diagramString: string = ReactDOMServer.renderToString(pitchDiagram)
        const blob: Blob = new Blob([diagramString], {type: 'image/svg+xml;charset=utf-16'});
        saveAs(blob, `${diagramText}_pitch_diagram.svg`);
    
        //TODO if filename too large shorten
    }

    /**
     * Allows the download of the diagram as a PNG when called by a click event from the download button.
     * ASSUMPTION: download format is set to PNG in diagram settings selector
     */
    function downloadAsPNG(): void 
    {
        if(diagramContainer.current === null){
            throw new Error("Diagram conatiner doesn't exist")
        }

        //Get diagram DOM Element.
        const svg = diagramContainer.current.children[0];

        //Set for firefox as svg needs stying in both style and height/width attributes.
        svg.setAttribute("width", String(downloadDimensions.width));
        svg.setAttribute("height", String(downloadDimensions.height));
    
        let image: HTMLImageElement = new Image();
        
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
            
            if(context) {
                context.drawImage(image, 0, 0, downloadDimensions.width, downloadDimensions.height);
                //Download image.
                canvas.toBlob((blob: Blob | null) => {if(blob) saveAs(blob, `${diagramText}_pitch_diagram.png`)});
            }
            else {
                throw new Error("Context is not found when downloading pitch accent diagram")
            }
        }
    }

    /**
     * Allows the user to change the download format of the diagram from diagram settings selector.
     * @param fileFormat String that defines what download format has been selected.
     */
    function changeFileFormat(fileFormat:string): void
    {
        switch (fileFormat) {
            case "SVG" : changeDownloadFormat("SVG");
                        break; 
            case "PNG" : changeDownloadFormat("PNG");
                        break;
            default: throw new Error(`Unknown file format: ${fileFormat}`)
        }
    }

    /**
     * Parses the pitch pattern inputted by user in Pitch Pattern Field into a valid pattern.
     * @param pattern Pitch Accent pattern inputted by user in Pitch Pattern textfield.
     */
    function inputPattern(pattern:string): void 
    {
        //Used to check if we are not using 0 or 1.
        const regexSwitch: RegExp = new RegExp("[0０lｌ]", "i");
        changePitch(() => pattern.split("").map( (char:string) => regexSwitch.test(char) ? 2 : 1));
    }

    return (
        <div className="flex flex-col justify-center items-center h-full w-full gap-y-4">
            
            {/* Diagram inputs */}
            <div className="flex flex-wrap items-center w-full h-full gap-x-4 gap-y-3">
                
                {/* Input textfield */}
                <TextField className="grow-[2]" label="Input text" 
                placeholder="Ex. はつおん" InputLabelProps={{ shrink: true }} autoFocus={true}
                onChange={event => changeText(event.target.value)} />
            
                {/* Pitch Pattern textfield */}
                <TextField className="grow-[2]" label="Pitch Pattern"
                placeholder="Ex. 01111 or lhhhh" InputProps={{spellCheck: false}} InputLabelProps={{ shrink: true }} 
                onChange={ (event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    // Prevents negative numbers
                    const value: string = event.target.value.match(/[^01０１lｌLhｈH]+/) != null ? 
                    (event.target.value = event.target.value.replace(/[^01０１lｌLhｈH]+/, ''))
                    : event.target.value;
                    inputPattern(value);
                }}/>
                
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
                
                {/* <div className="w-full flex justify-end bottom-0 left-0 "> */}
                {/* <Tooltip title="Diagram Type" placement="right">
                    <ToggleButtonGroup className="sticky z-2 bottom-2 right-2 left-2"
                        color="standard"
                        value={diagramType}
                        exclusive
                        onChange={(event: React.MouseEvent<HTMLElement>, newAlignment:string) => {setDiagramType(newAlignment)}}
                        aria-label="Platform">
                        <ToggleButton value="Dot">Dot</ToggleButton>
                        <ToggleButton value="Compact">Compact</ToggleButton>
                    </ToggleButtonGroup>
                </Tooltip> */}
            </div>

            {/* Diagram options box */}
            {settingsDisplayStatus ? 
            <GeneratorSettings downloadFormat={downloadFormat} color={color} downloadDimensions={downloadDimensions}
                changeFileFormat={changeFileFormat} changeColor={changeDiagramColor} changeDownloadDimensions={changeDownloadDimensions}/> 
            : null}
        </div>
  );
}