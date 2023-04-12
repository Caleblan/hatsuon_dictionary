
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

const { fit } = require('furigana');

import FuriganaWord from './furiganaWord';


import {useState} from "react"


// NOTE NO COMPLETE
// TODO add all tags 
let entryTags = {
    'adj-f': 'noun or verb acting prenominally',
    'adj-i': 'adjective (keiyoushi)',
    'adj-ix': 'adjective (keiyoushi) - yoi/ii class',
    'adj-kari': "'kari' adjective (archaic)",
    'adj-ku': "'ku' adjective (archaic)",
    'adj-na': 'adjectival nouns or quasi-adjectives (keiyodoshi)',
    'adj-nari': 'archaic/formal form of na-adjective',
    'adj-no': 'nouns which may take the genitive case particle \'no\'',
    'adj-pn': 'pre-noun adjectival (rentaishi)',
    'adj-shiku': "'shiku' adjective (archaic)",
    'adj-t': "'taru' adjective",
    'adv': 'adverb (fukushi)',
    'adv-to': "adverb taking the 'to' particle",
    'aux': 'auxiliary',
    'aux-adj': 'auxiliary adjective',
    'aux-v': 'auxiliary verb',
    'conj': 'conjunction',
    'cop': 'copula',
    'ctr': 'counter',
    'exp': 'expressions (phrases, clauses, etc.)',
    'int': 'interjection (kandoushi)',
    'n': 'noun (common) (futsuumeishi)',
    'n-adv': 'adverbial noun (fukushitekimeishi)',
    'n-pr': 'proper noun',
    'n-pref': 'noun, used as a prefix',
    'n-suf': 'noun, used as a suffix',
    'n-t': 'noun (temporal) (jisoumeishi)',
    'num': 'numeric',
    'pn': 'pronoun',
    'pref': 'prefix',
    'prt': 'particle',
    'suf': 'suffix',
    'unc': 'unclassified',
    'v-unspec': 'verb unspecified',
    'v1': 'Ichidan verb',
    'v1-s': 'Ichidan verb - kureru special class',
    'v2a-s': "Nidan verb with 'u' ending (archaic)",
    'v2b-k': "Nidan verb (upper class) with 'bu' ending (archaic)",
    'v2b-s': "Nidan verb (lower class) with 'bu' ending (archaic)",
    'v2d-k': "Nidan verb (upper class) with 'dzu' ending (archaic)",
    'v2d-s': "Nidan verb (lower class) with 'dzu' ending (archaic)",
    'v2g-k': "Nidan verb (upper class) with 'gu' ending (archaic)",
    'v2g-s': "Nidan verb (lower class) with 'gu' ending (archaic)",
    'v2h-k': "Nidan verb (upper class) with 'hu/fu' ending (archaic)",
    'v2h-s': "Nidan verb (lower class) with 'hu/fu' ending (archaic)",
    'v2k-k': "Nidan verb (upper class) with 'ku' ending (archaic)",
    'v2k-s': "Nidan verb (lower class) with 'ku' ending (archaic)",
    'v2m-k': "Nidan verb (upper class) with 'mu"
}

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
                    
                    console.log("What up", definitions[i].partOfSpeech)


                    // fit(definitions[i].gloss[j].text, 'にのまえしゃちょうとつなしせんせい')
                    
                    definitionElements.push(
                        <div>
                            <p>
                                {definitions[i].partOfSpeech.map( (value:string) => entryTags[value]).toString()}
                            </p>

                            <p>{definitions[i].partOfSpeech}</p>
                            <p>{`${(i+1) * (j+1)}. `}{definitions[i].gloss[j].text}</p>
                        </div>
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
                        // <p>{translation[i].translation[j].type}</p>
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
                {/* {createWordElement(kanji, kana)} */}
                <FuriganaWord kanji={kanji.length > 0 ? kanji[0].text : null} kana={kana[0].text}/>
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