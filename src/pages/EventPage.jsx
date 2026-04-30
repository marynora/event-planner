import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Heading,
  HStack,
  Image,
  Portal,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { useEvents } from "../context/EventsContext";
import { EventForm } from "../components/EventForm";


export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, categories, updateEvent, deleteEvent, loading } = useEvents();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const event = events.find((item) => String(item.id) === eventId);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box bg="#caa377" minH="100vh" p={6}>
        <Box maxW="1500px" mx="auto" pt={{ base: 10, md: 16 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 10, md: 14, lg: 20 }}
            align="center"
          >
            <Skeleton
              w={{ base: "100%", md: "560px", lg: "620px" }}
              h={{ base: "240px", md: "320px", lg: "360px" }}
            />
            <Box flex="1" w="100%">
              <Skeleton height="70px" mb={4} />
              <Skeleton height="24px" mb={8} />

              <Skeleton height="30px" mb={3} />
              <Skeleton height="30px" mb={3} />
              <Skeleton height="30px" mb={6} />

              <HStack gap={2} mb={8}>
                <Skeleton height="30px" width="90px" />
                <Skeleton height="30px" width="110px" />
              </HStack>

              <HStack gap={3}>
                <Skeleton height="44px" width="120px" />
                <Skeleton height="44px" width="140px" />
              </HStack>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box bg="#caa377" minH="100vh" p={6}>
        <Heading color="#fff6ee" size="md">
          Event not found.
        </Heading>
      </Box>
    );
  }

  const categoryNames = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((category) => category.name);

  const handleEdit = async (updatedData) => {
    const success = await updateEvent(updatedData);

    if (success) {
       setEditOpen(false); 
    }
  };

  const handleDelete = async () => {
    const success = await deleteEvent(event.id);

    if (success) {
      navigate("/");
    }
  };

  return (
    <Box
      minH="100vh"
      position="relative"
      bgImage="url('/gradientbg.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box pb={{ base: 10, md: 14 }}>
        <Box position="absolute" inset="0" bg="rgba(40, 20, 0, 0.2)" />

        <Box position="relative" zIndex="1">
          <Flex
            minH="100vh"
            align="center"
            justify="center"
            px={{ base: 6, md: 12 }}
            pt={{ base: 20, md: 10 }}
          >
            <Box maxW="1500px" w="100%">
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="center"
                gap={{ base: 10, md: 14, lg: 20 }}
              >
                <Box flex="1" display="flex" justifyContent="center">
                  <Image
                    src={event.image}
                    alt={event.title}
                    w={{ base: "100%", md: "560px", lg: "620px" }}
                    h={{ base: "240px", md: "320px", lg: "360px" }}
                    objectFit="cover"
                  />
                </Box>

                <Flex flex="1" justify="center" align="center">
                  <Box maxW="500px" w="100%">
                    <Heading
                      fontFamily="'Italiana', sans-serif"
                      fontWeight="bold"
                      lineHeight="1"
                      fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                      color="#FFFEAE"
                      mb={4}
                    >
                      {event.title}
                    </Heading>

                    <Text
                      fontFamily="'Thasadith', sans-serif"
                      fontWeight="bold"
                      fontSize={{ base: "lg", md: "xl" }}
                      color="#fff6ee"
                      lineHeight="1.8"
                      mb={8}
                    >
                      {event.description}
                    </Text>

                    <Text
                      fontFamily="'Thasadith', sans-serif"
                      fontWeight="medium"
                      fontSize={{ base: "xl", md: "2xl" }}
                      color="#fff6ee"
                      mb={2}
                    >
                      <strong>From:</strong> {formatDate(event.startTime)} at{" "}
                      {formatTime(event.startTime)}
                    </Text>

                    <Text
                      fontFamily="'Thasadith', sans-serif"
                      fontWeight="medium"
                      fontSize={{ base: "xl", md: "2xl" }}
                      color="#fff6ee"
                      mb={2}
                    >
                      <strong>To:</strong> {formatDate(event.endTime)} at{" "}
                      {formatTime(event.endTime)}
                    </Text>

                    <Text
                      fontFamily="'Thasadith', sans-serif"
                      fontWeight="medium"
                      fontSize={{ base: "xl", md: "2xl" }}
                      color="#fff6ee"
                      mb={6}
                    >
                      <strong>Location:</strong> {event.location}
                    </Text>

                    <HStack gap={2} wrap="wrap" mb={8}>
                      {categoryNames.map((categoryName) => (
                        <Box
                          key={categoryName}
                          px={3}
                          py={1.5}
                          border="1px solid"
                          borderColor="#c4beb604"
                          color="#fff6ee"
                          letterSpacing="1px"
                          textTransform="uppercase"
                          bg="rgba(250, 236, 199, 0.26)"
                          fontFamily="'Thasadith', sans-serif"
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          {categoryName}
                        </Box>
                      ))}
                    </HStack>

                    <HStack gap={3} pt={2}>
                      <Button
                        onClick={() => setEditOpen(true)}
                        fontFamily="'Thasadith', sans-serif"
                        fontWeight="medium"
                        fontSize={{ base: "lg", md: "xl" }}
                        bg="rgba(255,255,255,0.18)"
                        color="white"
                        border="1px solid"
                        borderColor="rgba(255,255,255,0.28)"
                        backdropFilter="blur(4px)"
                        _hover={{ bg: "rgba(255,255,255,0.28)" }}
                      >
                        Edit Event
                      </Button>

                      <Button
                        onClick={() => setDeleteOpen(true)}
                        fontFamily="'Thasadith', sans-serif"
                        fontWeight="medium"
                        fontSize={{ base: "lg", md: "xl" }}
                        bg="rgba(0, 0, 0, 0.18)"
                        color="white"
                        border="1px solid"
                        borderColor="rgba(255,255,255,0.22)"
                        backdropFilter="blur(4px)"
                        _hover={{ bg: "rgba(0,0,0,0.28)" }}
                      >
                        Delete Event
                      </Button>
                    </HStack>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Dialog.Root
            open={editOpen}
            onOpenChange={(details) => setEditOpen(details.open)}
          >
            <Portal>
              <Dialog.Backdrop bg="blackAlpha.600" />
              <Dialog.Positioner>
                <Dialog.Content
                  bg="#e6d3be"
                  color="#2a2926"
                  fontFamily={"'Thasadith', sans-serif"}
                  fontWeight="bold"
                >
                  <Dialog.Header>
                    <Dialog.Title
                      fontFamily="'Italiana', sans-serif"
                      fontSize="3xl"
                      color="#684a29"
                    >
                      Edit Event
                    </Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <EventForm
                      initialData={event}
                      onSubmit={handleEdit}
                      submitButtonText="Save changes"
                    />
                  </Dialog.Body>

                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <Dialog.Root
            open={deleteOpen}
            onOpenChange={(details) => setDeleteOpen(details.open)}
          >
            <Portal>
              <Dialog.Backdrop bg="blackAlpha.600" />
              <Dialog.Positioner>
                <Dialog.Content bg="#ebdccc" color="#2a2926">
                  <Dialog.Header>
                    <Dialog.Title
                      fontFamily="'Italiana', sans-serif"
                      fontSize="3xl"
                      color="#684a29"
                    >
                      Delete Event
                    </Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <Text
                      fontFamily="'Thasadith', sans-serif"
                      fontSize="lg"
                      fontWeight="bold"
                    >
                      Are you 100% sure you want to delete this event?
                    </Text>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Button
                      fontFamily="'Thasadith', sans-serif"
                      fontSize="md"
                      fontWeight="bold"
                      bg="#f6efe8"
                      _hover={{ bg: "#fcf9f6" }}
                      variant="outline"
                      onClick={() => setDeleteOpen(false)}
                    >
                      No
                    </Button>
                    <Button
                      fontFamily="'Thasadith', sans-serif"
                      fontSize="md"
                      fontWeight="bold"
                      bg="#684a29"
                      color="white"
                      _hover={{ bg: "#76542e" }}
                      onClick={handleDelete}
                    >
                      Yes, delete
                    </Button>
                  </Dialog.Footer>

                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Box>
      </Box>
    </Box>
  );
};
