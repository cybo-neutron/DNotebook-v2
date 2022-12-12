import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from './utils/interfaces/controller.interface';

//controllers 
import NoteController from './services/note/note.controller';
import UserController from './services/user/user.controller';


const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'))


initializeMiddlewares();
initializeDBConnection();
initializeControllers([new NoteController(),new UserController()]);

app.listen(port, () => console.log(`App listening on port ${port}!`))


//functionalities

function initializeMiddlewares() :void{
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(compression());
    app.use(express.json())
    app.use(express.urlencoded({extended:false}));
}

function initializeDBConnection(): void{

    
    mongoose.connect(`${process.env.MONGO_URL}`, {dbName:process.env.DB_NAME}, (err) => {
        if (err) {
            console.log("Erorr in connecting to DB");
            console.log(err);
        } else {
            console.log("Successfully connected to DB");
            
        }
    })
}

function initializeControllers(controllers: Controller[]): void{
    app.get("/", (req,res) => {
        console.log("Welcome to DNotebook DB");
        res.send("Welcome to DNotebook DB")        

    })
    controllers.forEach((controller:Controller) => {
        app.use('/api', controller.router);
    })
}