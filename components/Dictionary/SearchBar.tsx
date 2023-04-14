// React/MUI
import {useState} from "react"
import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
// Next.js
import Link from 'next/link'

interface input {
    query: string | null,
}

export default function DictionaryEntry(props:input): JSX.Element {
    
    //Keep track of query
    const [query, setQuery] = useState<string>(props.query == null ? "": props.query);

    return (
        <form className="flex justify-center items-center mb-8" action="/api/searchDictionary" method="get">
            <TextField className="w-full" label="Enter Text Here" defaultValue={query} autoFocus={true} onChange={event => setQuery(event.target.value)}/>

            <Link href={
              // Go back to dictionary homepage if nothing entered
              query == "" ? {pathname: '/dictionary'}
              // If new submission, go to first page results
              : {pathname: '/dictionary/search', query: {query, page: 1}}
            }>
              
              {/* loading={loading} onChange={() => setLoading((value => !value))} */}
              <LoadingButton variant="outlined"  type="submit">
                <SearchIcon/>
              </LoadingButton>
            </Link>
          </form>
    )
}