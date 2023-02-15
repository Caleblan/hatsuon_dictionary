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

import SearchBar from "../../components/Dictionary/SearchBar";

// import clientPromise from "../../lib/mongodb";

// interface IndexProps {
//   todos: Array<Todo>
// }


import {useState} from "react"

const inter = Inter({ subsets: ['latin'] })

export default function DictionaryHomePage(props: any) {
  
  return (
    <>
      <Head>
        <title>Pitch Accent Dictionary | Hatsuon</title>
        <meta name="description" content="A Japanese Web Dictionary with Pitch Accents" />
      </Head>

      {/* className={styles.main} */}
      <main className={styles.main}>
          <SearchBar query={null}/>
      </main>
    </>
  )
}
