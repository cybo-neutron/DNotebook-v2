import { NextFunction, Request, Response, Router } from "express";
import authenticateMiddleware from "../../middlewares/auth.middleware";
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
        this.router.post(`${this.path}/create`,authenticateMiddleware, this.create);
        //fetch all notes
        this.router.get(`${this.path}/`, authenticateMiddleware, this.fetchAllNotes);
        //delete a note
        this.router.delete(`${this.path}/delete/:id`, authenticateMiddleware, this.delete);
        //update a note
        this.router.patch(`${this.path}/update/:id`, authenticateMiddleware, this.update);

    }

    private create =async (req: Request, res: Response, next: NextFunction): Promise<Response | void> =>{
        
        try {
            const { title, description } = req.body;
            // console.log("🚀 ~ file: note.controller.ts ~ line 29 ~ NoteController ~ create ~ req.body", req.body)
            
            const createdNote = await this.notesService.create({ title, description,user_id:req.user?._id } as Note);
            res.status(201).json(createdNote);
        } catch (err:any) {
            next(err)
        }
    } 

    private fetchAllNotes = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const fetchedNotes = await this.notesService.fetchAllNotes(req.user?._id);
            res.status(201).json(fetchedNotes);
        } catch (err: any)
        {
            next(err);
        }
    }

    private delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const id = req.params.id;
        console.log({id});
        
        try {
            const deletedNote = await this.notesService.deleteNote(id);
            res.status(201).json(deletedNote);
        } catch (err: any)
        {
            next(err);
        }
    }

    private update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const id = req.params.id;
        console.log(req.body);
        try {
            const updatedNote = await this.notesService.updateNote(id,req.body);
            res.status(201).json(updatedNote);
        } catch (err: any)
        {
            next(err);
        }
    }


}

export default NoteController;