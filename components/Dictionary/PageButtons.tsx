
import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../../styles/Home.module.css'
import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';

import {Button, Stack} from '@mui/material';
import Link from 'next/link'


interface props {
    entriesCount:number, 
    pageEntries:number, 
    currentPage:number,
    query: string
}

export default function PageButtons({entriesCount, pageEntries, currentPage, query}: props): JSX.Element {

    return (
        <Stack className="flex" direction="row" spacing={2}>
            {generatePageButtons(entriesCount, pageEntries, currentPage, query)}
        </Stack>
    )
}

/**
 * 
 * @param entriesCount 
 * @param pageEntries 
 * @param currentPage 
 * @param query 
 * @returns 
 */
function generatePageButtons(entriesCount:number, pageEntries:number, currentPage:number, query:string): JSX.Element[] {
    
    let pageLinks: JSX.Element[] = [];
    
    //Create page index buttons
    for(let i = 1; i < Math.ceil(entriesCount /  pageEntries) + 1; i++) {
        pageLinks.push(
          <Link className={`${currentPage == i ? 'pointer-events-none' : ''}`} href={{pathname: '/dictionary/search', query: {query , page: i}}}>
            <Button className="inline" variant="outlined" disabled={currentPage == i ? true : false}>
              {i}
            </Button>
          </Link>
        ) 
    }

    return pageLinks;
}