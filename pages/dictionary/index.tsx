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
        <div className="w-3/4">
          <SearchBar query={null}/>
        </div>
      </main>
    </>
  )
}
