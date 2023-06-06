// React/MUI
import React, {useState, useEffect} from "react"
// import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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


export default function DictionaryEntry({query, className}:input): JSX.Element {
  
  const languageTags: string[][] = [["eng", "🇺🇸"], ["dut", "🇳🇱"], ["ger", "🇩🇪"], 
                                    ["rus", "🇷🇺"], ["fre", "🇫🇷"], ["spa", "🇪🇸"], 
                                    ["slv", "🇸🇮"], ["hun", "🇭🇺"]];


  const [currentFlag, setCurrentFlag] = useState<string[]>(languageTags[0]);

  const [searchQuery, updateSearchQuery] = useState<string>(query)

  useEffect(() => {
    updateSearchQuery(query)
  }, [query]);

  // const startAdornment: JSX.Element = (              
  //     <Twemoji options={{ className: 'w-full' }}>
  //         {currentFlag[1]}
  //     </Twemoji>
  // );

  // let menuItems: JSX.Element[] = languageTags.map( (languageTag:string[]) => {
  //   return (
  //     <MenuItem value={languageTag}>
  //       <Twemoji options={{ className: 'w-full' }}>
  //         {languageTag[1]}
  //       </Twemoji>
  //     </MenuItem>
  //   );
  // });




  // const flagSelector: JSX.Element = (
  //   <InputAdornment className="h-1/2" position="start">
  //     <FormControl sx={{ m: 1, minWidth: 80 }}>
  //     <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
  //     <Select
  //       labelId="demo-simple-select-autowidth-label"
  //       id="demo-simple-select-autowidth"
  //       value={currentFlag[1]}
  //       // onChange={setCurrentFlag}
  //       autoWidth
  //     >
  //       {menuItems}
  //     </Select>
  //   </FormControl>
  // </InputAdornment>
  // );

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
            // startAdornment={flagSelector}
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


