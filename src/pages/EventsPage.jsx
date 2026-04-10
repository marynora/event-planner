import { useEffect, useState } from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
    };

    const fetchCategories = async () => {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data);
    };

    fetchEvents();
    fetchCategories();
  }, []);

const getCategoryNames = (categoryIds) => {
  return categories
    .filter((category) => categoryIds.includes(category.id))
    .map((category) => category.name);
};

  return (
    <Box>
      <Heading mb={6}>List of events</Heading>

      {events.map((event) => (
        <Link
          key={event.id}
          to={`/event/${event.id}`}
          >
        <Box mb={8} p={4} borderWidth="1px" borderRadius="md">
          <Image
            src={event.image}
            alt={event.title}
            mb={4}
            borderRadius="md"
            maxH="250px"
            objectFit="cover"
            w="100%"
          />

          <Heading size="md" mb={2}>
            {event.title}
          </Heading>

          <Text mb={2}>{event.description}</Text>
          <Text mb={1}>
            Start: {""}
            {new Date(event.startTime).toLocaleString("nl-NL", {
              day: "2-digit",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text mb={2}>
            End: {""}
            {new Date (event.endTime).toLocaleString("nl-NL", {
              day: "2-digit",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
             })}
            </Text>
          <Text>
            Categories: {getCategoryNames(event.categoryIds).join(", ")}
          </Text>
        </Box>
        </Link>
      ))}
    </Box>
  );
};
