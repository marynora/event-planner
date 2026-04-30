import { useState, useEffect, useRef } from "react";
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
  Skeleton,
} from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

export const EventsPage = () => {
  const { events, categories, loading } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const eventsRef = useRef(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToEvents = () => {
    if (eventsRef.current) {
      eventsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      scrollToEvents();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCategoryNames = (categoryIds) => {
    return categories
      .filter((category) => categoryIds.includes(category.id))
      .map((category) => category.name);
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      scrollToEvents();
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
   <Box minH="100vh" position="relative" bg="#916348">
     <Box pb={{ base: 10, md: 14 }}>
       <Box position="absolute" inset="0" bg="transparent" />

       <Box position="relative" zIndex="1">
         <Box
           position="relative"
           h={{ base: "70vh", md: "100vh" }}
           overflow="hidden"
           mb={{ base: 12, md: 20 }}
         >
           <Image
             src="https://plus.unsplash.com/premium_vector-1711987817831-55bfbf7200a6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
               color="#FFFEAE"
               textShadow="0 3px 18px rgba(0,0,0,0.28)"
               fontWeight="bold"
               lineHeight="0.95"
               fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }}
               mb={6}
             >
               Sundown Social
             </Heading>
             <Text
               fontFamily="'Thasadith', sans-serif"
               fontWeight="bold"
               fontSize={{ base: "lg", md: "xl" }}
               color="whiteAlpha.900"
               textShadow="0 3px 18px rgba(0,0,0,0.28)"
               mb={5}
             >
               Browse through our current events
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
                 onKeyDown={handleSearchKeyDown}
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
                 onClick={scrollToEvents}
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
                     fontWeight="bold"
                     fontSize="lg"
                     px={5}
                     py={2}
                     size="sm"
                     textTransform="uppercase"
                     border="1px solid"
                     bg={isActive ? "#f6efe8" : "transparent"}
                     color={isActive ? "#684a29" : "white"}
                     borderColor={isActive ? "#f6efe8" : "whiteAlpha.700"}
                     _hover={{
                       bg: isActive ? "#fcf9f6" : "whiteAlpha.300",
                     }}
                   >
                     {category.name}
                   </Button>
                 );
               })}
             </HStack>
           </Flex>
           <Box
             position="absolute"
             bottom="0"
             left="0"
             right="0"
             height="350px"
             background="linear-gradient(to bottom, transparent 0%, rgba(181, 130, 88, 0.7) 55%, #916348 100%)"
             pointerEvents="none"
             zIndex="5"
           />
         </Box>

       <Box ref={eventsRef} maxW="1500px" mx="auto">
         <VStack
           gap={{ base: 16, md: 28, lg: 32 }}
           px={{ base: 6, md: 12 }}
           pb={{ base: 12, md: 20 }}
           align="stretch"
         >
           {loading ? (
             Array.from({ length: 3 }).map((_, index) => {
               const isEven = index % 2 === 0;

               return(
               <Flex
                 key={index}
                 direction={{ 
                  base: "column", 
                  md: isEven ? "row" : "row-reverse",
                 }}
                 gap={{ base: 8, md: 10, lg: 12 }}
                 align="center"
                 justify="center"
               >
                 <Box flex="1" display="flex" justifyContent="center">
                 <Skeleton
                   height={{ base: "240px", md: "320px", lg:"360px"}}
                   width={{ base: "100%", md: "560px", lg:"620px" }}
                 />
                 </Box>

                 <Flex flex="1" justify="center" align="center">
                  <Box maxW="500px" w="100%">
                   <Skeleton height="70px" mb={4} />
                   <Skeleton height="24px" mb={7} />

                   <Skeleton height="30px" mb={3} />
                   <Skeleton height="30px" mb={3} />
                   <Skeleton height="30px" mb={4}/>
                   
                   <Skeleton height="28px" width="90px" />
                  </Box> 
                </Flex>
              </Flex>
             );
            })
           ) : filteredEvents.length > 0 ? (
             filteredEvents.map((event, index) => {
               const isEven = index % 2 === 0;
               const categoryNames = getCategoryNames(event.categoryIds);

               return (
                 <Link key={event.id} to={`/event/${event.id}`}>
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
                             color="#FFFEAE"
                           >
                             {event.title}
                           </Heading>

                           <Text
                             fontFamily="'Thasadith', sans-serif"
                             fontWeight="bold"
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
                             <strong>From:</strong>{" "}
                             {formatDate(event.startTime)} at{" "}
                             {formatTime(event.startTime)}
                           </Text>

                           <Text
                             fontFamily="'Thasadith', sans-serif"
                             fontWeight="medium"
                             fontSize={{ base: "xl", md: "2xl" }}
                             color="#fff6ee"
                             mb={2}
                           >
                             <strong>To:</strong>{" "}
                             {formatDate(event.endTime)} at{" "}
                             {formatTime(event.endTime)}
                           </Text>

                         <Text
                           fontFamily="'Thasadith', sans-serif"
                           fontWeight="medium"
                           fontSize={{ base: "xl", md: "2xl" }}
                           color="#fff6ee"
                           mb={4}
                         >
                           <strong>Location:</strong> {event.location}
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
       {showScrollTop && (
         <Button
           position="fixed"
           bottom="30px"
           right="30px"
           zIndex="1000"
           borderRadius="full"
           bg="#4c361e"
           color="white"
           p={3}
           boxShadow="lg"
           onClick={scrollToTop}
           _hover={{ bg: "#6b4a2b", transform: "translateY(-2px)" }}
         >
           <FaArrowUp />
         </Button>
       )}
     </Box>
   </Box>
 );
};
