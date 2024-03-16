const Note = require('./notes.js')

const fetchAll = async () => {
    return await Note.find()
}

const createNewNote = async reqBodyData => {
    return await Note.create(reqBodyData)
}

const isNoteAvailable = async noteId => {
    return Note.findOne({
        _id: noteId
    })
}

const removeNote = async noteId => {
    return await Note.deleteOne({
        _id: noteId
    })
}

const updateNoteService = async (reqBodyData, noteId) => {
    return await Note.findOneAndUpdate({
        _id: noteId
    }, reqBodyData, {
        new: true
    })
}

module.exports = {
    fetchAll,
    createNewNote,
    isNoteAvailable,
    removeNote,
    updateNoteService
}