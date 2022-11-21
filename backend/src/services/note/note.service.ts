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

    public async fetchAllNotes(user_id:string): Promise<Array<Note>>{
        try {
            const notes = await NoteModel.find({user_id});
            return notes;
        } catch (error)
        {
            throw new HttpException(400, "Couldn't fetch notes");
        }
    }

    public async deleteNote(note_id: string): Promise<Note|null>{
        try {
            const deletedNote = await NoteModel.findByIdAndDelete(note_id);
            return deletedNote;
        } catch (err: any) {
            throw new HttpException(400, "You are not authorized to delete the note");
        }
    }

    public async updateNote(id:string,note:Note): Promise<Note|null>{
        try {
            const updatedNote = await NoteModel.findOneAndUpdate({_id:id},note,{new:true});
            return updatedNote;
        } catch (err: any) {
            throw new HttpException(400, "You are not authorized to delete the note");
        }
    }

}

export default NotesService;