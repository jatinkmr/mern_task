const { fetchAll, createNewNote, removeNote, isNoteAvailable, updateNoteService } = require('../model/notes/service')

const fetchAllTaskController = async (req, res, next) => {
    try {
        const response = await fetchAll()

        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Available Notes',
                data: response
            })
        }
    } catch (error) {
        next(error)
    }
}

const newTaskCreationController = async (req, res, next) => {
    try {
        const { title, description } = req.body

        if (!title || !description) {
            return res.status(200).json({
                error: true,
                message: 'Title or Description must not be empty!'
            })
        }

        const response = await createNewNote({
            title,
            description
        })

        if (response) {
            return res.status(201).json({
                error: false,
                message: 'Note Created Successfully',
                data: response
            })
        }
    } catch (error) {
        next(error)
    }
}

const removeTaskController = async (req, res, next) => {
    try {
        const { noteid } = req.params
        const isNoteExist = await isNoteAvailable(noteid)
        if (!isNoteExist) {
            return res.status(200).json({
                error: true,
                message: 'No Such Note available'
            })
        }

        const response = await removeNote(noteid)
        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Note Removed Successfully!!'
            })
        }
    } catch (error) {
        next(error)
    }
}

const updateExistingNoteController = async (req, res, next) => {
    try {
        const { title, description, noteId } = req.body
        const isNoteExist = await isNoteAvailable(noteId)
        if (!isNoteExist) {
            return res.status(200).json({
                error: true,
                message: 'No Such Note available with given noteId'
            })
        }

        const response = await updateNoteService({
            title, description
        }, noteId)

        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Note Updated Successfully',
                updatedNote: response
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchAllTaskController,
    newTaskCreationController,
    removeTaskController,
    updateExistingNoteController
}