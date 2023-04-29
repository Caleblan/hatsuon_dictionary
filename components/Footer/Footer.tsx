// React/MUI
import React, {useState} from "react"
import {Instagram, Twitter, LinkedIn, Facebook, GitHub } from '@mui/icons-material';
// Next.js
import Image from 'next/image'
import Link from 'next/link'

// Custom images
import BuyMeACoffeLogo from "./SVGs/bmc-full-logo.svg";
import BuyMeACoffeeButton from "./SVGs/black-button.png";
import DiscordLogo from "./SVGs/Discord-Logo+Wordmark-White.svg"
import PatreonLogoWhite from "./SVGs/Digital-Patreon-Wordmark_White1.svg";

import links from "../../links.json";




// Used for styling
const styling: any[string] = {
    "footer": "bg-neutral-800 text-neutral-100 px-8 py-2 mt-auto",
    "footerColumns": "flex flex-wrap justify-around",
    "footerLink": "flex flex-row justify-start items-center no-underline",
    "column": "w-fit flex flex-col",
    "columnHeader": "my-4 text-xl",
    "list": "pl-4 [&>*]:text-xl [&>*]:mb-1.5",
    "copyright": "font-bold text-xs"
}


export default function Footer(): JSX.Element {

    let date: Date = new Date();

    return (
        <footer className={styling.footer}>

            {/* Links */}
            <div className={styling.footerColumns}>
                
                {/* About */}
                <nav className={styling.column}>
                    <span className={styling.columnHeader}>About</span>
                    <ul className={styling.list}>
                        <Link className={styling.footerLink} href={links.internalLinks.license} target="_blank" rel="noopener noreferrer">
                            License
                        </Link>
                    </ul>
                </nav>
                    
                {/* Social Links */}
                <nav className={styling.column}>
                    <span className={styling.columnHeader}>Social</span>
                    <ul className={styling.list}>
                        <Link className={styling.footerLink} href={links.externalLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <LinkedIn className="Icon"/>
                            LinkedIn
                        </Link>
                        <Link className={styling.footerLink} href={links.externalLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="Icon"/>
                            Facebook
                        </Link> 
                        <Link className={styling.footerLink} href={links.externalLinks.discord} target="_blank" rel="noopener noreferrer">
                            <Image src={DiscordLogo} alt="Discord Logo" width= {110}/>
                        </Link>
                    </ul>
                </nav>

                {/* Support Links */}
                <nav className={styling.column}>
                    <h3 className={styling.columnHeader}>Support</h3>
                    <ul className={styling.list}>
                        {/* <a className="FooterLink" href={links.externalLinks.patreon} target="_blank" rel="noopener noreferrer">
                            <img src={PatreonLogoWhite} style={{width: "5em"}}/>
                        </a> */}
                        
                        <Link className={styling.footerLink} href={links.externalLinks.coffee} target="_blank" rel="noopener noreferrer">
                            <Image src={BuyMeACoffeeButton} alt="Buy me a Coffee" width={175}/>
                        </Link>
                    </ul>
                </nav>

                {/* Contact Links */}
                {/* <nav className="Column">
                    <h3 className="ColumnHeader">Contact</h3>
                    <ul>
                        <input></input>
                        Just place holder for now
                    </ul>
                </nav>      */}
            
            </div>
            <span className={styling.copyright}>
                Copywright © {date.getFullYear()} Caleb Landry. All Rights Reserved.
            </span>
        </footer>
    );
}