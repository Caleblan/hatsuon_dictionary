import { Metadata } from 'next'
// Next.js 
import Image from 'next/image'
import Link from 'next/link'

import MissingPageImage from "../Images/404Image.svg"

import '../styles/globals.css'


export default function NotFound() {
    
    return (
        <main>
        {/* <> */}
            <span className="font-bold text-6xl">404</span>
            <Image className="object-contain w-3/4 h-3/4" alt="A sad pitch diagram guy shrugging :(" src={MissingPageImage}></Image>
            <p>
                {`Oops! Seems like the page you are looking for doesn't exist.\n Try typing the link again or go the`}
                <Link className="underline" href="/"> home page</Link>
            </p>
        </main>
        
    );
}