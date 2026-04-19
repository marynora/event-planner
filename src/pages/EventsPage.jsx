import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  Input,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

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

const toggleCategory = (categoryId) => {
  if (selectedCategories.includes(categoryId)) {
    setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
  } else {
    setSelectedCategories([...selectedCategories, categoryId]);
  }
};

const filteredEvents = events.filter((event) => {
  const matchesSearch = event.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategories =
    selectedCategories.length === 0 ||
    selectedCategories.some((selectedCategoryId) =>
      event.categoryIds.includes(selectedCategoryId),
    );

  return matchesSearch && matchesCategories;
});

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

  return (
    <Box bg="#caa377" minH="100vh">
      <Box pb={{ base: 10, md: 14 }}>
        <Box
          position="relative"
          h={{ base: "70vh", md: "100vh" }}
          overflow="hidden"
          mb={{ base: 12, md: 20 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Events hero"
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center"
            position="absolute"
            inset="0"
          />

          <Box position="absolute" inset="0" bg="blackAlpha.400" />

          <Flex
            position="relative"
            zIndex="1"
            h="100%"
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
            px={6}
          >
            <Heading
              fontFamily="'Italiana', sans-serif"
              color="white"
              textShadow="0 3px 18px rgba(0,0,0,0.28)"
              fontWeight="bold"
              lineHeight="0.95"
              fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }}
              mb={10}
            >
              Current Events
            </Heading>
            <Text
              fontFamily="'Thasadith', sans-serif"
              fontWeight="bold"
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              textShadow="0 3px 18px rgba(0,0,0,0.28)"
              mb={5}
            >
              Discover what is happening next...
            </Text>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={2}
              w={{ base: "100%", sm: "auto" }}
              align="center"
            >
              <Input
                fontFamily="'Thasadith', sans-serif"
                fontWeight="medium"
                fontSize={{ base: "lg", md: "xl" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                color="gray.700"
                bg="rgba(255,255,255,0.58)"
                border="1px solid"
                borderColor="gray.300"
                backdropFilter="blur(4px)"
                h="58px"
                w={{ base: "100%", sm: "320px", md: "380px" }}
              />

              <Button
                h="58px"
                px={8}
                fontFamily="'Thasadith', sans-serif"
                fontWeight="medium"
                fontSize={{ base: "lg", md: "xl" }}
                bg="rgba(255,255,255,0.58)"
                color="gray.600"
                border="1px solid"
                borderColor="rgba(255,255,255,0.28)"
                backdropFilter="blur(4px)"
                _hover={{ bg: "rgba(255,255,255,0.68)" }}
              >
                Search
              </Button>
            </Flex>

            <HStack mt={5} gap={3} wrap="wrap" justify="center">
              {categories.map((category) => {
                const isActive = selectedCategories.includes(category.id);

                return (
                  <Button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    borderRadius="full"
                    fontFamily="'Thasadith', sans-serif"
                    fontWeight="medium"
                    fontSize={{ base: "lg", md: "xl" }}
                    px={5}
                    py={2}
                    size="sm"
                    textTransform="uppercase"
                    border="1px solid"
                    bg="transparent"
                    color={isActive ? "black" : "white"}
                    borderColor="whiteAlpha.700"
                    _hover={{
                      bg: isActive ? "white" : "whiteAlpha.400",
                    }}
                  >
                    {category.name}
                  </Button>
                );
              })}
            </HStack>
          </Flex>
        </Box>

        <Box maxW="1500px" mx="auto">   
        <VStack 
          gap={{ base: 16, md: 28, lg: 32 }}
          px={{ base: 6, md: 12 }}
          pb={{ base: 12, md: 20 }}
          align="stretch"
          >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              const categoryNames = getCategoryNames(event.categoryIds);

              return (
              <Link 
                key={event.id} 
                to={`/event/${event.id}`}
              >  
               <Flex
                 direction={{
                  base: "column",
                  md: isEven ? "row" : "row-reverse",
                }}
                 align="center"
                 justify="center"
                 gap={{ base: 8, md: 10, lg: 12 }}
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
                      fontStyle="normal"
                      fontSize="6xl"
                      lineHeight="1"
                      color="#f9d4b0"
                    >
                      {event.title}
                    </Heading>

                     <Text
                       fontFamily="'Thasadith', sans-serif"
                       fontWeight="medium"
                       fontSize={{ base: "lg", md: "xl" }}
                       color="#fff6ee"
                       lineHeight="1.8"
                       mb={7}
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
                      <strong>From:</strong> {formatDate(event.startTime)}{" "}
                      at {formatTime(event.startTime)}
                    </Text>

                     <Text
                       fontFamily="'Thasadith', sans-serif"
                       fontWeight="medium"
                       fontSize={{ base: "xl", md: "2xl" }}
                       color="#fff6ee"
                       mb={4}
                     >
                       <strong>To:</strong> {formatDate(event.endTime)} at{" "}
                       {formatTime(event.endTime)}
                      </Text>

                    <HStack gap={2} wrap="wrap">
                    {categoryNames.map((categoryName) => (
                          <Box
                            key={categoryName}
                            px={3}
                            py={1}
                            border="1px solid"
                            bg="rgba(250, 236, 199, 0.26)"
                            borderColor="#c4beb604"
                            letterSpacing="1px"
                            textTransform="uppercase"
                            fontSize="xs" 
                            fontFamily="'Thasadith', sans-serif"
                            fontWeight="bold"
                            color="#fff6ee"
                            >
                            {categoryName}
                          </Box>
                      ))}
                    </HStack>
                  </Box>
                </Flex>
              </Flex>
            </Link>
            );
          })
          ) : (
            <Box py={10}>
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="medium"
                  mb={3}
                  color="#2a2926"
                >
                  No events found
                </Heading>
                <Text color="#5a564f">
                  Try a different search term or remove a few filters.
                </Text>
                </Box>
          )}
        </VStack>
      </Box>
    </Box>
    </Box>
  );
};
