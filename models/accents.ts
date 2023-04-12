import { ObjectId } from "mongodb";

export default class Accent {
    constructor(
        public word: string, 
        public kana: number, 
        public accents: string,
        public id?: ObjectId
        ){}
}