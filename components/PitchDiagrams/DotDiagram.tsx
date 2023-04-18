import React, {useState} from "react"

interface props {
    mora:string[], 
    pitchPattern:number[], 
    color:string
}

export default function DotDiagram({mora, pitchPattern, color} : props): JSX.Element{

    //Diagram settings
    const nodeDistance: number = 65;
    const nodeRadius: number = 8;
    const primaryColor: string = color;

    //Used to mask path behind last node which has transparent center.
    let mask: JSX.Element | null = null;

    /**
     * Draws a pitch diagram based on the inputed text and pitch pattern.
     * @returns An SVG JSX element of the pitch diagram.
     */
    function drawDiagram(): JSX.Element {
            
        const nodes: JSX.Element[] = createNodes(pitchPattern);

        let path: JSX.Element | null = null;

        //Only draw line if more than a single node.
        if(pitchPattern.length > 1) {
        
            //Move point to first node.
            let pathString: string = `M${nodes[0].props.cx},${nodes[0].props.cy}`;
            
            //Create a path connecting all nodes together.
            for(let i = 1; i < nodes.length; i++)
            {
                pathString += ` L${nodes[i].props.cx},${nodes[i].props.cy}`
            }


            //TODO path make a better solution for mask on path
            // new Set(pitchPattern).size != 1 ? {mask: "url(#mask)"} : {}

            path = (
                <path d={pathString} stroke={primaryColor} fill= "none" strokeWidth="3" mask="url(#mask)"/>
            );
        }

        let text: JSX.Element[] = [];

        //TODO find better way to place text.
        for(let i = 0; i < mora.length; i++) {
            text.push(
                <text key={`mora${i}`} x={nodeDistance * (i + 1)} y={160} fill={primaryColor} textAnchor= "middle" 
                style={{fontFamily: "Noto Serif JP", fontSize: "1.8em", fontWeight: "bold"}}>{mora[i]}</text>
            )
        }

        let svgWidth: number = 0;

        if(nodes.length > 0 && nodes.length >= mora.length)
        {
            svgWidth = nodes[nodes.length-1].props.cx + nodeDistance;
        }
        else if(text.length > 0 && mora.length > nodes.length)
        {
            svgWidth = text[text.length-1].props.x + nodeDistance;
        }

        return (
            <svg xmlns="http://www.w3.org/2000/svg" style={{width: `${svgWidth}px`, height:"180px"}}
            viewBox={`0 0 ${svgWidth} 180`}>
                <text fill-opacity="0%">Created by Hatsuon website. Caleb Landry</text>
                <defs>
                    <mask id="mask" maskUnits="userSpaceOnUse">
                        {/* Rectangle element states where we can see the element */}
                        <rect x="0" y="0" width={`${svgWidth}px`} height="190px" fill="white"/>
                        {/* Mask dictates where we can see the element */}
                        {mask}
                    </mask>
                </defs>
                {path ? path : <></>}
                <g>{nodes}</g>
                <g>{text}</g>
            </svg>
        );
    }

    /**
     * Creates a node for each japanese mora.
     * @param {number[]} pattern - A list of the heights of each node.
     * @returns List of JSX Node elements for each mora.
     */
    function createNodes(pattern:number[]): JSX.Element[] {
        
        let nodes: JSX.Element[] = [];

        if(pattern.length === 1)
        {
            nodes.push(
                <circle key={`node0`} id={`node0`}
                cx={nodeDistance} cy={50 * pattern[0]} r={nodeRadius} stroke={primaryColor} strokeWidth="3" fill={primaryColor} />
            );
            return nodes;
        }

        //Add filled in node for mora typed into the japanese
        for (var nodeCount = 0; nodeCount < pattern.length-1; nodeCount++) {
            nodes.push(
                <circle key={`node${nodeCount}`} id={`node${nodeCount}`}
                cx={nodeDistance * (nodeCount + 1)} cy={50 * pattern[nodeCount]} r={nodeRadius} stroke={primaryColor} strokeWidth="3" fill={primaryColor} />
            );
        }

        //Adds the last additional mora for following mora.
        if(pattern.length > 1) {
            nodes.push(               
                <circle key={`node${nodeCount}`} id={`node${nodeCount}`}
                cx={nodeDistance * (nodeCount + 1)} cy={50 * pattern[nodeCount]} r={nodeRadius} stroke={primaryColor} strokeWidth="3" fill="none"/>
            );

            //Set mask as similar attribute as last node
            mask = <circle cx={nodeDistance * (nodeCount + 1)} cy={50 * pattern[nodeCount]} r={nodeRadius} stroke="black" strokeWidth="3" fill="black"/>
        }

        return nodes;
    }
  
    return drawDiagram();
}