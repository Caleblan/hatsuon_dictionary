
import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../../styles/Home.module.css'
import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import Router from 'next/router'

import Link from 'next/link'
// import { useRouter } from 'next/router'
import { PropaneSharp } from '@mui/icons-material';




import {useState} from "react"



interface entryInfo {
  kanji: any[]
  kana: any[]
  sense?: any[]
  translation?: any[]
}



export default function DictionaryEntry({entryInfo /*, diagrams*/, language}: {entryInfo:entryInfo /*, diagrams:any[]*/, language:string}) {
    
    const {kanji, kana} = entryInfo;

    const definitions: any[] | undefined = entryInfo.sense;
    const translation: any[] | undefined = entryInfo.translation;




    //Need to include JMedict definitions 


    const definitionElements: JSX.Element[] = [];

    //Assumes that 
    if(definitions != undefined)
    {
        for(let i = 0; i < definitions.length; i++)
        {
            for(let j = 0; j < definitions[i].gloss.length; j++){

                if(definitions[i].gloss[j].lang == "eng"){
                    definitionElements.push(
                        <p>{`${(i+1) * (j+1)}. `}{definitions[i].gloss[j].text}</p>
                    )
                }
            }
        }

        console.log("Here", definitionElements)
        // definitions.forEach(element => {
        //     console.log("here", element)
        // });
    }
    else if (translation != undefined)
    {
        for(let i = 0; i < translation.length; i++)
        {
            for(let j = 0; j < translation[i].translation.length; j++){

                if(translation[i].translation[j].lang == "eng"){
                    definitionElements.push(
                        <p>{`${(i+1) * (j+1)}. `}{translation[i].translation[j].text}</p>
                    )
                }
            }
        }
    }

    // console.log("THere", definitionElements1)
    // console.log(definitionElements1)
    
    return (
        <div className="flex w-full border-b border-gray-300">
            {/* Used to  */}
            <div className="flex flex-col w-1/4">
                {createWordElement(kanji, kana)}
            </div>
            <div className="flex flex-col w-3/4">
                {definitionElements}
                
            </div>
        </div>
    )
}

/**
 * Creates a JSX Element which displays hirigana word or kanji with furigana 
 * @param kanji Array of all kanji related to a specific entry
 * @param kana Array of all kana related to a specific entry
 * @returns 
 */
function createWordElement(kanji: any[], kana: any[]): JSX.Element {
    
    let commonReading: string;

    //If there is no kanji, make kana the larger element
    if(kanji.length == 0)
    {
        commonReading = kana[0].text;

        for(let i = 0; i < kana.length; i++)
        {
            if(kana[i].common == true)
            {
                commonReading = kana[i].text;
                break;
            }
        }

        return (<span className="text-2xl ">{commonReading}</span>)
    }
    else 
    {
        let commonKanji: string = kanji[0].text;
        commonReading = kana[0].text;
        

        for(let i = 0; i < kana.length; i++)
        {
            if(kana[i].common == true)
            {
                commonReading = kana[i].text;
                break;
            }
        }

        return (
            <>
                <span className="text-sm ">{commonReading}</span>
                <span className="text-2xl ">{commonKanji}</span>
            </>
        )
    }
}

{/* {diagrams.map((compactDiagram:any) => compactDiagram)} */}