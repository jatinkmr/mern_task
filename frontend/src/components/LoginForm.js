import React from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const LoginForm = ({ formData, handleChange, loginHandler, handleFormType }) => {
    return (
        <div className="App">
            <h2>Log In</h2>
            <Form className="form">
                <FormGroup>
                    <Label for="userName">Username</Label>
                    <Input
                        type="email"
                        name="userName"
                        id="userName"
                        placeholder="enter username"
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
                <Button type="button" color="success" onClick={loginHandler}>LogIn</Button>
            </Form>
            <p>Need Account? <Button onClick={() => handleFormType('signup')} type="button" color="link">Click Here</Button></p>
        </div>
    )
}

export default LoginForm