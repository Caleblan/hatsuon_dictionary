
// Library Functions
import clientPromise from "../../lib/mongodb";
// Next.js
import Head from 'next/head';
import Image from 'next/image';
// Mongo
import mongoose from 'mongoose';
// Third-party
import * as wanakana from 'wanakana';
import { v4 as uuidv4 } from 'uuid';
// Custom Components
import DictionaryEntry from '../../components/Dictionary/DictionaryEntry';
import DictionaryFooter from '../../components/Dictionary/DictionaryFooter';
import SearchBar from "../../components/Dictionary/SearchBar";
// Images
import MissingPageImage from "../../Images/404Image.svg";


type props =  {
  entries: any[],
  // Count of total number of entries for the whole query (not limited by page entries)
  entriesCount: number,
  page: number,
  query: string
}


//Determines how many dictionary entries are allowed per page.
const pageEntries: number = 10;

export default function DictionarySearchPage({entries, entriesCount, page, query}: props): JSX.Element {

  // Contains all the dictionary results that are to be displayed.
  const results: JSX.Element[] = entries.map( (entry:any) => {
    return (<DictionaryEntry key={uuidv4()} entryInfo={entry} language="eng"/>)
  });

  // Used to tell user what results they are currently on (or if there are no results at all).
  const resultResponse : string = entriesCount > 0 && entries.length > 0 ? 
    `${(page-1)*pageEntries + 1}-${(page-1)*pageEntries + entries.length} of ${entriesCount} entries`
    : "No entries found";


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
              {resultResponse}
            </span>

            {/* Results Display. */}
            { results.length > 0 ?
              // Show all results returned
              <div className="flex flex-col gap-y-4">{results}</div>
              // No results were found so display that no results were found.
              : <div className="w-full h-full text-center font-semibold text-2xl">
                  {"Oops! It seems we weren't able to find what you were looking for"}.
                  <Image className="object-contain w-full h-full" src={MissingPageImage} alt="A sad pitch diagram guy shrugging :("/>
              </div>
            }
            {entriesCount > 0 && entries.length > 0 ?
              <DictionaryFooter entriesCount={entriesCount} currentPage={page} query={query} pageEntries={pageEntries}/>
              : null
            }
          </div>
      </main>
    </>
  )
}

/**
 * 
 * @param param0 
 * @returns 
 */
export async function getServerSideProps({query} : {query:any}) {

  // try 
  // {
    //Connect to the database 
    const {client, db} = await clientPromise();
  
    const collection: string = "JMdict";

    // TODO put try statement in incase connection to database fails

    const tokens: any[] = wanakana.tokenize(query.query, { compact: true, detailed: true})
    
    // Used to store the english turned into romaji
    let romajiToKana: string[] = [];
    let japanese: string[] = [];

    // console.log(tokens)

    for(let i: number = 0; i < tokens.length; i++)
    {
      switch (tokens[i].type) 
      {
        case "en":romajiToKana.push(wanakana.toHiragana(tokens[i].value), wanakana.toKatakana(tokens[i].value));
                  break;
        case "ja":japanese.push(tokens[i].value)
                  break;
      }
    }



    console.log(romajiToKana)


    // let list: any[] = romajiToKana.map( (token:string) => {return {$in: [ new RegExp(token), "$kana.text"]}});
    let list: any[] = romajiToKana.map( (token:string) => {
      return {$in: [true,
      {
        $map: {
          input: "$kana",
          as: "kanaElement",
          in: {
            $regexMatch: {
              input: "$$kanaElement.text",
              regex: `${token}`
            }
          }
        }
      }
    ]}});

    let japaneseList: any[] = japanese.map( (token:string) => {
      return {$in: [true,
      {
        $map: {
          input: "$kanji",
          as: "kanjiElement",
          in: {
            $regexMatch: {
              input: "$$kanjiElement.text",
              regex: `${token}`
            }
          }
        }
      }
    ]}});

    // let japaneseObject: any[] = japanese.map( (token:string) => {return {"kana": {"text": {regex: `.*${token}.*`}}}});

    console.log(list)
    // console.log(japaneseObject)

    // $in: ["$kana", "$$kana.text"]

    // Breakdown all query attributes
    const {page} : {page:number} = query;
    // const databaseQueryDictionary: any = {$or: [{kanji: {$elemMatch: {text: query.query}}},{kana: {$elemMatch: {text: {$regex:`.*${query.query}.*`}}}}, ...list]};

  // Aggregation pipeline.


  let kanji: string[] = japanese.filter( (element:string) => wanakana.isKanji(element))
  //                         japanese.filter( (element:string) => wanakana.isKana(element)).join(" ") : " ",

  // console.log(query.query)

    const pipeline: any[] = [

      // {$expr: databaseQueryDictionary}

      {
        $search: {
          index: "JMdictText",
          text: {
            query: query.query,
            path: ["kana.text", "kanji.text", "sense.gloss.text"]
          }
        
          // "compound": {
          //   "should": [
          //     {
          //       "text": {
          //         "query": query.query,
          //         "path": ["kana.text", "kanji.text"]
          //       }
          //     },
          //     // {
          //     //   "text": {
          //     //     "query":　query.query,
          //     //     "path": ["kanji.text"]
          //     //   }
          //     // }
          //   ],



            // "must" : [
            //   {
            //     "text": {
            //       "query":　japanese.filter( (element:string) => wanakana.isKanji(element)).join(" "),
            //       "path": ["kanji.text"]
            //     }
            //   }]
          // }
        }

      },         
      // Sort based on text relevance
      // {$sort: { score: {$meta: "textScore"}}},
      {$facet: 
        {
          "count": [{$count: 'count'}],
          "results" :
          [
            {$skip: (page-1) * pageEntries},
            {$limit: pageEntries},
            {
              $lookup: {
                from: "PitchAccents",
                let: {
                  kanji: {
                    $map: {
                      input: { $ifNull: ["$kanji", []] },
                      as: "w",
                      in: "$$w.text"
                    }
                  },
                  kana: {
                    $map: {
                      input: { $ifNull: ["$kana", []] },
                      as: "k",
                      in: "$$k.text"
                    }
                  }
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $or: [
                          {
                            $and: [
                              { $in: ["$word", "$$kanji"] },
                              { $in: ["$kana", "$$kana"] }
                              // TODO add check to make sure kana applies kanji
                            ]
                          },
                          {
                            $and: [
                              {$eq: ["$kana", ""]},
                              { $in: ["$word", "$$kana"] }
                            ]
                          }
                        ]
                      
                      }
                    }
                  }
                ],
                as: "accents"
              }
            }
          ]
        }
      },
      // Sort based on relevancy
      // { $sort: { title: 1 } }
    ];

    // We will search the JMdict where we can get definitions.
    let definitions: any[] = await db
    .collection(collection)
    .aggregate(pipeline)
    .toArray();
    console.log(tokens)

    definitions = JSON.parse(JSON.stringify(definitions));

    console.log(definitions[0].results)

    // console.log(definitions[0].count[0]);

    // console.log(definitions[0].results[0].accents, definitions[0].results[1].accents)

    // console.log(definitions[0]["count"], definitions[0]["count"][0]["count"])

    return {
      props: {
        entries: definitions[0].results, 
        entriesCount: definitions[0]["count"].length > 0 && definitions[0]["count"][0]["count"] ? definitions[0].count[0].count : 0, 
        page, 
        query:query.query},
    };

    
  // }
  // catch(error: unknown)
  // {
  //   // throw new Error("Connection to database failed.");
  // }

}
