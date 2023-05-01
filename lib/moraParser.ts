//Used by toMora function to check if any characters are digraphs.
//っ and ッ omitted on purpose due as they are considered seperate mora
const hiriDigraphs: string[] = ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ', 'ゎ', 'ゕ', 'ゖ'];
const kataDigraphs: string[] = ['ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ヮ', 'ヵ', 'ヶ'];

//Used to find if digraph is in 
const digraphs: Set<string> = new Set<string>(hiriDigraphs.concat(kataDigraphs));

/**
 * Parses a string and breaks it up into Japanese mora. *Note that っ/ッ are assumed as 1 mora.*
 * @param {string} inputText - The string to be broken up into mora.
 * @returns A list containing parsed mora from input text.
 */
export default function toMora(inputText:string) {

    const mora:string[] = [];

    //Checks the all characters.
    for(let i = 0; i < inputText.length; i++) {

        //If we found a digraph, add to previous 
        if(digraphs.has(inputText[i]) && mora[mora.length-1].length == 1) {
            mora.push(mora.pop() + inputText[i]);
        }
        //If normal character, just add to list.
        else {
            mora.push(inputText[i]);
        }
    }

    return mora;
}


/**
 * Determines what type 
 * @param moraCount 
 * @param pitchPattern 
 * @returns Array
 */
export function determinePitchPattern(moraCount:number, pitchPattern:number) {

    const patternTypes: string[][] = 
    [["平板", "へいばん"], ["中高", "なかだか"], ["頭高", "あたまだか"], ["尾高", "おだか"]];

    // Prevent negative pitch patterns which don't exist. Or if word is not long enough for pattern.
    if(pitchPattern < 0 || moraCount < pitchPattern) return null

    // Heiban pattern
    if(pitchPattern === 0)
    {
        return patternTypes[0];
    }
    // Atamadaka pattern
    else if(pitchPattern === 1)
    {
        return patternTypes[2];
    }
    // Odaka pattern
    else if(moraCount === pitchPattern)
    {
        return patternTypes[3];
    }
    // Nakadaka pattern
    else
    {
        return patternTypes[1];
    }
}