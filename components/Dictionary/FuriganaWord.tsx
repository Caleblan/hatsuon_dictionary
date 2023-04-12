const { fit } = require('furigana');

interface furigana {
  kanji: string | null,
  kana: string
}

export default function FuriganaWord({kanji, kana}: furigana) {
    
    console.log("We are here")


    // If is a valid input, then we add furigana
    if(kanji) {
        var furigana = fit(kanji, kana, { type: 'object' })
    }
    else{
        var furigana = fit(kana, kana, { type: 'object' })
    }

    return (
            <ruby className="text-3xl">
            {
                furigana.map((value:any) => { 
                    return value.w != value.r ? 
                        // <rb>{value.w}<rp>(<rt>{value.r}</rt>)</rp></rb>
                        <><rb>{value.w}</rb><rt className="text-sm mb-4">{value.r}</rt></>: <><rb>{value.r}</rb><rt></rt></>
                })
            }
            </ruby>
    )
}
