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

import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import MailIcon from '@mui/icons-material/Mail';
import SubjectIcon from '@mui/icons-material/Subject';


export default function contact(): JSX.Element {
  

      //ONly here so that when back button pressed, the query is also set as the previous one
    // const [inputs, updateInputs] = useState<object>({});

    return (
    <main>
        <form className="w-1/2" action="/api/contactForm" method="post">
            <FormControl required={true} className="w-full mt-4" variant="outlined">
            <InputLabel htmlFor="nameInput">Name</InputLabel>
            <OutlinedInput
                id="nameInput"
                autoFocus={true}
                autoComplete="name"
                onChange={(event:any) => {}}
                // type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <PersonIcon/>
                </InputAdornment>
                }
                label="Name"
            />
            </FormControl>

            <FormControl className="w-full mt-4" variant="outlined">
            <InputLabel htmlFor="organizationInput">Organization</InputLabel>
            <OutlinedInput
                id="organizationInput"
                autoComplete="organization"
                onChange={(event:any) => {}}
                
                // type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <BusinessIcon/>
                </InputAdornment>
                }
                label="Organization"
            />
            </FormControl>

            

            <FormControl className="w-full mt-4" required={true} variant="outlined">
            <InputLabel htmlFor="emailInput">Email</InputLabel>
            <OutlinedInput
                id="emailInput"
                autoComplete="email"
                onChange={(event:any) => {
                
                }}
                
                // type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <MailIcon/>
                </InputAdornment>
                }
                label="Email"
            />
            </FormControl>

            <FormControl className="w-full mt-4" required={true} variant="outlined">
            <InputLabel htmlFor="subjectInput">Subject</InputLabel>
            <OutlinedInput
                id="subjectInput"
                // onChange={(event:any) => {updateInputs((inputs:any) => {...inputs, ...{subject: event.target.value}})}}
                endAdornment={
                <InputAdornment position="end">
                    <SubjectIcon/>
                </InputAdornment>
                }
                label="Subject"
            />
            </FormControl>

            <FormControl required={true} className="w-full mt-4" variant="outlined">
            <InputLabel htmlFor="messageInput">Message</InputLabel>
            <OutlinedInput
                id="messageInput"
                multiline 
                rows={8}
                onChange={(event:any) => {
                }}
                label="Message"
            />
            </FormControl>

        </form>
    </main>
    )
}


