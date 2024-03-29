
// MUI/React Imports
import React, {useState, useEffect} from "react";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
// Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// Next.js imports
import Link from 'next/link';
import {useRouter} from "next/router";


interface props {
    entriesCount:number, 
    pageEntries:number, 
    currentPage:number,
    query: string
};

export default function DictionaryFooter({entriesCount, pageEntries, currentPage, query}: props): JSX.Element {

    const router = useRouter()

    const [page, updatePage] = useState<number>(Number(currentPage))

    useEffect(() => {
        updatePage(currentPage)
    }, [currentPage])


    return (
        
        <Stack className="w-full flex justify-center items-center mt-4" direction="row" spacing={2}>
            
            <Tooltip title="Go to First Page" placement="bottom">
                <Link className={`${currentPage == 1 ? 'pointer-events-none' : ''}`} 
                href={{pathname: '/dictionary/search', query: {query , page: 1}}}>
                    <IconButton className="flex justify-center" disabled={currentPage == 1 ? true: false}>
                        <SkipPreviousIcon/>
                    </IconButton>
                </Link>
            </Tooltip>

            <Tooltip title="Go to Previous Page" placement="bottom">
                <Link className={`${currentPage == 1 ? 'pointer-events-none' : ''}`} 
                href={{pathname: '/dictionary/search', query: {query , page: currentPage == 1 ? 1 : currentPage-1}}}>
                    <IconButton className="flex justify-center" disabled={currentPage == 1 ? true: false}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                </Link>
            </Tooltip>
                
            <span className="flex items-center align-middle">
                <TextField className="w-14 mr-2" size="small" value={page}
                    InputProps={{spellCheck: false}} inputProps={{ style: {textAlign: 'center', height: "2em", padding: "0.1em 0em 0.1em 0em"} }}
                    onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        // Non-number character
                        let value: string = ''

                        // If valid input
                        if(event.target.value.match(/^[0-9]+$/) == null)
                        {
                            value = event.target.value.replace(/^[0-9]+$/, '').substring(0,3);
                        }
                        else{
                            value = event.target.value.substring(0,3);
                        }

                        updatePage(Number(value))
                }}
                
                onKeyDown={(event:any) => {
                    console.log(`Pressed keyCode ${event.key}`);
                    if (event.key === 'Enter') {
                        // Do code here
                        event.preventDefault();

                        if(page <= Math.ceil(entriesCount / pageEntries) && page >= 1)
                        {
                            router.push({ pathname: "/dictionary/search", query: {query, page}});
                        }
                    }
                }}/>
                
                <span className="min-w-fit"> {`of ${Math.ceil(entriesCount/pageEntries)}`} </span>

            </span>
            
            <Tooltip title="Go to Next Page" placement="bottom">
                <Link className={`${currentPage == Math.ceil(entriesCount / pageEntries) ? 'pointer-events-none' : ''}`} 
                href={{pathname: '/dictionary/search', 
                query: {query , page: currentPage == Math.ceil(entriesCount / pageEntries) ? Math.ceil(entriesCount / pageEntries) : Number(currentPage)+1}}}>
                    <IconButton className="flex justify-center" disabled={currentPage == Math.ceil(entriesCount / pageEntries) ? true: false}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </Link>
            </Tooltip>

            <Tooltip title="Go to Last Page" placement="bottom">
                <Link className={`${currentPage == Math.ceil(entriesCount / pageEntries) ? 'pointer-events-none' : ''}`} 
                href={{pathname: '/dictionary/search', query: {query , page: Math.ceil(entriesCount / pageEntries)}}}>
                    <IconButton className="flex justify-center" disabled={currentPage == Math.ceil(entriesCount / pageEntries) ? true: false}>
                        <SkipNextIcon/>
                    </IconButton>
                </Link>
            </Tooltip>

        </Stack>  
    )
}