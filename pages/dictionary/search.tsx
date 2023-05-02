
import styles from '../../styles/Home.module.css'
import { IconButton, TextField} from '@mui/material';
import {useState, useEffect} from "react"

import { useRouter } from 'next/router'


import * as wanakana from 'wanakana';

// Library Functions
import clientPromise from "../../lib/mongodb";
// Components
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// Custom Components
import DictionaryEntry from '../../components/Dictionary/DictionaryEntry';
import SearchBar from "../../components/Dictionary/SearchBar";
import PageButtons from '../../components/Dictionary/PageButtons';
import CompactDiagram from '../../components/PitchDiagrams/CompactDiagram';
import DotDiagram from '../../components/PitchDiagrams/DotDiagram';
import { Pattern } from '@mui/icons-material';

import DictionaryFooter from '../../components/Dictionary/DictionaryFooter';

//Used to store language setting for dictionary entries
import cookie from "cookie"
// Images
import MissingPageImage from "../../Images/404Image.svg"


interface props {
  entries: any[],
  // Count of total number of entries for the whole query (not limited by page entries)
  entriesCount: number,
  page: number,
  query: string
}



// entries: definitions, entriesCount: resultCount, page, query:query.query


//Determines how many dictionary entries are allowed per page.
const pageEntries: number = 10;

export default function DictionarySearchPage({entries, entriesCount, page, query}: props): JSX.Element {


  let pageLinks: JSX.Element[] = [];

  // console.log(props.query, typeof(query), query == "")

  //TODO when pressing the back button in browser, must put old text into Textfield

  let key = 0;

  return (
    <>
      <Head>
        <title>{query} | Hatsuon</title>
        <meta name="description" content="A Japanese Web Dictionary with Pitch Accents" />
      </Head>
      <main> 
          <div className="w-3/4 h-full flex flex-col justify-center">

            <SearchBar query={query}/>
            
            <span className="text-slate-600 pl-2 pt-2 pb-4">
              {entriesCount > 0 && entries.length > 0 ? 
                `${(page-1)*pageEntries + 1}-${(page-1)*pageEntries + entries.length} of ${entriesCount} entries`
                : "No entries found"
              }
            </span>


            {
              JSON.stringify(entries) == '[]' ?
              
              
              // <div className="w-full h-full flex flex-col justify-center text-center relative">
              //  <span>Nothing is found</span>
              <>
                <div className="w-full h-full text-center font-semibold text-2xl">
                    Oops! It seems we weren&apos;t able to find what you were looking for.
                    <Image className="object-contain w-full h-full" src={MissingPageImage} alt="A sad pitch diagram guy shrugging :("/>
                </div>
              </>
              /* </div> */
              
              :

              <div className="flex flex-col gap-y-4">
              {
                // Create entry for each dictionary result returned from database.
                entries.map((entry:any) => 
                (
                  <DictionaryEntry key={key++} entryInfo={entry} language="eng"
                    // diagrams={}
                    
                    
                  //   {Object.entries(entry.accents).map((accentCategory) => (
                  //     // For each accent category
                  //     accentCategory[1].map((accent:number) => (
                  //       // <CompactDiagram 
                  //       //   mora = {entry.kana == "" ? toMora(entry.word) : toMora(entry.kana)}
                  //       //   pattern = {[accent]}
                  //       // />
                  //       <DotDiagram
                  //         mora = {entry.kana == "" ? toMora(entry.word) : toMora(entry.kana)}
                  //         pitchPattern = {accent}
                  //         color="black"
                  //       />
                  //       )
                  //     )
                  //   )
                  // )}
                  />
                )
              )
            }
            </div>
          }
            
            
            {
              entriesCount > 0 && entries.length > 0 ?
              <DictionaryFooter entriesCount={entriesCount} currentPage={page} query={query} pageEntries={pageEntries}/>
              : null
            }
            

          </div>
      </main>
      
    </>
  )
}

{/* <PageButtons entriesCount={entriesCount} pageEntries={pageEntries} currentPage={page} query={query}/>: null */}

/**
 * 
 * @param param0 
 * @returns 
 */
export async function getServerSideProps({query} : {query:any}) {

  //Connect to the database 
  try {
    const {client, db} = await clientPromise();
  }
  catch(error: unknown)
  {
    throw new Error("Connection to database failed.");
  }

  const collection: string = "JMdict";

  // TODO put try statement in incase connection to database fails

  const tokens: any[] = wanakana.tokenize(query.query, { compact: true, detailed: true})
  
  // Used to store the english turned into romaji
  let romajiToKana: string[] = [];
  let japanese: string[] = [];

  console.log(tokens)

  for(let i: number = 0; i < tokens.length; i++)
  {
    switch (tokens[i].type) 
    {
      case "en":romajiToKana.push(wanakana.toHiragana(tokens[i].value), wanakana.toKatakana(tokens[i].value));
                break;
      case "jp":japanese.push(tokens[i].value)
                break;
    }
  }



  console.log(romajiToKana)


  let list: any[] = romajiToKana.map( (token:string) => {return {kana: {$elemMatch: {text: {$regex:`.*${token}.*`}}}}});

  console.log(list)

  // Breakdown all query attributes
  const {page} : {page:number} = query;
  // Take user query and create query to give to database.
  const databaseQuery: any = {$or: [{"kanji.text": query.query},{"kana.text": query.query}]};
  
  const databaseQueryDictionary: any = {$or: [{kanji: {$elemMatch: {text: query.query}}},{kana: {$elemMatch: {text: query.query}}}, ...list]};

  // // Search the database for either the kanji or kana of the word.
  // let accents = await db
  // .collection("PitchAccents")
  // .find(databaseQuery)
  // .skip((page-1) * pageEntries)
  // .limit(pageEntries)
  // .toArray();


  // wanakana.toHiragana()

  //Get the number of results so we know how many page number buttons we need.
  const resultCount: number = await db
  .collection(collection)
  .countDocuments(databaseQueryDictionary);


  // We will search the JMdict where we can get definitions.
  let definitions: any[] = await db
  .collection(collection)
  .find(databaseQueryDictionary)
  .skip((page-1) * pageEntries)
  .limit(pageEntries)
  .toArray();

  definitions = JSON.parse(JSON.stringify(definitions));

  // console.log(JSON.stringify(accents))

  return {
    props: {entries: definitions, entriesCount: resultCount, page, query:query.query},
  };
}

// export function parseCookies(req) {
//   return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
// }

// DictionarySearch.getInitialProps = async ({ req, res }) => {
  
//   const data = parseCookies(req)
  
//    if (res) {
//     if (Object.keys(data).length === 0 && data.constructor === Object) {
//       res.writeHead(301, { Location: "/" })
//       res.end()
//     }
//   }
  
//   return {
//     data: data && data,
//   }
// }
