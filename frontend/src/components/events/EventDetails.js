import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Icon,
  Label,
  ButtonGroup,
  ButtonOr,
  Header,
} from "semantic-ui-react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useParams } from "react-router-dom";
import EventDetailsPlaceholder from "../layout/EventDetailsPlaceholder";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "semantic-ui-react";

export default function () {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openParticipateModal, setOpenParticipateModal] = useState(false);
  const [openVolunteerModal, setOpenVolunteerModal] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();

  // Function to handle participation
  const handleParticipate = async () => {
    setLoading(true);
    setOpenParticipateModal(false);
    try {
      // Make a POST request to the participate endpoint
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/student/events/participate/${event.event_id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        // Handle errors here
        console.error("Error fetching events:", response.statusText);
      }
      // Handle success, maybe show a message or update state
    } catch (error) {
      // Handle error, maybe show an error message
      console.error("Error participating:", error);
    }
    fetchEvents();
  };

  // Function to handle volunteering
  const handleVolunteer = async () => {
    setLoading(true);
    setOpenVolunteerModal(false);
    try {
      // Make a POST request to the volunteer endpoint
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/student/events/volunteer/${event.event_id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      // Handle success, maybe show a message or update state
    } catch (error) {
      // Handle error, maybe show an error message
      console.error("Error volunteering:", error);
    }

    fetchEvents();
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/student/events/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data[0]);
        setEvent(data[0]);
      } else {
        // Handle errors here
        console.error("Error fetching events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <EventDetailsPlaceholder />;
  }

  return (
    <Container>
      <Modal
        size="small"
        open={openParticipateModal}
        onClose={() => setOpenParticipateModal(false)}
        dimmer="blurring"
      >
        <Modal.Header>Register for {event?.name}</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to register for {event?.name}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpenParticipateModal(false)}>
            No
          </Button>
          <Button positive onClick={handleParticipate}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal
        size="small"
        open={openVolunteerModal}
        onClose={() => setOpenVolunteerModal(false)}
        dimmer="blurring"
      >
        <Modal.Header>Volunteer for {event?.name}</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to volunteer for {event?.name}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpenVolunteerModal(false)}>
            No
          </Button>
          <Button positive onClick={handleVolunteer}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
        Event Details
      </Header>
      <Divider hidden />

      <Card centered raised size="large">
        <Card.Content>
          <Header as="h2" style={{ marginBottom: "10px" }}>
            <a>{event.name}</a>
          </Header>
        </Card.Content>
        <Card.Content>
          <Card.Description>{event.description}</Card.Description>
          {/* If current time is greater than event start time and less than event end time, show "Live"  if current time is less than event start time, show "Upcoming" else show "Completed" */}
          {new Date().getTime() > new Date(event.start_time).getTime() &&
          new Date().getTime() < new Date(event.end_time).getTime() ? (
            <Label color="green" ribbon="right" as="a">
              Live
            </Label>
          ) : new Date().getTime() < new Date(event.start_time).getTime() ? (
            <Label color="teal" ribbon="right" as="a">
              Upcoming
            </Label>
          ) : (
            <Label color="red" ribbon="right" as="a">
              Completed
            </Label>
          )}
        </Card.Content>
        <Card.Content>
          <Card.Description>
            <Icon name="time" />
            {`Starting at ${new Date(
              new Date(event.start_time).getTime()
            ).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}`}
            <br />
            <Icon name="time" />
            {`Ends at ${new Date(
              new Date(event.end_time).getTime()
            ).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          {new Date().getTime() > new Date(event.start_time).getTime() ? (
            <Button negative fluid>
              <Icon name="close" />
              Registration Closed
            </Button>
          ) : event.is_participant || event.is_volunteer ? (
            event.is_participant ? (
              <Button positive fluid>
                <Icon name="check" />
                Already Registered
              </Button>
            ) : (
              <Button fluid>
                <Icon name="handshake" />
                Volunteering for this event
              </Button>
            )
          ) : (
            currentUser.isstudent ? (
              <>
                  <ButtonGroup fluid>
                      <Button onClick={() => setOpenVolunteerModal(true)}>
                          <Icon name="handshake" />
                          Volunteer
                      </Button>
                      <ButtonOr />
                      <Button positive onClick={() => setOpenParticipateModal(true)}>
                          <Icon name="check" />
                          Register
                      </Button>
                  </ButtonGroup>
              </>
          ) : (
              <Button positive fluid onClick={() => setOpenParticipateModal(true)}>
                  <Icon name="check" />
                  Register
              </Button>
          )
            // <ButtonGroup fluid>
            //   <Button positive onClick={() => setOpenParticipateModal(true)}>
            //     <Icon name="check" />
            //     Register
            //   </Button>
            //   <ButtonOr />
            //   <Button onClick={() => setOpenVolunteerModal(true)}>
            //     <Icon name="check" />
            //     Volunteer
            //   </Button>
            // </ButtonGroup>
          )}
        </Card.Content>
      </Card>
    </Container>
  );
}
