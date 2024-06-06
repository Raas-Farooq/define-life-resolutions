import express from 'express';
import cors from 'cors';
import database from './config/database.js';
import router from './Routes/goalsRoute.js';

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3005;

app.use('/goals/api', router);
app.listen(port, function(){
    database.connect();
    console.log(`Yoor Port ${port}`)
})