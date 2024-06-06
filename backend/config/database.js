import mongoose from 'mongoose';
// import dotenv from 'dotenv';
import * as dotenv from 'dotenv-safe';
import path from 'path';
import { fileURLToPath } from 'url';

// Use fileURLToPath to get the current file path
const __filename = fileURLToPath(import.meta.url);


const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');
// const envPath = '/home/raas/Programming/React Projects/lifegoals/.env'
dotenv.config({ path: envPath, example: envPath });

// dotenv.config();
console.log("Mongo_Uri in Database: ", process.env.MONGO_URI);

const connect = () => {
    const uri = process.env.MONGO_URI;


    if(!uri){
        console.log("undefined uri");
        process.exit(1)
    }

    mongoose.connect(uri);
    const myDb = mongoose.connection;

    myDb.on('error', console.error.bind(console, "Didn't connected"))
    myDb.once('open', () => {
        console.log("succESSfully Connected the DB")
    }
    )
}

export default {connect}

