import React from 'react';
import { Header, Segment, Grid, Icon, Image, MessageContent, Button } from 'semantic-ui-react';
import fest from '../../images/fest-removebg.png';
import { useScreenSize } from '../../contexts/ScreenSizeContext'; // Assuming this is implemented
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Dashboard = () => {

    const { isMobile } = useScreenSize(); // Utilizing the screen size context
    const gridWidth = isMobile ? '100%' : '115%';

    const { currentUser } = useAuth();


    return (


        < Grid columns={2} centered stackable textAlign='center' style={{ width: gridWidth }} >
            <Grid.Row verticalAlign='middle'>
                <Grid.Column width={6}>
                    <Segment raised style={{ padding: '25px' }}>
                        <MessageContent size="huge" floating>
                            <Header as="h2">Welcome &nbsp;

                                <span style={{ color: 'rgb(33 146 222)' }}>
                                    {currentUser ? currentUser.name : "User"}
                                </span>&nbsp;
                                to</Header>
                            <Header as="h1" color="blue" style={{ paddingTop: '0' }}
                            >
                                University Fest Event
                                Registration
                                Portal
                            </Header>
                            <Header as="h1">Get Started
                            </Header>
                            <Header as="h3">
                                Get started by exploring the events and registering for them.<br />
                                Also, you can explore the accommodation options available.

                            </Header>
                            <Button animated="fade" as={Link} to="/events">

                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                                <Button.Content visible>Explore</Button.Content>

                            </Button>

                        </MessageContent>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={10}>
                    <Image src={fest} size='huge' centered />
                </Grid.Column>
            </Grid.Row>
        </Grid >

    );
};

export default Dashboard;
