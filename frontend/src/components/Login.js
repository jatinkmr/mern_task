import React, { useState, useEffect } from "react"
import { Container, Row } from 'reactstrap'
import './App.css'
import { toast } from 'react-toastify'
import Service from '../Services/login'
import { useNavigate } from 'react-router-dom'
import SignUp from './SignUp'
import LoginForm from "./LoginForm"

const Login = () => {
    const [formType, setFormType] = useState('login')
    const [formData, setFormData] = useState({
        userName: '',
        passWord: '',
    })
    const [signInForm, setSignInForm] = useState({
        name: '',
        passWord: '',
        userName: '',
        confirmPassWord: ''
    })

    // check if token already available
    const navigate = useNavigate()
    useEffect(() => {
        // Check if data exists in localStorage
        const userData = localStorage.getItem('auth-token');
        if (userData) {
            // Redirect to the home page if data exists
            navigate('/home');
        } else {
            // Redirect to the login page if data doesn't exist
            navigate('/login');
        }
    }, [navigate]);

    const setAuth = (response) => {
        localStorage.setItem('auth-token', response.token)
        window.location.href = '/home'
    }

    const handleChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value,
        });
    }

    const handleFormType = (frmType) => {
        setSignInForm({
            name: '',
            passWord: '',
            userName: '',
            confirmPassWord: ''
        })
        setFormData({
            userName: '',
            passWord: '',
        })
        setFormType(frmType)
    }

    const handleSignInForm = (ev) => {
        setSignInForm({
            ...signInForm,
            [ev.target.name]: ev.target.value
        })
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
            const response = await Service.loginService(formData.userName, formData.passWord)

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

    const createNewAccount = async () => {
        if (!signInForm.name) {
            return toast.error('Please Enter Your Name', {
                position: 'top-right',
                autoClose: 3000
            })
        }
        if (!signInForm.userName) {
            return toast.error('Please Enter username', {
                position: 'top-right',
                autoClose: 3000
            })
        }
        if (!signInForm.passWord) {
            return toast.error('Please Enter Password', {
                position: 'top-right',
                autoClose: 3000
            })
        }
        if (!signInForm.confirmPassWord) {
            return toast.error('Please Enter Confirm-Password', {
                position: 'top-right',
                autoClose: 3000
            })
        }
        if (signInForm.passWord !== signInForm.confirmPassWord) {
            return toast.error('Password not matched', {
                position: 'top-right',
                autoClose: 3000
            })
        }
        try {
            const response = await Service.signInService({
                name: signInForm.name,
                username: signInForm.userName,
                password: signInForm.passWord
            })

            if (response.data.error) {
                return toast.error(response.data.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            } else {
                setSignInForm({
                    name: '',
                    passWord: '',
                    userName: '',
                    confirmPassWord: ''
                })
                handleFormType('login')
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
                    {(formType === 'login') ? (
                        <LoginForm
                            formData = {formData}
                            handleChange = {handleChange}
                            loginHandler = {loginHandler}
                            handleFormType = {handleFormType}
                        />
                    ) : (
                        <SignUp
                            handleFormType = {handleFormType}
                            signInForm = {signInForm}
                            handleSignInForm = {handleSignInForm}
                            createNewAccount = {createNewAccount}
                        />
                    )}
                </Row>
            </Container>
        </>
    )
}

export default Login