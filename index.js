import express from 'express'
import connectDB from './connection/db.js';
import bookRoute from './routes/bookRoute.js'
import bodyParser from 'body-parser';

const app = express();


const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use("/api/v1/book",bookRoute )

app.listen(port, () => {
    connectDB();
    console.log("server is running ")
})