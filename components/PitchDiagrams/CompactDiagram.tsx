import React, {useState} from "react"

interface props {
    mora:string[], 
    pitchPattern:number[], 
    color:string
}

export default function CompactDiagram({mora, pitchPattern, color} : props): JSX.Element {

    //Diagram settings
    const nodeDistance: number = 80;
    const primaryColor: string = color;

    /**
     * Draws a pitch diagram based on the inputed text and pitch pattern.
     * @returns An SVG JSX element of the pitch diagram.
     */
    function drawDiagram(): JSX.Element {

        let text: JSX.Element[] = [];

        // console.log(pitchPattern)

        //TODO find better way to place text.
        for(let i: number = 0; i < mora.length; i++) {
            text.push(
                <text key={`mora${i}`} x={nodeDistance * (i + 1)} y={115} fill={primaryColor} textAnchor= "middle" 
                style={{fontFamily: "Noto Serif JP", fontSize: "3rem"}}>{mora[i]}</text>
            )
        }

        let path: JSX.Element | null = null;

        let high: number = 65;
        let low: number = 130;


        //Move point to first node.
        let pathString: string = `M${nodeDistance-nodeDistance/4},${pitchPattern[0] == 2 ? low : high}`;
        
        var finalDistance: number = 0

        //Create a path connecting all nodes together.
        for(let i = 1; i < pitchPattern.length; i++)
        {
            // pathString += ` L${nodes[i].props.cx},${nodes[i].props.cy}`
            
            pathString += ` L${nodeDistance * (i+1)-30},${pitchPattern[i] == 2 ? low: high}`

            finalDistance = nodeDistance * (i+1)-30;
        }

        path = (
            <path d={pathString} stroke={primaryColor} fill= "none" strokeWidth="4"/>
        );

        let svgWidth: number = text.length > 0 && text[text.length-1].props.x + nodeDistance > finalDistance 
            ? text[text.length-1].props.x + nodeDistance 
            : finalDistance

        return (
            <svg xmlns="http://www.w3.org/2000/svg" style={{width: `${svgWidth}px`, height:"180px"}}
            viewBox={`0 0 ${svgWidth} 180`}>
                <text fill-opacity="0%">Created by Hatsuon website. Caleb Landry</text>
                <g>{path}</g>
                <g>{text}</g>
            </svg>
        );
    }
  
    return drawDiagram();
}