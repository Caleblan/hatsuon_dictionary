import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../styles/Home.module.css'
import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import Router from 'next/router'

import Link from 'next/link'

// interface IndexProps {
//   todos: Array<Todo>
// }


import MissingPageImage from "../Images/404Image.svg"


export default function NotFoundPage(props: any) {
  
    //TODO add some styling to the website.

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
        
        
        <p>404</p>
        <Image alt="A sad pitch diagram guy shrugging :(" width={30} height={15} src={MissingPageImage}></Image>
        <p>
            Oops! Seems like the page you are looking for doesn&apos;t exist.
            Try typing the link again or go the <Link href="/"> home page</Link>
        </p>
    </main>
  )
}
