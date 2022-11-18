import Note from "./note.interface";
import { Schema ,model} from "mongoose";

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

export default model<Note>('note',NoteSchema)

