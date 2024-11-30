"use client"

// Next.js
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation';

import links from "../../links.json"

import HamburgerIcon from "./HamburgerIcon";

// Used for styling
const styling: any[string] = {
    "header": "w-full py-4 px-2",
    "nav": "w-full flex items-center",
    "iconContainer": "w-1/2",
    "websiteIcon": "w-fit flex text-3xl",
    "headerPageLinks": "w-1/2 h-max flex justify-end gap-x-6 space-around items-stretch",
    "headerLink": "hidden md:inline",
    "hamburger": "inline md:hidden m-4",
};

export default function Header(): JSX.Element  {
    
    const pathname: string = usePathname() || ""; 

    return (
        <header className={styling.header}>
            
            <nav className={styling.nav}>
                
                {/* Website Icon */}
                <span className={styling.iconContainer}>
                    <Link className={styling.websiteIcon} href={links.internalLinks.dictionary}>Hatsuon</Link>
                </span>

                {/* Header Page Links */}
                <ul className={styling.headerPageLinks}>


                    {/* <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.home ? "underline" : ""}`}
                    href={links.internalLinks.home}>Home</Link> */}
                    
                    
                    <li>
                        <Link className={`${styling.headerLink} ${pathname == links.internalLinks.dictionary ? "underline" : ""}`} 
                        href={links.internalLinks.dictionary}>Dictionary</Link>
                    </li>

                    <li>
                    
                        <Link className={`${styling.headerLink} ${pathname == links.internalLinks.pitchGenerator ? "underline" : ""} `}
                        href={links.internalLinks.pitchGenerator}>Pitch Accent Diagram Generator</Link>
                    </li>

                    <li>
                    {/* <Link className={`${styling.headerLink} ${router.asPath == links.internalLinks.contact ? "underline" : ""}`}
                    href={links.internalLinks.contact}>Contact</Link> */}
                    </li>
                    
                    {/* Menu Button (Meant for mobile/small screens) */}

                    <li>
                    {/* <IconButton className={styling.menuButton} size="large" disableRipple={true}>
                        <Menu/>
                    </IconButton> */}
                    </li>
                    
                </ul>

                <div className="md:hidden">
                <HamburgerIcon className={styling.hamburger}/>
                </div>
            </nav>
        </header>
    )
}