// Path: frontend/src/components/accommodation/AccoListItem.js

// CREATE TABLE accommodation (
//     accommodation_id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     address TEXT NOT NULL,
//     filled INT NOT NULL,
//     capacity INT NOT NULL,
//     photo_link TEXT
// );

import React from "react";
import { Button, Icon, Card, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AccoListItem = ({ acc, index }) => {
  const [style, setStyle] = useState({
    opacity: 0,
    transform: "translateY(20px)",
  });

  useEffect(() => {
    // Start the animation after a delay based on the index
    const delay = (index + 1) * 100; // Delay in milliseconds
    const animationDuration = 500; // Duration in milliseconds
    const timer = setTimeout(() => {
      setStyle({
        opacity: 1,
        transform: "translateY(0)",
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
    <Card centered style={style} className="event-item-animation" as={Link}>
      {acc.photo_link && <Image src={acc.photo_link} alt={acc.name} fluid />}
      <Card.Content>
        <Card.Header>
          <a>{acc.name}</a>
        </Card.Header>
      </Card.Content>
      {/* <Card.Content></Card.Content> */}
      <Card.Content>
        <Card.Description>
          <Icon name="map marker alternate" />
          {acc.address}
        </Card.Description>
        <Card.Description>Filled: {acc.filled}</Card.Description>
        <Card.Description>Capacity: {acc.capacity}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default AccoListItem;
