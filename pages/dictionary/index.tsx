import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import SearchBar from "../../components/Dictionary/SearchBar";

export default function DictionaryHomePage() {
  
  return (
    <>
      <Head>
        <title>Pitch Accent Dictionary | Hatsuon</title>
        <meta name="description" content="A Japanese Web Dictionary with Pitch Accents" />
      </Head>

      <main>
        <div className="w-full px-4 h-full flex flex-col items-center max-w-7xl">
          <SearchBar className="w-full mt-4" query={''}/>

          <div className="flex flex-col items-center font-medium">

            <span className="font-bold font-serif text-3xl mt-8 mb-4 text-center">
              {"Welcome to the Hatsuon Pitch Accent Dictionary!"}
            </span>

        
            <p className="md:w-3/4 text-lg">
              {
                `This dictionary is meant to act both as a reference and and educational tool
                for Japanese. It is possible to query this dictionary using the following methods:`
              }
            </p>

            <ul className="w-full md:w-3/4 text-lg text-start list-disc pl-10 py-4">
              <li>Kanji</li>
              <li>Hiragana / Katakana</li>
              <li>Romaji</li>
            </ul>

            <p className="md:w-3/4 text-lg">
              {
                `At the moment, this website project is a side project and is only being developed
                only by myself. This means the website is still under early-development and may have bugs or may
                not always return the most relevant results. If you have the time, please report any bugs in the discord. 
                `
              }
            </p>


          </div>


        </div>
      </main>
    </>
  )
}
