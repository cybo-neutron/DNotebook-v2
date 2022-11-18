import NoteModel from "./note.model";
import Note from "./note.interface";
import HttpException from "../../utils/exceptions/http.exception";

class NotesService{
    
    public async create(note: Note): Promise<Note> {
       
        try {
            const createdNote = await NoteModel.create(note);
            return createdNote;
        } catch(error) {
            throw new HttpException(400, "Couldn't create note");
        }
    }

    public async fetchAllNotes(): Promise<Array<Note>>{
        try {
            const notes = await NoteModel.find();
            return notes;
        } catch (error)
        {
            throw new HttpException(400, "Couldn't fetch notes");
        }
    }

}

export default NotesService;