// path: frontend/src/components/accommodation/AccoList.js

import React, { useEffect, useState } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useAuth } from "../../contexts/AuthContext";
import AnyReactComponent from "./AnyReactComponent";
import ChooseLocationMap from "./LocationMarker";
import AccoListItem from "./AccoListItem";
import {
  Button,
  Card,
  Dropdown,
  Grid,
  Header,
  HeaderContent,
  Loader,
  Message,
} from "semantic-ui-react";

const AccoList = () => {
  const [accomodations, setAccomodations] = useState([]);
  const [myAccomodation, setMyAccomodation] = useState("");
  const [selectedAccommodationId, setSelectedAccommodationId] = useState(null);

  // usestate to store lat and long combined
  const [center, setCenter] = useState({ lat: 22.3149, lng: 90.3105 });
  const { currentUser } = useAuth();
  const { isMobile } = useScreenSize(); // Utilizing the screen size context
  const [loading, setLoading] = useState(true);
  const fetchAccomodation = async () => {
    // setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/student/accomodations`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const allocatedAccommodation = data.find(
          (accommodation) => accommodation.is_allocated
        );

        if (allocatedAccommodation) {
          setMyAccomodation(allocatedAccommodation);
          const [lat, long] = allocatedAccommodation.coordinates.split(" ");

          console.log(lat, long);
          setCenter({ lat: parseFloat(lat), lng: parseFloat(long) });
        } else {
          setAccomodations(data);
        }
      } else {
        // Handle errors here
        console.error("Error fetching accomodation:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching accomodation:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAccomodation();
  }, []);

  const allocateAccommodation = async () => {
    setLoading(true);
    if (!selectedAccommodationId) {
      alert("Please select an accommodation.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/student/accomodations/allocate/${selectedAccommodationId}`,
        {
          method: "POST", // Assuming POST request for allocation
          credentials: "include", // Assuming cookies are used for session management
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Allocation successful:", data);
        // Update UI accordingly
        // For example, you could fetch accommodations again to refresh the list
        fetchAccomodation();
      } else {
        console.error("Error allocating accommodation:", response.statusText);
        // Handle errors here, such as showing an error message to the user
      }
    } catch (error) {
      console.error("Error allocating accommodation:", error);
      // Handle errors here, such as showing an error message to the user
    }
    // setLoading(false);
  };

  return (
    <>
      <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
        Accommodation
      </Header>

      {/* <ChooseLocationMap /> */}

      {loading ? (
        <Loader active>Loading Accommodations...</Loader>
      ) : (
        <div>
          {myAccomodation ? (
            <div>
              <Message
                positive
                header="Your allocation has been confirmed !!"
              />
              <Card.Group centered stackable itemsPerRow={3}>
                <AccoListItem
                  key={myAccomodation.accommodation_id}
                  acc={myAccomodation}
                />
              </Card.Group>
              <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
                Location
              </Header>
              <AnyReactComponent center={center} />
            </div>
          ) : (
            <>
              <Header>
                <Message
                  warning
                  header="You have not been allocated an accomodation !!"
                />
                <HeaderContent
                  centered
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    I want to stay in{" "}
                    <Dropdown
                      as="h1"
                      align="left"
                      inline
                      search
                      placeholder="Select Accomodation"
                      style={{ color: "#2185d0" }}
                      searchInput={{ icon: "search", iconPosition: "left" }}
                      options={accomodations.map((accomodation) => ({
                        key: accomodation.accommodation_id,
                        text: `${accomodation.name} ${
                          accomodation.filled === accomodation.capacity
                            ? "(Full)"
                            : ""
                        }`,
                        value: accomodation.accommodation_id,
                        disabled: accomodation.filled === accomodation.capacity,
                      }))}
                      onChange={(e, data) => {
                        setSelectedAccommodationId(data.value);
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      positive
                      onClick={allocateAccommodation}
                      disabled={selectedAccommodationId === null}
                    >
                      Go
                    </Button>
                  </div>
                </HeaderContent>
              </Header>

              <Card.Group stackable itemsPerRow={3}>
                {accomodations.map((acc, index) => (
                  <AccoListItem key={index} acc={acc} index={index} />
                ))}
              </Card.Group>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AccoList;
