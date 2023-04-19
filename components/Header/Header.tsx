
// import { useRouter } from 'next/router'



import {useState} from "react"
// Components
import Image from 'next/image'
import Link from 'next/link'
import { SvgIcon } from '@mui/material';
import Button from '@mui/material/Button';
//Icons
import { Menu } from '@mui/icons-material';

import links from "../../links.json"


export default function Header() {
    
    return (
        <header className="w-full mx-4 my-4">
            <nav className="w-full flex items-center">
                <div className="w-1/2 flex text-3xl">
                    <Link href={links.internalLinks.pitchGenerator}>Hatsuon</Link>
                </div>
                <div className="w-1/2 flex justify-end space-around">

                    <div className="md:visible invisible flex gap-x-4">
                        {/* <Link href="/dictionary">Dictionary</Link> */}
                        <Link href={links.internalLinks.pitchGenerator}>Pitch Accent Diagram Generator</Link>
                    </div>
                    <Button className="md:invisible visible">
                        <SvgIcon>
                            <Menu/>
                        </SvgIcon>
                    </Button>
                </div>
                
            </nav>
        </header>
    )
}