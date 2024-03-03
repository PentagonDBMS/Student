// src/components/auth/Login.js
import React, { useState } from 'react';
import { Button, Container, Form, Header, Segment, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => setCredentials({ ...credentials, [name]: value });

    const handleSubmit = async () => {
        setLoading(true);
        setError(''); // Reset error state
        if (await login(credentials.email, credentials.password)) {
            navigate('/dashboard'); // Adjust as per your app's routing
        } else {
            setError('Failed to log in. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Student Login</Header>
            <Segment loading={loading}>
                {error && <Message error content={error} />}
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type='submit' fluid primary>Login</Button>
                </Form>
            </Segment>
        </Container>
    );
};

export default Login;
