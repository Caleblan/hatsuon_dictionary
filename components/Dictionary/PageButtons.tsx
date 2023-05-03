
// MUI/React Imports
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
        <Stack className="w-full flex justify-center mt-4" direction="row" spacing={2}>
            
            <Link className={`${currentPage == 1 ? 'pointer-events-none' : ''}`} 
            href={{pathname: '/dictionary/search', query: {query , page: currentPage == 1 ? 1 : currentPage-1}}}>
              <IconButton className="flex justify-center" 
              disabled={currentPage == 1 ? true: false}>
                <ArrowBackIosIcon/>
              </IconButton>
            </Link>
            {generatePageButtons(entriesCount, pageEntries, currentPage, query)}
            
            <Link className={`${currentPage == Math.ceil(entriesCount / pageEntries) ? 'pointer-events-none' : ''}`} 
            href={{pathname: '/dictionary/search', query: {query , page: currentPage == Math.ceil(entriesCount / pageEntries) ? Math.ceil(entriesCount / pageEntries) : Number(currentPage)+1}}}>
              <IconButton
              disabled={currentPage == Math.ceil(entriesCount / pageEntries) ? true: false}>
                <ArrowForwardIosIcon/>
              </IconButton>
            </Link>
        </Stack>
    )
}

/**
 * Generates a button layout which corresponds to the number of pages returned by specific query.
 * @param {number} entriesCount The total number of results returned by the query.
 * @param {number} pageEntries Number of entries per page.
 * @param {number} currentPage The current page that is selected (assuming valid value).
 * @param {string} query The current query given by the user
 * @returns {JSX.Element} Button Layout as a JSX Element
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