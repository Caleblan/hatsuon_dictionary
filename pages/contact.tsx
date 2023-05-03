// React/MUI
import React, {useState, useEffect} from "react"
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
// Next.js
import Link from 'next/link'

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import MailIcon from '@mui/icons-material/Mail';
import SubjectIcon from '@mui/icons-material/Subject';
import SendIcon from '@mui/icons-material/Send';


export default function Contact() {
  

      //ONly here so that when back button pressed, the query is also set as the previous one
    // const [inputs, updateInputs] = useState<object>({});
    
    const [name, setName] = useState<string>("");
    const [organization, setOrganization] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [emailValid, setEmailValid] = useState<boolean>(false);

    useEffect(() => {
        setEmailValid(() => /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/.test(email))
    }, [email])

    
    const handleSubmit = async (event:any) => {
        
        event.preventDefault();
    
        // let isValidForm = handleValidation();
        console.log("here", name, email, subject, message);
     
          const res = await fetch("/api/contact", {
            body: JSON.stringify({
              email: email,
              name: name,
              subject: subject,
              message: message,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
    
          const { error } = await res.json();
          if (error) {
            console.log(error);
            return;
          }

        console.log(name, email, subject, message);
      };


    return (
    <main>

        <h1 className="text-6xl mb-6 font-bold">Contact Us</h1>

        <form className="w-1/2 flex flex-col gap-y-4" method="post" onSubmit={handleSubmit} >

            <FormControl required={true} className="w-full" variant="outlined">
                <InputLabel htmlFor="nameInput">Name</InputLabel>
                <OutlinedInput
                    id="nameInput"
                    autoFocus={true}
                    autoComplete="name"
                    onChange={(event:any) => setName(event.target.value)}
                    // type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <PersonIcon/>
                    </InputAdornment>
                    }
                    label="Name"
                />
            </FormControl>

            <FormControl className="w-full" variant="outlined">
                <InputLabel htmlFor="organizationInput">Organization</InputLabel>
                <OutlinedInput id="organizationInput" label="Organization" autoComplete="organization"
                    placeholder="i.e. Google"
                    onChange={(event:any) => setOrganization(event.target.value)}
                    // type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <BusinessIcon/>
                    </InputAdornment>
                    }
                />
            </FormControl>

            <FormControl className="w-full" required={true} variant="outlined">
                <InputLabel htmlFor="emailInput">Email</InputLabel>
                <OutlinedInput id="emailInput" type="email" label="Email" autoComplete="email"
                error={emailValid}
                onChange={(event:any) => setEmail(event.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <MailIcon/>
                    </InputAdornment>
                }
                />
            </FormControl>

            <FormControl className="w-full" required={true} variant="outlined">
                <InputLabel htmlFor="subjectInput">Subject</InputLabel>
                <OutlinedInput id="subjectInput" label="Subject"
                    onChange={(event:any) => setSubject(event.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                        <SubjectIcon/>
                    </InputAdornment>
                    }
                />
            </FormControl>

            <FormControl className="w-full" required={true} variant="outlined">
                <InputLabel htmlFor="messageInput">Message</InputLabel>
                <OutlinedInput id="messageInput" label="Message" multiline rows={8}
                    onChange={(event:any) => setMessage(event.target.value)}
                />
            </FormControl>

            <Button className="w-1/3" variant="contained" type="submit"
            endIcon={<SendIcon/>}>
                Send
            </Button>

            <p>This information is required to know how to contact you. This information will
                remain private and will not be sold or used for promotional materials. 
            </p>

        </form>
    </main>
    )
}


