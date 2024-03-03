import React from 'react';
import { Container, Header, Divider, Card, Placeholder, Button, ButtonGroup, ButtonOr, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useScreenSize } from '../../contexts/ScreenSizeContext';

const EventDetailsPlaceholder = () => {
    const { isMobile } = useScreenSize();
    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                Event Details
            </Header>
            <Divider hidden />
            <Divider hidden />

            <Card centered raised size='large' style={!isMobile ? { transform: 'scale(1.4)', transformOrigin: 'top' } : {}}>
                <Card.Content>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line length='very long' />
                        </Placeholder.Header>
                    </Placeholder>
                </Card.Content>

                <Card.Content>
                    <Placeholder>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='long' />
                            <Placeholder.Line length='medium' />
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Card.Content>

                <Card.Content>
                    <Placeholder>
                        <Placeholder.Line length='full' />
                        <Placeholder.Line length='very long' />
                    </Placeholder>
                </Card.Content>

                <Card.Content>
                    <ButtonGroup fluid>
                        <Button disabled>Loading</Button>
                        <ButtonOr />
                        <Button positive disabled>Loading</Button>
                    </ButtonGroup>
                </Card.Content>
            </Card>
        </Container>
    );
};

export default EventDetailsPlaceholder;
