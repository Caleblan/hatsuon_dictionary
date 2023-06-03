//Used by toMora function to check if any characters are digraphs.
//っ and ッ omitted on purpose due as they are considered seperate mora
const hiriDigraphs: string[] = ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ', 'ゎ', 'ゕ', 'ゖ'];
const kataDigraphs: string[] = ['ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ヮ', 'ヵ', 'ヶ'];

//Used to find if digraph is in 
const digraphs: Set<string> = new Set<string>(hiriDigraphs.concat(kataDigraphs));

/**
 * Parses a string and breaks it up into Japanese mora. *Note that っ/ッ are assumed as 1 mora.*
 * @param {string} inputText - The string to be broken up into mora.
 * @returns {string[]} A list containing parsed mora from input text.
 */
export function toMora(inputText:string): string[] {

    const mora:string[] = [];

    //Checks the all characters.
    for(let i:number = 0; i < inputText.length; i++) {

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
 * Determines what type of pitch patch pattern based on inputted pitch patttern number for a specific word.
 * @param {number} moraCount  The number of mora in the given word.
 * @param {number} pitchPattern (number) The pattern of the word.
 * @returns {string[]} Array with 2 elements: Kanji and hiragana of the pitch pattern
 */
export function determinePitchPattern(moraCount:number, pitchPattern:number): string[] {

    const patternTypes: string[][] = 
    [["平板", "へいばん"], ["中高", "なかだか"], ["頭高", "あたまだか"], ["尾高", "おだか"]];

    // Prevent negative pitch patterns which don't exist. Or if word is not long enough for pattern.
    if(pitchPattern < 0 || moraCount < pitchPattern) return [];

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

/**
 * Converts a pitch pattern number of accented/unaccented mora (i.e. [2,1,1,1,2])
 * @param {number} pitchPattern A single number which contains the drop
 * @param {number} moraCount The number of mora contained in the word.
 * @returns {number[]} The array which will be fed into the pitch diagram input variables
 */
export function convertPitchNumber(pitchPattern:number, moraCount: number): number[] {

    let pattern: number[] = [];

    //If 平板（へいばん)
    if(pitchPattern === 0) {
        pattern = [2];
        pattern = pattern.concat(Array(moraCount).fill(1));
    }
    //If 頭高（あたまだか).
    else if(pitchPattern === 1) {
        pattern = [1];
        pattern = pattern.concat(Array(moraCount).fill(2));
    }
    //If 中高 (なかだか) or 尾高 (おだか).
    else if (pitchPattern > 1 && pitchPattern <= moraCount){
        pattern = [2];

        //Get all higher mora.
        pattern = pattern.concat(Array(pitchPattern - 1).fill(1));
        //Get mora after pitch drop.
        pattern = pattern.concat(Array(moraCount - pitchPattern + 1).fill(2));
    }

    return pattern;
}

export default {toMora, determinePitchPattern, convertPitchNumber};