
// MUI/React Imports
import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import DotDiagram from "../PitchDiagrams/DotDiagram";

import {toMora, convertPitchNumber, determinePitchPattern} from "../../lib/pitchUtilities";

import * as wanakana from 'wanakana';

type props = {
    kanji: string,
    kana: string,
    key: string,
    accents: number[],
    partOfSpeech: string
};

export default function Diagram({kanji, kana, accents, partOfSpeech, key} :props) {

    const mora: string[] = toMora(kana === "" ? kanji : kana);

    // Current pattern that is selected.
    const [selectedPattern, changeSelectedPattern] = useState<number>(Number(accents[0]));
    // Stores the name of the current pattern type (i.e. heiban, etc.)
    const [patternType, changePatternType] = useState<string[]>(determinePitchPattern(mora.length, selectedPattern));

    useEffect(() => {
        changePatternType(() => determinePitchPattern(mora.length, selectedPattern))
    }, [selectedPattern])

    return (
        <div>
            {partOfSpeech === "generic" ? null : partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}
            <DotDiagram key={key} mora={mora} 
            pitchPattern={convertPitchNumber(selectedPattern, mora.length)} 
            color={"black"} height={150} width={300}/>

            <span className="w-full flex justify-end items-center">
                <span className="font-bold mr-2">{patternType[0]}</span>
                <span className="text-sm text-slate-500 font-serif">{wanakana.toRomaji(patternType[1])}</span>
            </span>


            <div className="w-full flex items-center justify-around text-end pt-2">
                
                <Stack className="flex flex-row">
                    <ToggleButtonGroup
                        className="h-fit"
                        // orientation="vertical"
                        value={selectedPattern}
                        exclusive
                        onChange={(event:any) => changeSelectedPattern(Number(event.target.value))}
                    >
                        {
                            accents.map( (pattern:number) => {
                                return (
                                    <ToggleButton className="h-fit" 
                                    style={{height: "2.5em", width: "3em"}}
                                    key={kana+pattern} value={pattern}>
                                        {`${pattern}`}
                                    </ToggleButton>
                                )
                            })
                        }
                    </ToggleButtonGroup>
                </Stack>
            </div>

        </div>
    )
    
}