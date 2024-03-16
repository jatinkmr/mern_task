import React, { useState } from "react"
import './App.css'
import { Container, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import TaskForm from "./TaskForm"
import NoteService from '../Services/NoteService'

const Home = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })

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
                    />
                </Row>
                <Row>Data Table</Row>
            </Container>
        </>
    )
}

export default Home