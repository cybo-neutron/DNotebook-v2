import { NextFunction, Request, Response, Router } from "express";
import HttpException from "../../utils/exceptions/http.exception";
import Controller from "../../utils/interfaces/controller.interface";
import Note from "./note.interface";
import NotesService from "./note.service";


class NoteController implements Controller{
    public path = '/notes';
    public router = Router();
    private notesService: NotesService;
    constructor() {
        this.initializeRoutes();
        this.notesService = new NotesService();
    }

    private initializeRoutes() {
        //Create note
        this.router.post(`${this.path}/create`, this.create);
        //fetch all notes
        this.router.get(`${this.path}/`, this.fetchAllNotes);

    }

    private create =async (req: Request, res: Response, next: NextFunction): Promise<Response | void> =>{
        
        try {
            const { title, description } = req.body;
            console.log("🚀 ~ file: note.controller.ts ~ line 29 ~ NoteController ~ create ~ req.body", req.body)
            
            const createdNote = await this.notesService.create({ title, description } as Note);
            res.status(201).json(createdNote);
        } catch (err:any) {
            next(err)
        }
    } 

    private fetchAllNotes = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const fetchedNotes = await this.notesService.fetchAllNotes();
            res.status(201).json(fetchedNotes);
        } catch (err: any)
        {
            next(err);
        }
    }


}

export default NoteController;