// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "../../lib/mongodb";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   let { db } = await connectToDatabase();

//   const PitchAccents = await db.collection("PitchAccents").find({}).toArray();

//   res.status(200).json({ PitchAccents });

//   console.log("Connection")
// }

import { Db, MongoClient } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next"

type Game = {
    public name: DB, 
    public db: DB, 
    public category: string
}

type Game = {
    public name: DB, 
    public db: DB, 
    public category: string
}

type Data = {
  name: DB, 
  db: DB, 
  category: string,
  object
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){ 
  try {
       const {client, db} : {client:MongoClient, db:Db} = await clientPromise();

       const accents = await db
           .collection("PitchAccents")
           .find({})
           .limit(10)
           .toArray();

       res.status(200).json(accents);
   } catch (e) {
       console.error(e);
   }
};