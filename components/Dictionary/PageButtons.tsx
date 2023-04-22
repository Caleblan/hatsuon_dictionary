
// MUI/React Imports
import {IconButton, Button, Stack} from '@mui/material';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material/';
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
        <Stack className="w-full flex justify-center" direction="row" spacing={2}>
            
            <Link className={`${currentPage == 1 ? 'pointer-events-none' : ''}`} 
            href={{pathname: '/dictionary/search', query: {query , page: currentPage == 1 ? 1 : currentPage-1}}}>
              <IconButton className="flex justify-center" 
              disabled={currentPage == 1 ? true: false}>
                <ArrowBackIos/>
              </IconButton>
            </Link>
            {generatePageButtons(entriesCount, pageEntries, currentPage, query)}
            
            <Link className={`${currentPage == Math.ceil(entriesCount / pageEntries) ? 'pointer-events-none' : ''}`} 
            href={{pathname: '/dictionary/search', query: {query , page: currentPage == Math.ceil(entriesCount / pageEntries) ? Math.ceil(entriesCount / pageEntries) : Number(currentPage)+1}}}>
              <IconButton
              disabled={currentPage == Math.ceil(entriesCount / pageEntries) ? true: false}>
                <ArrowForwardIos/>
              </IconButton>
            </Link>
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

    console.log("Here", entriesCount, pageEntries, entriesCount/pageEntries)
    
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