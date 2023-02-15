
// import { useRouter } from 'next/router'



import {useState} from "react"
// Components
import Image from 'next/image'
import Link from 'next/link'
import { SvgIcon } from '@mui/material';
import Button from '@mui/material/Button';
//Icons
import { Menu } from '@mui/icons-material';


export default function Header() {
    
    return (
        <nav className="w-full flex items-center mx-4">
            <div className="w-1/2 flex text-3xl">
                <Link href="/">Header</Link>
            </div>
            <div className="w-1/2 flex justify-end space-around m:invisible">

                <Link href="/dictionary">Dictionary</Link>
                <Link href="/pitchGenerator">Pitch Accent Diagram Generator</Link>

                <Button>
                    <SvgIcon>
                        <Menu/>
                    </SvgIcon>
                </Button>
            </div>
            
        </nav>
    )
}