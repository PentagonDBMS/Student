// src/components/Home.js
import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container text style={{ marginTop: '7em' }}>
            <Header as='h1' textAlign='center'>University Fest Admin Panel</Header>
            <div style={{ textAlign: 'center', marginTop: '2em' }}>
                <Button size='large' as={Link} to='/login' primary>Login</Button>
                <Button size='large' as={Link} to='/register' secondary style={{ marginLeft: '1em' }}>Register</Button>
            </div>
        </Container>
    );
};

export default Home;
