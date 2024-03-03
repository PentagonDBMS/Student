import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { useAuth } from "./contexts/AuthContext";
import StudentHeader from "./components/layout/Header";

import Footer from "./components/layout/Footer";
import LoadingPage from "./components/layout/LoadingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/admin/Dashboard";
import EventList from "./components/events/EventList";
import EventDetails from "./components/events/EventDetails";
import MyEventList from "./components/my_events/MyEventList";

import AccoList from "./components/accommodation/AccoList";
import WorkCard from "./components/WorkCard";
import Profile from "./components/myprofile/Profile";

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="App">
      <StudentHeader />
      <Container
        style={{ paddingTop: "20px", paddingBottom: "20px", minHeight: "80vh" }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={ <Dashboard />}
          />
          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!currentUser ? <Register /> : <Navigate to="/dashboard" />}
            // dont ask colllege if isstudent
          />
          <Route
            path="/events"
            element={currentUser ? <EventList /> : <Navigate to="/login" />}
          />
          <Route
            path="/events/:id"
            element={currentUser ? <EventDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-events"
            element={currentUser ? <MyEventList /> : <Navigate to="/login" />}
          />
          <Route
            path="/accommodation"
            element={currentUser ? <AccoList /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={currentUser ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
