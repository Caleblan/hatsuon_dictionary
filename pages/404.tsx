import Head from 'next/head'
import Image from 'next/image'
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
    <main>
        
        <span className="font-bold text-6xl">404</span>
        <Image className="object-contain w-3/4 h-3/4" alt="A sad pitch diagram guy shrugging :(" src={MissingPageImage}></Image>
        <p>
            Oops! Seems like the page you are looking for doesn&apos;t exist.
            Try typing the link again or go the <Link className="underline" href="/"> home page</Link>
        </p>
    </main>
  )
}
