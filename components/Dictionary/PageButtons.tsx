
// MUI/React Imports
import {IconButton, Button, Stack} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// Next.js imports
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
 * Generates a button layout which corresponds to the number of pages returned by specific query.
 * @param entriesCount 
 * @param pageEntries 
 * @param currentPage 
 * @param query The current query given by the user
 * @returns Button Layout as a JSX Element
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