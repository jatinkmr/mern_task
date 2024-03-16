import React from 'react'
import { Card, CardBody, Table, Button } from 'reactstrap'

const NoteTable = ({ noteData, removeNoteData, modifyNoteData }) => {
    return (
        (noteData && noteData.length) ? (
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {noteData.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.title || 'N/A'}</td>
                            <td>{item.description || 'N/A'}</td>
                            <td>
                                <Button type="button" color="success" outline onClick={() => removeNoteData(index)}>Remove</Button>
                                {" "}
                                <Button type="button" color="info" outline onClick={() => modifyNoteData(index)}>Modify</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        ) : (
            <Card>
                <CardBody>
                    No Note Available
                </CardBody>
            </Card>
        )
    )
}

export default NoteTable
