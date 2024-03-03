// Path: frontend/src/components/events/EventListItem.js
import React, { useState, useEffect } from 'react';
import { Loader, Header, Divider, Card } from 'semantic-ui-react';
import EventListItem from '../events/EventListItem';

const MyEventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/student/events`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    const filteredEvents = data.filter(event => event.is_volunteer || event.is_participant);
                    setEvents(filteredEvents);
                } else {
                    // Handle errors here
                    console.error('Error fetching events:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
            setLoading(false);
        };
        fetchEvents();
    }, []);

    if (loading) {
        return <Loader active>Loading Events...</Loader>;
    }

    return (
        <div>
            {events.length > 0 ? (
                <>
                    <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                        My Events
                    </Header>
                    <Divider hidden />
                    <Card.Group className="custom-card-group" stackable itemsPerRow={3} >
                        {events.map((event, index) => (
                            <EventListItem
                                key={event.event_id}
                                event={event}
                                index={index}
                                reg_or_vol={event.is_volunteer ? "Volunteer" : "Participant"}
                            />
                        ))}
                    </Card.Group>
                </>
            ) : (
                <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                    No events found
                </Header>
            )}
        </div>
    );
}

export default MyEventList;