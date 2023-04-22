
import styles from '../../styles/Home.module.css'
import { IconButton, TextField} from '@mui/material';
import {useState, useEffect} from "react"

import { useRouter } from 'next/router'


import * as wanakana from 'wanakana';

// Library Functions
import clientPromise from "../../lib/mongodb";
import toMora from '../../lib/moraParser';
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

//Used to store language setting for dictionary entries
import cookie from "cookie"
// Images
import MissingPageImage from "../../Images/404Image.svg"


interface props {
  entries: any[],
  entriesCount: number,
  page: number,
  query: string
}



// entries: definitions, entriesCount: resultCount, page, query:query.query


//Determines how many dictionary entries are allowed per page.
const pageEntries: number = 3;

export default function DictionarySearchPage({entries, entriesCount, page, query}: props): JSX.Element {


  //ONly here so that when back button pressed, the query is also set as the previous one
  // useEffect(() => setQuery(props.query),[props.query])


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
            {
              JSON.stringify(entries) == '[]' ?
                
              // <div className="w-full h-full flex flex-col justify-center text-center relative">
              //  <span>Nothing is found</span>
              <>
                <span className="underline pl-4">0 results.</span>
                <div className="w-full h-full text-center font-semibold text-2xl">
                    Oops! It seems we weren&apos;t able to find what you were looking for.
                    <Image className="object-contain w-full h-full" src={MissingPageImage} alt="A sad pitch diagram guy shrugging :("/>
                </div>
              </>
              /* </div> */
              
              :

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
            <PageButtons entriesCount={entriesCount} pageEntries={pageEntries} currentPage={page} query={query}/>
          </div>
      </main>
      
    </>
  )
}

export async function getServerSideProps({query} : {query:any}) {
    
  const {client, db} = await clientPromise();


  // TODO put try statement in incase connection to database fails

  // const tokens: {type: string, value: string}[] = wanakana.tokenize(query, { compact: true, detailed: true})
  // console.log(tokens)


  // Breakdown all query attributes
  const {page} : {page:number} = query;
  // Take user query and create query to give to database.
  const databaseQuery: any = {$or: [{"kanji.text": query.query},{"kana.text": query.query}]};
  const databaseQueryDictionary: any = {$or: [{kanji: {$elemMatch: {text: query.query}}},{kana: {$elemMatch: {text: query.query}}}]};

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
  .collection("Dictionary")
  .countDocuments(databaseQueryDictionary);


  // We will search the JMdict where we can get definitions.
  let definitions: any[] = await db
  .collection("Dictionary")
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
