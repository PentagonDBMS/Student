import React from 'react';
import { Card, Icon, Label, Image, List, Divider, CardContent, ButtonGroup, ButtonOr, Button, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const WorkCard = ({ work }) => {
    // Dummy work data
    const dummyWork = {
        id: 1,
        name: 'Project Alpha',
        description: 'A project to build a new website\nfor a startup company.\n\nThe website will be built using\nReact and Node.js.',
        startDate: '2024-02-28',
        numberOfWorker: 4,
        duration: '6 months',
        priority: 'High',
        role: 'Developer',
        assignees: [
            { id: 1, name: 'Jane Doe', avatar: '/path/to/avatar1.png' },
            { id: 2, name: 'John Doe', avatar: '/path/to/avatar2.png' },
        ],
    };

    return (
        <Container >
            <Card centered raised size='large' style={{
                transform: 'scale(1.4)', transformOrigin: 'top'
            }}>
                <Card.Content>
                    <Card.Header>
                        <a >{dummyWork.name}</a>
                    </Card.Header>

                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        {dummyWork.description}
                    </Card.Description>
                    <Label color='teal' ribbon='right'>
                        Commpleted
                    </Label>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        <Icon name='time' />
                        {`Starting at ${new Date(new Date() + (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}`}
                        <br />
                        <Icon name='time' />
                        {`Ends at ${new Date(new Date() + (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}`}
                    </Card.Description>

                </Card.Content>
            </Card>
        </Container>
    );
};

export default WorkCard;
