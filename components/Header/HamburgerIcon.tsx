// React/MUI
import {useState} from "react"
import MenuIcon from '@mui/icons-material/Menu';
// Next.js
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router';

import links from "../../links.json"

import styles from "../../styles/Hamburger.module.css"

// Used for styling
const styling: any[string] = {
};


interface props {
    className: string
}



export default function HamburgerIcon({className}: props) {

    console.log(className)

    return (
        <div className={`${styles.menuToggle} ${className}`}>

            <input type="checkbox" name="" id=""></input>

            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}