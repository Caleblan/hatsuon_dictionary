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
                    <Link href={links.internalLinks.home}>Hatsuon</Link>
                </div>
                <div className="w-1/2 flex justify-end gap-x-6 space-around">

                    <span className={`lg:visible sm:invisible ${router.asPath == links.internalLinks.home ? "underline" : ""}`}>
                        {/* <Link href="/dictionary">Dictionary</Link> */}
                        <Link href={links.internalLinks.home}>Home</Link>
                    </span>

                    <span className={`lg:visible sm:invisible ${router.asPath == links.internalLinks.dictionary ? "underline" : ""}`}>
                        {/* <Link href="/dictionary">Dictionary</Link> */}
                        <Link href={links.internalLinks.dictionary}>Dictionary</Link>
                    </span>

                    <span className={`lg:visible sm:invisible ${router.asPath == links.internalLinks.pitchGenerator ? "underline" : ""}`}>
                        {/* <Link href="/dictionary">Dictionary</Link> */}
                        <Link href={links.internalLinks.pitchGenerator}>Pitch Accent Diagram Generator</Link>
                    </span>

                    <span className={`lg:visible sm:invisible ${router.asPath == links.internalLinks.contact ? "underline" : ""}`}>
                        {/* <Link href="/dictionary">Dictionary</Link> */}
                        <Link href={links.internalLinks.contact}>Contact</Link>
                    </span>
                    

                    <IconButton className="px-8 lg:hidden md:visible" size="large" disableRipple={true}>
                        <Menu/>
                    </IconButton>

                </div>
                
            </nav>
        </header>
    )
}