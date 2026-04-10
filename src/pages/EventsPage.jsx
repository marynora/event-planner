import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <Box>
      <Heading mb={6}>List of events</Heading>

      {events.map((event) => (
        <Text key={event.id}>{event.title}</Text>
      ))}
    </Box>
  );
};
