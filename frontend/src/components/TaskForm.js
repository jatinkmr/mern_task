import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const TaskForm = ({
    formData,
    handleFormChange,
    handleTaskCreation,
    resetNoteForm,
    isUpdate,
    updateExistingTask
}) => {
    return (
        <div className='App'>
            <h2>Note</h2>
            <Form className='form'>
                <FormGroup>
                    <Label for='title'>Title</Label>
                    <Input
                        type='text'
                        name='title'
                        id='title'
                        placeholder='Enter title'
                        value={formData.title}
                        onChange={handleFormChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='description'>Description</Label>
                    <Input
                        type='text'
                        name='description'
                        id='description'
                        placeholder='Enter Description'
                        value={formData.description}
                        onChange={handleFormChange}
                    />
                </FormGroup>
                {isUpdate ? (
                    <Button type='button' color='success' onClick={updateExistingTask}>
                        Update
                    </Button>
                ) : (
                    <Button type='button' color='success' onClick={handleTaskCreation}>
                        Create Note
                    </Button>
                )}{' '}
                <Button type='button' color='danger' onClick={resetNoteForm}>
                    Reset
                </Button>
            </Form>
        </div>
    )
}

export default TaskForm
