const supabase = require("../db");

// Get all events visible to students
const getAllEvents = async (studentId) => {
  try {
    // Fetch all events
    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*");

    if (eventsError) {
      console.error("Error fetching events:", eventsError.message);
      throw eventsError;
    }

    console.log("Event Got\n\n");
    // Fetch events where the student is a participant
    const { data: participantEvents, error: participantEventsError } =
      await supabase
        .from("participants")
        .select("event_id")
        .eq("students_or_externals_id", studentId);

    if (participantEventsError) {
      console.error(
        "Error fetching participant events:",
        participantEventsError.message
      );
      throw participantEventsError;
    }
    console.log("Participant GOt \n\n");

    const participantEventIds = participantEvents.map(
      (event) => event.event_id
    );

    // Fetch events where the student is a volunteer
    const { data: volunteerEvents, error: volunteerEventsError } =
      await supabase
        .from("volunteers")
        .select("event_id")
        .eq("students_or_externals_id", studentId);

    if (volunteerEventsError) {
      console.error(
        "Error fetching volunteer events:",
        volunteerEventsError.message
      );
      throw volunteerEventsError;
    }
    console.log("Voullenteer, Extracted\n\n");

    const volunteerEventIds = volunteerEvents.map((event) => event.event_id);

    // Combine all events with participant and volunteer information
    const enrichedEvents = events.map((event) => ({
      ...event,
      is_participant: participantEventIds.includes(event.event_id),
      is_volunteer: volunteerEventIds.includes(event.event_id),
    }));

    console.log("Enriched events:", enrichedEvents);
    return enrichedEvents;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const getAllEvents2 = async (studentId) => {
  try {
    // Fetch all events
    const { data, error } = await supabase.rpc(
      "get_event_participation_details",
      {
        students_or_externals_id_param: studentId,
      }
    );
    if (error) console.error(error);
    else console.log(data);

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Get events by student id
const getEventsByStudentId = async (studentId, event_id) => {
  try {
    // Fetch all events
    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .eq("event_id", event_id);

    if (eventsError) {
      console.error("Error fetching events:", eventsError.message);
      throw eventsError;
    }

    // Fetch events where the student is a participant
    const { data: participantEvents, error: participantEventsError } =
      await supabase
        .from("participants")
        .select("event_id")
        .eq("students_or_externals_id", studentId);

    if (participantEventsError) {
      console.error(
        "Error fetching participant events:",
        participantEventsError.message
      );
      throw participantEventsError;
    }

    const participantEventIds = participantEvents.map(
      (event) => event.event_id
    );

    // Fetch events where the student is a volunteer
    const { data: volunteerEvents, error: volunteerEventsError } =
      await supabase
        .from("volunteers")
        .select("event_id")
        .eq("students_or_externals_id", studentId);

    if (volunteerEventsError) {
      console.error(
        "Error fetching volunteer events:",
        volunteerEventsError.message
      );
      throw volunteerEventsError;
    }

    const volunteerEventIds = volunteerEvents.map((event) => event.event_id);

    // Combine all events with participant and volunteer information
    const enrichedEvents = events.map((event) => ({
      ...event,
      is_participant: participantEventIds.includes(event.event_id),
      is_volunteer: volunteerEventIds.includes(event.event_id),
    }));

    console.log("Enriched events:", enrichedEvents);
    return enrichedEvents;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const getEventsByStudentId2 = async (studentId, event_id) => {
  try {
    // Fetch all events
    const { data, error } = await supabase
      .rpc("get_event_participation_details", {
        students_or_externals_id_param: studentId,
      })
      .eq("event_id", event_id);
    if (error) console.error(error);
    else console.log(data);

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Get all events registered by a participant
const getRegisteredEventsForParticipant = async (participantId) => {
  let { data: registered_events, error } = await supabase
    .from("event_participants")
    .select("events.*")
    .eq("students_or_externals_id", participantId)
    .join("events", { "event_participants.event_id": "events.event_id" });
  if (error) throw error;
  return registered_events;
};

module.exports = {
  getAllEvents,
  getAllEvents2,
  getEventsByStudentId,
  getEventsByStudentId2,
  getRegisteredEventsForParticipant,
};
