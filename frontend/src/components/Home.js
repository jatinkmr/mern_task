import React, { useEffect, useState } from "react"
import './App.css'
import { Container, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import TaskForm from "./TaskForm"
import NoteService from '../Services/NoteService'
import NoteTable from './NoteTable'

const Home = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })
    const [noteData, setNoteData] = useState([])

    useEffect(() => {
        const fetchNoteData = async () => {
            try {
                const response = await NoteService.taskFetchService()

                if (response.data.error) {
                    return toast.error(response.data.message, {
                        position: 'top-right',
                        autoClose: 3000
                    })
                } else {
                    setNoteData(response.data.data)
                }
            } catch (error) {
                return toast.error(error.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            }
        }

        fetchNoteData()
    }, [])

    const removeNoteData = async (index) => {
        if (window.confirm("Do you really want to remove?")) {
            console.log('index :- ', index)
            const filteredDataId = noteData.filter((item, ind) => index === ind)

            const response = await NoteService.removeTaskService(filteredDataId[0]._id)

            if (response.data.error) {
                return toast.error(response.data.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            } else {
                const updatedNoteData = noteData.filter((item, ind) => index !== ind)
                setNoteData(updatedNoteData)

                return toast.success(response.data.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            }
        }
    }

    const modifyNoteData = (index) => {}

    const resetNoteForm = () => {
        setFormData({
            title: '',
            description: ''
        })
    }

    const handleFormChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value
        })
    }

    const handleTaskCreation = async () => {
        if (!formData.title) {
            return toast.error('Please enter title', {
                position: 'top-right',
                autoClose: 3000
            })
        }
        if (!formData.description) {
            return toast.error('Please enter description', {
                position: 'top-right',
                autoClose: 3000
            })
        }
        try {
            const response = await NoteService.taskCreationService({
                "title": formData.title,
                "description": formData.description
            })

            if (response.data.error) {
                return toast.error(response.data.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            } else {
                noteData.unshift(response.data.data)
                setNoteData([...noteData])
                setFormData({
                    title: '',
                    description: ''
                })
                return toast.success(response.data.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            }
        } catch (error) {
            return toast.error(error.message, {
                position: 'top-right',
                autoClose: 3000
            })
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <TaskForm
                        formData={formData}
                        handleFormChange={handleFormChange}
                        handleTaskCreation={handleTaskCreation}
                        resetNoteForm={resetNoteForm}
                    />
                </Row>
                <Row>
                    <NoteTable
                        noteData={noteData}
                        removeNoteData={removeNoteData}
                        modifyNoteData={modifyNoteData}
                    />
                </Row>
            </Container>
        </>
    )
}

export default Home