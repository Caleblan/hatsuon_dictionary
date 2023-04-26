// React/MUI
import React, {useState, useEffect} from "react"
// import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
// Next.js
import Link from 'next/link'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';

interface input {
    query: string,
}


export default function DictionaryEntry({query}:input): JSX.Element {
  

      //ONly here so that when back button pressed, the query is also set as the previous one
    const [searchQuery, updateSearchQuery] = useState<string>(query)


  useEffect(() => {
    updateSearchQuery(query)
  }, [query]);

    return (
      <form>
        <FormControl className="w-full mt-4" variant="outlined">
          <InputLabel htmlFor="searchbar">Search Dictionary</InputLabel>
          <OutlinedInput
            id="searchbar"
            value={searchQuery}
            autoComplete='off'
            autoFocus={true}
            onChange={(event:any) => {
              updateSearchQuery(event.target.value)
            }}
            // type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                {/* <Divider></Divider> */}
                
                <Link href={
                  // Go back to dictionary homepage if nothing entered
                  searchQuery == "" ? {pathname: '/dictionary'}
                  // If new submission, go to first page results
                  : {pathname: '/dictionary/search', query: {query: searchQuery, page: 1}}}>
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                    type="submit"
                  >
                    <SearchIcon/>
                  </IconButton>
                </Link>
              </InputAdornment>
            }
            label="Search Dictionary"
          />
        </FormControl>
        </form>
    )
}


