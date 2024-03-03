// EventList.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Loader,
  Header,
  List,
  Icon,
  Card,
  Divider,
  Input,
} from "semantic-ui-react";
import EventListItem from "./EventListItem";
import { useScreenSize } from "../../contexts/ScreenSizeContext";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { isMobile } = useScreenSize(); // Utilizing the screen size context

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/student/events`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          // Handle errors here
          console.error("Error fetching events:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);
  const filteredEvents = events.filter((event) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      event.name.toLowerCase().includes(searchTermLowerCase) ||
      event.description.toLowerCase().includes(searchTermLowerCase)
    );
  });

  if (loading) {
    return <Loader active>Loading Events...</Loader>;
  }

  return (
    <div>
      <>
        <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
          Events
        </Header>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Input
            icon="search"
            placeholder="Search events..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Divider hidden />
        {filteredEvents && filteredEvents.length > 0 ? (
          <Card.Group className="custom-card-group" stackable itemsPerRow={3}>
            {filteredEvents.map((event, index) => (
              <EventListItem key={event.event_id} event={event} index={index} />
            ))}
          </Card.Group>
        ) : (
          <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
            No events found
          </Header>
        )}
      </>
    </div>
  );
};

export default EventList;
