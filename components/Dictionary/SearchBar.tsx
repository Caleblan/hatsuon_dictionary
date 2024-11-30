// React/MUI
import React, {useState, useEffect} from "react"
// import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// Next.js
import Link from 'next/link'

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


// import Box from '@mui/material/Box';
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
import Button from '@mui/material/Button';

// import Twemoji from 'react-twemoji';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


type input = {
    query: string,
    className : string
}


export default function SearchBar({query, className}:input): JSX.Element {

  const [searchQuery, updateSearchQuery] = useState<string>(query)

  useEffect(() => {
    updateSearchQuery(query)
  }, [query]);

  const patternTypes: string[][] = 
  [["平板", "へいばん"], ["中高", "なかだか"], ["頭高", "あたまだか"], ["尾高", "おだか"]];

  // Used to keep track of current filters
  const [pitchFilters, changePitchFilters] = useState<{}>(
    {"へいばん": false, "なかだか": false, "あたまだか": false, "おだか": false}
  );

  // function updatePitchFilter

  let key: number = 0;

  const pitchFiltersCheckboxes: JSX.Element[] = patternTypes.map((patternType:string[]) => {
    return (
      <FormControlLabel className="select-none" key={key++} label={patternType[1]} control={<Checkbox/>}/>
    )
  });

    return (
      <form className={className}>
        <FormControl className="w-full" variant="outlined">
          <InputLabel htmlFor="searchbar">Search Dictionary</InputLabel>
          <OutlinedInput
            id="searchbar"
            value={searchQuery}
            autoComplete='off'
            autoFocus={true}
            onChange={(event:any) => {
              updateSearchQuery(event.target.value)
            }}
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
        {/* <div className="w-full flex items-center">
          <span>Pitch Accent Filters</span>
          <Box sx={{ display: 'flex', ml: 3 }}>
           {pitchFiltersCheckboxes}
          </Box>
        </div> */}
        
      </form>
    )
}


