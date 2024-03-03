// Path: frontend/src/components/my_events/MyEventListItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyEventListItem = ({ event }) => {

    const navigate = useNavigate();
    return (
        <List.Item>
            <List.Content floated='right'>
            </List.Content>
            <List.Icon name='calendar' />
            <List.Content>
                <List.Header as='a' onClick={() => navigate(`/events/${event.event_id}`)}>{event.name}</List.Header>
                <List.Description>{event.description}</List.Description>
                <List.Description>{event.start_time} - {event.end_time}</List.Description>
                <List.Description>
                    is participant registered: {event.is_participant ? 'Yes' : 'No'}
                </List.Description>
                <List.Description>
                    is he volunteering: {event.is_volunteer ? 'Yes' : 'No'}
                </List.Description>
                {/* <List.Description>Organizer ID: {event.organizer_id}</List.Description> */}
            </List.Content>
        </List.Item>
    );
}

export default MyEventListItem;