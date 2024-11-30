// Library Functions
// import clientPromise from "./mongodb";
// import {toMora, determinePitchPattern } from "./pitchUtilities";


const mongoDB = require("./mongodb");
const pitchUtilities = require("./pitchUtilities");

generatePitchAccentTags("PitchAccents");

async function generatePitchAccentTags(collection : string) {
    
    //Connect to the database 
    const {client, db} = await mongoDB.clientPromise();
  
    const cursor = db.collection(collection).find({});

    for await (const doc of cursor) {
        const tags: Set<string> = new Set();

        // Seperate into mora so we can determine accent pattern name.
        // console.log("doc", doc, "Kanji", doc.word, "Kana", doc.kana)
        const mora: string[] = pitchUtilities.toMora(doc.kana == "" ? doc.word : doc.kana);

        // Go through each accent category (i.e. generic, な-adj, etc.)
        Object.entries(doc.accents).forEach((category:any[]) => {

            // Go through every pitch accent in that category
            for(let pattern of category[1])
            {
                // if(doc.word === "１人")
                // {
                //   console.log("doc", doc, "Kanji", doc.word, "Kana", doc.kana)
                //   console.log(pattern)
                //   console.log(category)
                //   console.log(mora.length, Number(pattern))
                //   console.log("Result", pitchUtilities.determinePitchPattern(mora.length, Number(pattern))[0])
                // }

                tags.add(pitchUtilities.determinePitchPattern(mora.length, Number(pattern))[0]);
            }
        });

        db.collection(collection).updateOne({"_id": doc._id}, {$set: {tags: Array.from(tags.values())}});
    }

    console.log("Done updating tags in collection")
}

module.exports = {generatePitchAccentTags}

export {}

