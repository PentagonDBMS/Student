import React, { useState, useEffect } from "react";
import { Container, Menu, Icon, Dropdown, Image } from "semantic-ui-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext"; // Assuming this is implemented
import logo from "../../images/fest-removebg.png";
import studentImage from "../../images/student.png";
import externlImage from "../../images/formalman.png";

const StudentHeader = () => {
  const { currentUser, logout } = useAuth();
  const trigger = (
    <span>
      {/* <Image avatar src={logo} /> */}
      {currentUser && currentUser.isstudent ? (
        <Image avatar src={studentImage} />
      ) : (
        <Image avatar src={externlImage} />
      )}
    </span>
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useScreenSize(); // Utilizing the screen size context
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // Update the active item based on the URL path
    const path = location.pathname.split("/")[1];
    setActiveItem(path || "dashboard");
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Container textAlign="center" style={{ margin: "20px 0" }}>
      <Menu size={!isMobile && "massive"}>
        {isMobile && (
          <Dropdown item icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/dashboard"
                active={activeItem === "dashboard"}
              >
                <Icon name="dashboard" /> Dashboard
              </Dropdown.Item>

              {currentUser && (
                <>
                  <Dropdown.Item
                    as={Link}
                    to="/events"
                    active={activeItem === "events"}
                  >
                    <Icon name="calendar" /> Events
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/my-events"
                    active={activeItem === "my-events"}
                  >
                    <Icon name="calendar" /> My Events
                  </Dropdown.Item>
                  {currentUser && currentUser.isstudent ? null : (
                    <Dropdown.Item
                      as={Link}
                      to="/accommodation"
                      active={activeItem === "accommodation"}
                    >
                      <Icon name="hotel" /> Accommodation
                    </Dropdown.Item>
                  )}
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}
        <Menu.Item as={Link} to="/dashboard">
          <Image
            src="https://react.semantic-ui.com/logo.png"
            alt="logo"
            size="mini"
            style={{ marginRight: "1.5em" }}
          />
        </Menu.Item>
        {!isMobile && (
          <>
            <Menu.Item
              as={Link}
              to="/dashboard"
              name="dashboard"
              active={activeItem === "dashboard"}
            >
              <Icon name="dashboard" /> Dashboard
            </Menu.Item>
            {currentUser && (
              <>
            <Menu.Item
              as={Link}
              to="/events"
              name="events"
              active={activeItem === "events"}
            >
              <Icon name="calendar" /> Events
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/my-events"
              name="my-events"
              active={activeItem === "my-events"}
            >
              <Icon name="calendar" /> My Events
            </Menu.Item>
            {currentUser.isstudent ? null : (
              <Menu.Item
                as={Link}
                to="/accommodation"
                name="accommodation"
                active={activeItem === "accommodation"}
              >
                <Icon name="hotel" /> Accommodation
              </Menu.Item>
            )}
            </>
            )}
          </>
        )}
        {!currentUser && (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={activeItem === "login"}
            >
              <Icon name="sign in" /> Login
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/register"
              name="register"
              active={activeItem === "register"}
            >
              <Icon name="signup" /> Register
            </Menu.Item>
          </Menu.Menu>
        )}
        {currentUser && (
          <Dropdown item pointing="top right" trigger={trigger}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/profile"
                text={currentUser.name}
                icon="user"
              />
              <Dropdown.Item
                onClick={handleLogout}
                text="Logout"
                icon="sign out"
              />
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu>
    </Container>
  );
};

export default StudentHeader;
