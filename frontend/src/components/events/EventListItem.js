import React from "react";
import { Button, Icon, Card, Label, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const EventListItem = ({ event, reg_or_vol, index }) => {
  const [style, setStyle] = useState({
    opacity: 0,
    transform: 'translateY(20px)',
  });

  useEffect(() => {
    // Start the animation after a delay based on the index
    const delay = (index + 1) * 100; // Delay in milliseconds
    const animationDuration = 500; // Duration in milliseconds
    const timer = setTimeout(() => {
      setStyle({
        opacity: 1,
        transform: 'translateY(0)',
        transition: `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`,
      });
    }, delay);

    // Clear styles after the animation completes
    const clearStyleTimer = setTimeout(() => {
      setStyle({});
    }, delay + animationDuration);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearStyleTimer);
    };
  }, [index]);



  return (
    // <List.Item>
    //   <List.Content floated="right">
    //     {/* if one of event.is_participant or event.is_volunteer is true, show registered else show button to participate and volunteer  */}
    //     {event.is_participant || event.is_volunteer ? (
    //       <Button color="blue" disabled>
    //         <Icon name="calendar plus" />
    //         Registered
    //       </Button>
    //     ) : currentUser.isstudent ? (
    //       <>
    //         <Button color="blue" onClick={handleVolunteer}>
    //           <Icon name="calendar plus" />
    //           Volunteer
    //         </Button>
    //         <Button color="blue" onClick={handleParticipate}>
    //           <Icon name="calendar plus" />
    //           Participate
    //         </Button>
    //       </>
    //     ) : (
    //       <Button color="blue" onClick={handleParticipate}>
    //         <Icon name="calendar plus" />
    //         Participate
    //       </Button>
    //     )}
    //   </List.Content>
    //   <List.Icon name="calendar" />
    //   <List.Content>
    //     <List.Header
    //       as="a"
    //       onClick={() => navigate(`/events/${event.event_id}`)}
    //     >
    //       {event.name}
    //     </List.Header>
    //     <List.Description>{event.description}</List.Description>
    //     <List.Description>
    //       {event.start_time} - {event.end_time}
    //     </List.Description>
    //     <List.Description>
    //       is participant registered: {event.is_participant ? "Yes" : "No"}
    //     </List.Description>
    //     <List.Description>
    //       is he volunteering: {event.is_volunteer ? "Yes" : "No"}
    //     </List.Description>
    //   </List.Content>
    // </List.Item>

    <Card centered style={style} className="event-item-animation" as={Link} to={`/events/${event.event_id}`}
    // className="fadeIn"
    >

      <Card.Content>
        <Header as="h2" style={{ marginBottom: "10px" }}>
          <a >{event.name}</a>
        </Header>

      </Card.Content>
      <Card.Content>
        <Card.Description>
          {event.description}
        </Card.Description>
        {new Date().getTime() > new Date(event.start_time).getTime() && new Date().getTime() < new Date(event.end_time).getTime() ? (
          <Label color='green' ribbon='right' as='a'>
            Live
          </Label>
        ) : new Date().getTime() < new Date(event.start_time).getTime() ? (
          <Label color='teal' ribbon='right' as='a'>
            Upcoming
          </Label>
        ) : (
          <Label color='red' ribbon='right' as='a'>
            Completed
          </Label>
        )}
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <Icon name='time' />
          {`Starting at ${new Date(new Date(event.start_time).getTime()).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}`}
          <br />
          <Icon name='time' />
          {`Ends at ${new Date(new Date(event.end_time).getTime()).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}`}
        </Card.Description>

      </Card.Content>
      {reg_or_vol === "Volunteer" ? (
        <Card.Content>
          <Button fluid>
            <Icon name="handshake" />
            Volunteering for this event
          </Button>
        </Card.Content>
      ) : (reg_or_vol === "Participant" ? (
        <Card.Content>
          <Button positive fluid>
            <Icon name="check" />
            Already Registered
          </Button>
        </Card.Content>
      ) : (
        null
      ))}

    </Card>
  );
};

export default EventListItem;
