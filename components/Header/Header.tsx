// React/MUI
import {useState} from "react"
import {IconButton} from '@mui/material';
import { Menu } from '@mui/icons-material';
// Next.js
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router';

import links from "../../links.json"




export default function Header() {
    
    const router = useRouter(); 

    return (
        <header className="w-full mx-4 my-4">
            <nav className="w-full flex items-center">
                <div className="w-1/2 flex text-3xl">
                    <Link href={links.internalLinks.pitchGenerator}>Hatsuon</Link>
                </div>
                <div className="w-1/2 flex justify-end gap-x-6 space-around align-middle">

                    <span className={`md:visible invisible ${router.asPath == links.internalLinks.home ? "underline" : ""}`}>
                        {/* <Link href="/dictionary">Dictionary</Link> */}
                        <Link href={links.internalLinks.home}>Home</Link>
                    </span>

                    <span className={`md:visible invisible ${router.asPath == links.internalLinks.pitchGenerator ? "underline" : ""}`}>
                        {/* <Link href="/dictionary">Dictionary</Link> */}
                        <Link href={links.internalLinks.pitchGenerator}>Pitch Accent Diagram Generator</Link>
                    </span>

                    {}
                    <IconButton className="px-8 md:hidden visible" size="large" disableRipple={true}>
                        <Menu/>
                    </IconButton>

                </div>
                
            </nav>
        </header>
    )
}