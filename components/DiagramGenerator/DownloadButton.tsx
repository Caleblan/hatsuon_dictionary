import { saveAs } from 'file-saver';
import * as ReactDOMServer from 'react-dom/server';

import {FileDownloadOutlined} from '@mui/icons-material';
import {IconButton, Tooltip} from '@mui/material';

interface props {
    downloadFormat: string,
    diagramText: string,
    buttonStyle: any
}

export default function DownloadButton({diagramText, downloadFormat, buttonStyle}:props) {

    function downloadAsSVG() {
        //Convert pitch accent DOM
        let diagramString = ReactDOMServer.renderToString(pitchDiagram)
        const blob = new Blob([diagramString], {type: 'image/svg+xml;charset=utf-16'});
        saveAs(blob, `${diagramText}_pitch_diagram.svg`);
    
        //TODO if filename too large shorten
    }

    return (
        <Tooltip title="Download" placement="top">
        <span>
                <IconButton className={buttonStyle} onClick={downloadFormat === "SVG" ? downloadAsSVG : downloadAsPNG} disabled={diagramText === "" ? true : false}>
                    <FileDownloadOutlined/>
                </IconButton>
            </span>
        </Tooltip>
    )

}

function downloadAsSVG() {
    //Convert pitch accent DOM
    let diagramString = ReactDOMServer.renderToString(pitchDiagram)
    const blob = new Blob([diagramString], {type: 'image/svg+xml;charset=utf-16'});
    saveAs(blob, `${diagramText}_pitch_diagram.svg`);

    //TODO if filename too large shorten
}

function downloadAsPNG() {

    //Get diagram DOM Element.
    const svg = diagramContainer.current.children[0];
    const {width, height} = svg.style;

    //Set for firefox as svg needs stying in both style and height/width attributes.
    //THIS IS A DUMB Nuance BUT I GUESS I HAVE TO DO IT.
    svg.setAttribute("width", width.slice(0, width.length-2));
    svg.setAttribute("height", height.slice(0, height.length-2));

    let image = new Image();
    
    //Turn svg image into a string.
    const SVGDiagramString = new XMLSerializer().serializeToString(svg);
    //Turn SVG diagram string into base64 string.
    const base64SVG = window.btoa(decodeURIComponent(encodeURIComponent(SVGDiagramString)));
    

    image.src = `data:image/svg+xml;base64,${base64SVG}`;

    image.onload = () => {
        //Create canvas and draw to it.
        let canvas = document.createElement('canvas');
        //Get width and height and make canvas is proper size.
        canvas.width = width.slice(0, width.length-2);
        canvas.height = height.slice(0, height.length-2);
        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width.slice(0, width.length-2), height.slice(0, height.length-2));
        //Download image.
        canvas.toBlob(blob => {console.log(blob); saveAs(blob, `${diagramText}_pitch_diagram.png`)});
    }
}