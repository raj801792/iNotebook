import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all  notes
    const getNotes = async () => {

        //API call
        const response = await fetch(`${host}/api/note/fetchallnotes`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
        });

    const json=await response.json()
    console.log(json)
    setNotes(json)
}

    //Add note
    const addNote = async (title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/note/addnote`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });

        const note=await response.json();
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {

         //API call
         const response = await fetch(`${host}/api/note/deletenote/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            
        });
        const json=response.json();
        console.log(json)
        
        //delete in client side
        console.log("delete id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Edit Note
    const editNote = async (id,title,description,tag)=>{
        //API call
        const response = await fetch(`${host}/api/note/updatenote/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=response.json();

        console.log(json);

        //Update note in client side
        const newnotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newnotes[index];
            if(element._id === id){
                newnotes[index].title=title;
                newnotes[index].description = description;
                newnotes[index].tag= tag;
                break;
            }
        }
        setNotes(newnotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;