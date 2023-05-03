// React/MUI
import React from "react";
// Next.js
import Image from 'next/image';
import Router from 'next/router';
import Link from 'next/link';
// Third-party
import * as wanakana from 'wanakana';
const { fit } = require('furigana');
var codec = require('kamiya-codec');
// Custom components
import DotDiagram from '../PitchDiagrams/DotDiagram';
import FuriganaWord from './FuriganaWord';
// Library functions
import {toMora, determinePitchPattern} from '../../lib/pitchUtilities';

// import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
// import Kuroshiro from "kuroshiro";

// const kuroshiro = new Kuroshiro();
// // Initialize
// // Here uses async/await, you could also use Promise
// await kuroshiro.init(new KuromojiAnalyzer());
// // Convert what you want
// const result = await kuroshiro.convert("感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！", { to: "hiragana" });

// Used for conjugating/deconjugating verbs/adjectives.
var codec = require('kamiya-codec');



  const partOfSpeechTags: {[key: string]: string} = {
    "adj-f": "noun or verb acting prenominally",
    "adj-i": "adjective (keiyoushi)",
    "adj-ix": "adjective (keiyoushi) - yoi/ii class",
    "adj-kari": "'kari' adjective (archaic)",
    "adj-ku": "'ku' adjective (archaic)",
    "adj-na": "adjectival nouns or quasi-adjectives (keiyodoshi)",
    "adj-nari": "archaic/formal form of na-adjective",
    "adj-no": "nouns which may take the genitive case particle 'no'",
    "adj-pn": "pre-noun adjectival (rentaishi)",
    "adj-shiku": "'shiku' adjective (archaic)",
    "adj-t": "'taru' adjective",
    "adv": "adverb (fukushi)",
    "adv-to": "adverb taking the 'to' particle",
    "aux": "auxiliary",
    "aux-adj": "auxiliary adjective",
    "aux-v": "auxiliary verb",
    "conj": "conjunction",
    "cop": "copula",
    "ctr": "counter",
    "exp": "expressions (phrases, clauses, etc.)",
    "int": "interjection (kandoushi)",
    "n": "noun (common) (futsuumeishi)",
    "n-adv": "adverbial noun (fukushitekimeishi)",
    "n-pr": "proper noun",
    "n-pref": "noun, used as a prefix",
    "n-suf": "noun, used as a suffix",
    "n-t": "noun (temporal) (jisoumeishi)",
    "num": "numeric",
    "pn": "pronoun",
    "pref": "prefix",
    "prt": "particle",
    "suf": "suffix",
    "unc": "unclassified",
    "v-unspec": "verb unspecified",
    "v1": "Ichidan verb",
    "v1-s": "Ichidan verb - kureru special class",
    "v2a-s": "Nidan verb with 'u' ending (archaic)",
    "v2b-k": "Nidan verb (upper class) with 'bu' ending (archaic)",
    "v2b-s": "Nidan verb (lower class) with 'bu' ending (archaic)",
    "v2d-k": "Nidan verb (upper class) with 'dzu' ending (archaic)",
    "v2d-s": "Nidan verb (lower class) with 'dzu' ending (archaic)",
    "v2g-k": "Nidan verb (upper class) with 'gu' ending (archaic)",
    "v2g-s": "Nidan verb (lower class) with 'gu' ending (archaic)",
    "v2h-k": "Nidan verb (upper class) with 'hu/fu' ending (archaic)",
    "v2h-s": "Nidan verb (lower class) with 'hu/fu' ending (archaic)",
    "v2k-k": "Nidan verb (upper class) with 'ku' ending (archaic)",
    "v2k-s": "Nidan verb (lower class) with 'ku' ending (archaic)",
    "v2m-k": "Nidan verb (upper class) with 'mu' ending (archaic)",
    "v2m-s": "Nidan verb (lower class) with 'mu' ending (archaic)",
    "v2n-s": "Nidan verb (lower class) with 'nu' ending (archaic)",
    "v2r-k": "Nidan verb (upper class) with 'ru' ending (archaic)",
    "v2r-s": "Nidan verb (lower class) with 'ru' ending (archaic)",
    "v2s-s": "Nidan verb (lower class) with 'su' ending (archaic)",
    "v2t-k": "Nidan verb (upper class) with 'tsu' ending (archaic)",
    "v2t-s": "Nidan verb (lower class) with 'tsu' ending (archaic)",
    "v2w-s": "Nidan verb (lower class) with 'u' ending and 'we' conjugation (archaic)",
    "v2y-k": "Nidan verb (upper class) with 'yu' ending (archaic)",
    "v2y-s": "Nidan verb (lower class) with 'yu' ending (archaic)",
    "v2z-s": "Nidan verb (lower class) with 'zu' ending (archaic)",
    "v4b": "Yodan verb with 'bu' ending (archaic)",
    "v4g": "Yodan verb with 'gu' ending (archaic)",
    "v4h": "Yodan verb with 'hu/fu' ending (archaic)",
    "v4k": "Yodan verb with 'ku' ending (archaic)",
    "v4m": "Yodan verb with 'mu' ending (archaic)",
    "v4n": "Yodan verb with 'nu' ending (archaic)",
    "v4r": "Yodan verb with 'ru' ending (archaic)",
    "v4s": "Yodan verb with 'su' ending (archaic)",
    "v4t": "Yodan verb with 'tsu' ending (archaic)",
    "v5aru": "Godan verb - -aru special class",
    "v5b": "Godan verb with 'bu' ending",
    "v5g": "Godan verb with 'gu' ending",
    "v5k": "Godan verb with 'ku' ending",
    "v5k-s": "Godan verb - Iku/Yuku special class",
    "v5m": "Godan verb with 'mu' ending",
    "v5n": "Godan verb with 'nu' ending",
    "v5r": "Godan verb with 'ru' ending",
    "v5r-i": "Godan verb with 'ru' ending (irregular verb)",
    "v5s": "Godan verb with 'su' ending",
    "v5t": "Godan verb with 'tsu' ending",
    "v5u": "Godan verb with 'u' ending",
    "v5u-s": "Godan verb with 'u' ending (special class)",
    "v5uru": "Godan verb - Uru old class verb (old form of Eru)",
    "vi": "intransitive verb",
    "vk": "Kuru verb - special class",
    "vn": "irregular nu verb",
    "vr": "irregular ru verb, plain form ends with -ri",
    "vs": "noun or participle which takes the aux. verb suru",
    "vs-c": "su verb - precursor to the modern suru",
    "vs-i": "suru verb - included",
    "vs-s": "suru verb - special class",
    "vt": "transitive verb",
    "vz": "Ichidan verb - zuru verb (alternative form of -jiru verbs)"
  }


interface entryInfo {
  kanji: any[]
  kana: any[]
  sense?: any[]
  translation?: any[]
}


export default function DictionaryEntry({entryInfo /*, diagrams*/, language}: {entryInfo:entryInfo /*, diagrams:any[]*/, language:string}): JSX.Element {
    
    const {kanji, kana} = entryInfo;

    const definitions: any[] | undefined = entryInfo.sense;
    const translation: any[] | undefined = entryInfo.translation;




    //Need to include JMedict definitions 

    // Stores JSX.ELements of word and dictionary definitions
    const definitionElements: JSX.Element[] = [];
    // const

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
                        <div className="flex flex-col">

                            <span className="w-full text-sm text-slate-500 font-serif">
                                {definitions[i].partOfSpeech.map( (value:string) => partOfSpeechTags[value]).toString()}
                            </span>

                            {/* <p>{definitions[i].partOfSpeech}</p> */}
                            <span className="w-full text-lg">
                                {`${(i+1) * (j+1)}. `}{definitions[i].gloss[j].text}
                            </span>
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

        // Used to determine if it is a katakana string
    // let newString = originalString.replace(new RegExp("する", "g"), "");
    // const masuVerb: string = codec.conjugateAuxiliaries(kanji[0] && kanji[0].text ? kanji[0].text : kana[0].text, ["Masu"], "Dictionary", true)[0]
    // const negativeMasuVerb: string = codec.conjugateAuxiliaries(kanji[0] && kanji[0].text ? kanji[0].text : kana[0].text, ["Masu"], "Negative", true)[0]

    // console.log(masuVerb)

    // const masuPattern: number[] = [2, ...Array(masuVerb.length-2).fill(1), 2, 2]
    // const negativeMasuPattern: number[] = [2, ...Array(negativeMasuVerb.length-2).fill(1), 2, 2]

    // console.log(masuPattern, Array(masuVerb.length-2), masuVerb.length);


    // TODO figure out how to convert verb conjugations to pure hiragana

    // const verbToKana: string = wanakana.toHiragana(masuVerb)

    
    return (
        <div className="w-full flex flex-col gap-y-4 md:gap-x-6 md:flex-row border-b border-gray-400 pb-4 px-4">
                
            <div className="w-full flex flex-col">
                
                {/* Word and readings */}
                <div className="w-fit flex gap-x-4 gap-y-1 flex-col md:flex-row mb-3">
                    {/* {createWordElement(kanji, kana)} */}
                    <FuriganaWord className="font-bold text-3xl" word={kanji.length > 0 ? kanji[0].text : null} reading={kana[0].text}
                    showFuri={true}/>
                    <span className="h-full flex items-end text-sm text-slate-500 font-serif">{wanakana.toRomaji(kana[0].text)}</span>
                </div>

                {/* Definitions */}
                <div className="flex flex-col w-3/4 gap-y-4 pl-2">
                    {definitionElements}
                </div>
            </div>

            {/* Pitch Accents */}
            <div className="w-full flex flex-col pl-2 pt-2">
                <span className="font-semibold">Pitch Accents</span>

                <div className="flex flex-col items-center ">
                    <DotDiagram mora={toMora(kana[0].text)} pitchPattern={[2,1,1,1,2]} color={"black"} height={150} width={300}/> 
                    <div className="w-full text-end pl-2">
                        <span className="font-bold mr-2">{determinePitchPattern(toMora(kana[0].text).length, 2)[0]}</span>
                        <span className="text-sm text-slate-500 font-serif">{wanakana.toRomaji(determinePitchPattern(toMora(kana[0].text).length, 2)[1])}</span>
                    </div>
                </div>
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