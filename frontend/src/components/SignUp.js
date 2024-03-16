import React from "react"
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const SignUp = ({ handleFormType, signInForm, handleSignInForm, createNewAccount }) => {
    return (
        <div className="App">
            <h2>Sign In</h2>
            <Form className="form">
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        value={signInForm.name}
                        onChange={handleSignInForm}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="userName">Username</Label>
                    <Input
                        type="email"
                        name="userName"
                        id="userName"
                        placeholder="enter username"
                        value={signInForm.userName}
                        onChange={handleSignInForm}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="passWord">Password</Label>
                    <Input
                        type="password"
                        name="passWord"
                        id="passWord"
                        placeholder="********"
                        value={signInForm.passWord}
                        onChange={handleSignInForm}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirm-passWord">Confirm-Password</Label>
                    <Input
                        type="password"
                        name="confirmPassWord"
                        id="confirm-passWord"
                        placeholder="********"
                        value={signInForm.confirmPassWord}
                        onChange={handleSignInForm}
                    />
                </FormGroup>
                <Button onClick={createNewAccount} color="primary" type="button">Create</Button>
            </Form>
            <p>Already Have Account? <Button onClick={() => handleFormType('login')} type="button" color="link">Click Here</Button></p>
        </div>
    )
}

export default SignUp