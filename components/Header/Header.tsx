// React/MUI
import {useState} from "react"
import MenuIcon from '@mui/icons-material/Menu';
// Next.js
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router';

import links from "../../links.json"

// Used for styling
const styling: any[string] = {
    "header": "w-full p-4",
    "nav": "w-full flex items-center",
    "websiteIcon": "w-1/2 flex text-3xl",
    "headerPageLinks": "w-1/2 flex justify-end gap-x-6 space-around",
    "headerLink": "hidden md:inline",
    "menuButton": "inline md:hidden px-4"
};

export default function Header() {
    
    const router = useRouter(); 

    return (
        <header className={styling.header}>
            
            <nav className={styling.nav}>
                
                {/* Website Icon */}
                <Link className={styling.websiteIcon} href={links.internalLinks.home}>Hatsuon</Link>
                
                {/* Header Page Links */}
                <div className={styling.headerPageLinks}>

                    <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.home ? "underline" : ""}`}
                    href={links.internalLinks.home}>Home</Link>

                    <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.dictionary ? "underline" : ""}`} 
                    href={links.internalLinks.dictionary}>Dictionary</Link>

                    <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.pitchGenerator ? "underline" : ""}`}
                    href={links.internalLinks.pitchGenerator}>Pitch Accent Diagram Generator</Link>

                    <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.contact ? "underline" : ""}`}
                    href={links.internalLinks.contact}>Contact</Link>
                    
                    {/* Menu Button (Meant for mobile/small screens) */}
                    {/* <IconButton className={styling.menuButton} size="large" disableRipple={true}>
                        <Menu/>
                    </IconButton> */}
                </div>
            </nav>
        </header>
    )
}