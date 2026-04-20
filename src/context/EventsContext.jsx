import { createContext, useContext, useEffect, useState } from "react";
import { toaster } from "../components/ui/toaster";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

      try {
    const eventsResponse = await fetch("http://localhost:3000/events");
    const categoriesResponse = await fetch("http://localhost:3000/categories");

      if (!eventsResponse.ok || !categoriesResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const eventsData = await eventsResponse.json();
      const categoriesData = await categoriesResponse.json();

      setEvents(eventsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: "Could not load events.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) throw new Error("Failed to add event");

      await fetchData();

      toaster.create({
        title: "Success",
        description: "Event added successfully.",
        type: "success",
      });

      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: "Could not add event.",
        type: "error",
      });
      return false;
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${updatedEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        },
      );

      if (!response.ok) throw new Error("Failed to update event");

      await fetchData();

      toaster.create({
        title: "Success",
        description: "Event updated successfully.",
        type: "success",
      });

      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: "Could not update event.",
        type: "error",
      });
      return false;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      await fetchData();

      toaster.create({
        title: "Success",
        description: "Event deleted successfully.",
        type: "success",
      });

      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: "Could not delete event.",
        type: "error",
      });
      return false;
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        categories,
        loading,
        addEvent,
        updateEvent,
        deleteEvent,
        fetchData,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
