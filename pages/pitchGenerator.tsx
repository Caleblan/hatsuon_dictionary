import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import AttributionIcon from '@mui/icons-material/Attribution';
import Tooltip from '@mui/material/Tooltip';

import ShareAlikeSVG from "../Images/Share_Alike.svg";

import PitchGenerator from '../components/DiagramGenerator/PitchGenerator';

export default function Home() {
  return (
    <>
    {/* Metadata */}
      <Head>
        <title>Pitch Accent Diagram Generator | Hatsuon</title>
        {/* <title>{diagramText === "" ? "Hatsuon: Pitch Accent Diagram Generator" : `${diagramText} | Hatsuon`}</title> */}
        <meta name="description" content="Create and Download Japanese Pitch Accent Diagrams" />
      </Head>

      {/* className={styles.main} */}
      <main>
        <div className="w-3/4 h-full text-justify flex flex-col gap-y-4">
            <PitchGenerator/>

            <p>
              This software allows users to create pitch accent diagrams which can be used in educational content.
              To begin creating the Pitch Accent Diagrams, start by entering the word you want to display in the
              input text box. Then put your pitch pattern into the adjacent box (using either 0/l as downsteps and
              1/h as upsteps). Since you must manually enter the pitch accent for the word, this applications requires a base understanding
              of pitch accent.
            </p>

            <p>
              The purpose of this application is aimed at helping both Japanese language educators and learners to study 
              Pitch Accent. Following this, I have tried to make the license as open as possible.
              All generated diagrams can be used freely for both commercial/non-commercial use and can also be modified and distributed.
              However, any pitch diagrams created through the use of はつおん Pitch Generator must follow the rules outlined below: 
            </p>

            <ul>
              <li className="flex" style={{marginBottom: "0.75em"}}>
                <Tooltip title="Attributation" placement="left">
                  <AttributionIcon className=" mr-2" fontSize="large" style={{width: "2rem"}}/>
                </Tooltip>

                <p className="align-middle mr-2">
                  Make sure to include both the current website URL as well the site&apos;s creator &quot;Caleb Landry&quot; in the content the diagram is to be used in.
                </p>

              </li>

              <li className="flex">
                <Tooltip title="Share-Alike" placement="left">
                  {/* <img src={ShareAlikeSVG} style={{width: "1.4em", height: "100%", paddingLeft: "0.18em", userSelect: "none"}}/> */}
                  <Image className="ml-0.5 mr-2" width={28} height={28} src={ShareAlikeSVG} alt="Picture of the author"/>  
                </Tooltip>

                <p className=" align-middle mr-2">
                  Any derivation of the diagrams created using the pitch generator must also be distributed under the same license specified here.
                </p>
                
              </li>
            </ul>
              
              <p>
                Note that this license does not apply to the software used to create the pitch diagrams which is copywrited by creator of the site.
              </p>
          </div>
      </main>
    </>
  )
}
