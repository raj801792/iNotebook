const express = require('express')
const router = express.Router();
const Note = require('../models/note');
const { body, validationResult } = require('express-validator');
const fatchuser = require('../middleware/fatchuser');

//Create a user using:GET "/api/notes/fetchallnotes".  login recoured
router.get('/fetchallnotes', fatchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

//Route2:add a note:POST "/api/notes/addnote".  login recoured
router.post('/addnote', fatchuser, [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Descriptiona at least 6 character').isLength({ min: 6 })
], async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

//route:3 Update an existing Note using: PUT"/api/note/updatenote". login required
router.put('/updatenote/:id', fatchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //creat a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
})

//route:4 delete an existing Note using: PUT"/api/note/deletenote". login required
router.delete('/deletenote/:id', fatchuser, async (req, res) => {

    try {
        //Find the note for delete 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

module.exports = router