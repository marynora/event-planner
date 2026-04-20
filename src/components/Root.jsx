import { Outlet } from "react-router-dom";
import { Box, Dialog, Portal, useDisclosure } from "@chakra-ui/react";
import { Navigation } from "./Navigation";
import { EventForm } from "./EventForm";
import { useEvents } from "../context/EventsContext";

export const Root = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const { addEvent } = useEvents();

  const handleAddEvent = async (formData) => {
    const success = await addEvent(formData);
    if (success) {
      onClose();
    }
  };

  return (
    <Box>
      <Navigation onOpenAddEvent={onOpen} />
      <Box>
        <Outlet />
      </Box>

      <Dialog.Root
        open={open}
        onOpenChange={(details) => !details.open && onClose()}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg="#c9a67d" color="gray.700">
              <Dialog.Header>
                <Dialog.Title
                  fontFamily="'Italiana', sans-serif"
                  fontSize="3xl"
                  fontWeight="bold"
                  color="#684a29"
                >
                  Add Event
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <EventForm onSubmit={handleAddEvent} />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};
