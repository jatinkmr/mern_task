import React, { useState, useEffect } from "react"
import { Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import './App.css'
import { toast } from 'react-toastify'
import loginService from '../Services/login'

const Login = () => {
    const [formData, setFormData] = useState({
        userName: '',
        passWord: '',
    })

    // check if token already available
    useEffect(() => {
        let isToken = localStorage.getItem('auth-token')
        if (!isToken) {
            window.location.href = '/login'
        } else {
            window.location.href = '/home'
        }
    }, [])

    const setAuth = (response) => {
        localStorage.setItem('auth-token', response.token)
        window.location.href='/home'
    }

    const handleChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value,
        });
    }

    const loginHandler = async () => {
        if (!formData.userName) {
            return toast.error('username must not be empty', {
                position: 'top-right',
                autoclose: 3000
            })
        }
        if (!formData.passWord) {
            return toast.error('password must not be empty', {
                position: 'top-right',
                autoClose: 3000
            })
        }

        try {
            const response = await loginService(formData.userName, formData.passWord)

            if (response.data.error) {
                return toast.error(response.data.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            } else {
                setAuth(response.data)
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
                    <div className="App">
                        <h2>Log In</h2>
                        <Form className="form">
                            <FormGroup>
                                <Label for="userName">Username</Label>
                                <Input
                                    type="email"
                                    name="userName"
                                    id="userName"
                                    placeholder="example@example.com or example"
                                    value={formData.userName}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="passWord">Password</Label>
                                <Input
                                    type="password"
                                    name="passWord"
                                    id="passWord"
                                    placeholder="********"
                                    value={formData.passWord}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button type="button" onClick={loginHandler}>LogIn</Button>
                        </Form>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Login