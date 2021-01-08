import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login(props){
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const initialState = {
        username: "",
        password: ""
    };

    const { onChange, onSubmit, values } = useForm(loginUser, initialState);

    const [login, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, {data: {login: userData}}){
            // console.log(result);
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function loginUser(){
        login();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <div className="page-title">
                    <h1>Login</h1>
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
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type='submit' primary fluid>
                    Login
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username
                password: $password
            ){
                id
                username
                email
                createdAt
                token
            }
    }
`;

export default Login;