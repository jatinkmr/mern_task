import React, { useEffect, useState } from "react"
import './App.css'
import { Container, Row, Col, Button } from 'reactstrap'
import { toast } from 'react-toastify'
import TaskForm from "./TaskForm"
import NoteService from '../Services/NoteService'
import NoteTable from './NoteTable'

const Home = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        titleid: ''
    })
    const [noteData, setNoteData] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)

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

    useEffect(() => {
        fetchNoteData()
    }, [])

    const removeNoteData = async (index) => {
        if (window.confirm("Do you really want to remove?")) {
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

    const modifyNoteData = (index) => {
        const filteredDataId = noteData.filter((item, ind) => index === ind)
        setFormData({
            title: filteredDataId[0].title,
            description: filteredDataId[0].description,
            titleid:  filteredDataId[0]._id
        })
        setIsUpdate(true)
    }

    const resetNoteForm = () => {
        setFormData({
            title: '',
            description: '',
            titleid: ''
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
                    description: '',
                    titleid: ''
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

    const updateExistingTask = async () => {
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
            const response = await NoteService.updateTaskService({
                "noteId": formData.titleid,
                "title": formData.title,
                "description": formData.description
            })

            if (response.data.error) {
                return toast.error(response.data.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            } else {
                setFormData({
                    title: '',
                    description: '',
                    titleid: ''
                })
                setIsUpdate(false)
                fetchNoteData()
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

    const logOut = () => {
        console.log('hello')
        localStorage.removeItem('auth-token')
        window.location.href = '/login'
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button type="button" onClick={logOut} color="info">LogOut</Button>
                    </Col>
                </Row>
                <Row>
                    <TaskForm
                        formData={formData}
                        handleFormChange={handleFormChange}
                        handleTaskCreation={handleTaskCreation}
                        resetNoteForm={resetNoteForm}
                        isUpdate={isUpdate}
                        updateExistingTask={updateExistingTask}
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