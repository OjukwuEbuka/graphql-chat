import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../util/hooks';

function Register(props){
    const [errors, setErrors] = useState({});

    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const {onChange, onSubmit, values } = useForm(registerUser, initialState);

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result){
            // console.log(result);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })


    function registerUser(){
        addUser();
    }
    // const onChange = (e) => setValues({...values, [e.target.name]: e.target.value})

    // const onSubmit = e => {
    //     e.preventDefault();
    //     addUser();
    // }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <div className="page-title">
                    <h1>Register</h1>
                </div>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="text"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type='submit' primary fluid>
                    Register
                </Button>
            </Form>
            {
                Object.keys(errors).length > 0 && 
                (<div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>  
                </div>)
            }
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                }
            ){
                id
                username
                email
                createdAt
                token
            }
    }
`;

export default Register;