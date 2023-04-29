// React/MUI
import {useState} from "react"
import {IconButton} from '@mui/material';
import { Menu } from '@mui/icons-material';
// Next.js
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router';

import links from "../../links.json"

// Used for styling
const styling: any[string] = {
    "header": "w-full mx-4 py-4",
    "websiteIcon": "w-1/2 flex text-3xl",
    "headerLink": "hidden md:inline",
    "menuButton": "md:hidden px-8"
};

export default function Header() {
    
    const router = useRouter(); 

    return (
        <header className={styling.header}>
            
            <nav className="w-full flex items-center">
                
                {/* Website Icon */}
                <Link className={styling.websiteIcon} href={links.internalLinks.home}>Hatsuon</Link>
                
                {/* Header Page Links */}
                <div className="w-1/2 flex justify-end gap-x-6 space-around">

                    <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.home ? "underline" : ""}`}
                    href={links.internalLinks.home}>Home</Link>

                    <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.dictionary ? "underline" : ""}`} 
                    href={links.internalLinks.dictionary}>Dictionary</Link>

                    <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.pitchGenerator ? "underline" : ""}`}
                    href={links.internalLinks.pitchGenerator}>Pitch Accent Diagram Generator</Link>

                    <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.contact ? "underline" : ""}`}
                    href={links.internalLinks.contact}>Contact</Link>
                    
                    {/* Menu Button (Meant for mobile/small screens) */}
                    <IconButton className={styling.menuButton} size="large" disableRipple={true}>
                        <Menu/>
                    </IconButton>
                </div>
            </nav>
        </header>
    )
}