// import { useFuriPairs, Wrapper, Pair, Text, Furi } from 'react-furi'
const { fit } = require('furigana');


interface furigana {
  word: string | null,
  reading: string,
  furi ?: string,
  showFuri: boolean
}


export default function FuriganaWord({ word, reading, furi, showFuri }: furigana): JSX.Element {


    // If is a valid input, then we add furigana
    let furigana: any = word ? fit(word, reading, { type: 'object' }) : fit(reading, reading, { type: 'object' })

    console.log(furigana)

    // const pairs: any = useFuriPairs(word, reading, furi);

    return (
        // <Wrapper style={{border: "1px solid black", borderRadius: "4px", padding: ".5rem", display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
        // {
        //     pairs.map(([furiText, text] : string[], index:number) => (
        //         <Pair key={text + index}>
        //             {showFuri && <Furi style={{color: 'coral'}}>{furiText}</Furi>}
        //             <Text style={{color: 'blue'}}>{text}</Text>
        //         </Pair>
        // ))
        // }
        // </Wrapper>
        <>
        {word}
        </>
  );
}

