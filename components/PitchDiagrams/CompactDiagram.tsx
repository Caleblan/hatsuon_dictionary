import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../styles/Home.module.css'
import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import Router from 'next/router'

import Link from 'next/link'
// import { useRouter } from 'next/router'
import { PropaneSharp } from '@mui/icons-material';




import {useState} from "react"

const inter = Inter({ subsets: ['latin'] })

// {text}

/**
 * 
 * Note that pattern consists of multiple number values where i%2 === 0 indexes mark the downsteps
 * and i%2 === 1 indexes mark the upsteps. This allows for creating sentances with multiple drops.
 * @param param0 
 * @returns 
 */
export default function CompactDiagram({mora, pattern}: {mora:string[], pattern:number[]}) {
    
    //Pattern

    const spread: number = 24;

    let text = [];


    for(let i = 0; i < mora.length; i++) {
        text.push(<text key={`mora${i}`} x={`${spread*(i+1)*2}px`} y="50%" dominantBaseline="central" fill="black" textAnchor= "start" 
        style={{fontFamily: "Noto Serif JP", fontSize: "1.2rem"}}>{mora[i]}</text>)
    }


    // textElement.current.getStartPositionOfChar(99);

    let currentMarker = pattern[0];

    // let directions = "M0,0 ";

    //If pitch doesnt d
    // console.log(pattern[0])

    // Accent pattern 1 is the only one that starts at top so we will decide where to start on that
    let directions: string;
    let sign: string = "";
    let value = 0;
    
    let patternBool: Boolean = pattern[0] === 1

    if(pattern[0] === 1)
    {
        directions = `M${text[0].props.x.slice(0,-2)},2 `;
    }
    else
    {
        directions =  `M${text[0].props.x.slice(0,-2)},32`;
        sign = "-";
    }


    let i: number;

    //For each of the downsteps and upsteps
    for(i = 0; i < pattern.length; i++)

        
    // a10,10 0 0 0 10,-10 v-15 a10,10 0 0 1 10,-10 `

        directions += i%2 === 0 ?     
        //Create downstep in diagram
        `h${spread*(pattern[i]+1)} a10,10 0 0 ${patternBool ? 1 : 0} 10,${sign}10 v${sign}10 a10,10 0 0 ${patternBool ? 0 : 1} 10,${sign}10 `:
        //Create upstep in diagram
        `h${spread*(pattern[i]+1)} a10,10 0 0 1 10,10 v10 a10,10 0 0 0 10,10 `;
        // "Hi"

        // a10,10 0 0 1 10,10 v15 a10,10 0 0 0 10,10 `;

    //Add vertical line if if the remaining
    if(pattern[pattern.length-1])
    {

    }


    // "M0 3 h200 a50,50 0 0 1 50,50 v100 a50,50 0 0 0 50,50 h200"

    // let line = (
    //     <path d="M 0 10 v 100 m 200 0" stroke="blue" fill= "none" strokeWidth= "2"/>
    // )
    // console.log(`${spread*(i+1)*2+spread}px`, text[text.length-1].props.)

    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: `${text[text.length-1].props.x.slice(0,-2) + spread}px`, maxWidth: "100%", height:"60px"}}>
            {text}
            <path d={directions} stroke="blue" fill= "none" strokeWidth= "3"/>
        </svg>     
    )
}