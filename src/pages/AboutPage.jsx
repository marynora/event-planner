import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

export const AboutPage = () => {
  return (
    <Box bg="#916348" minH="100vh">
      <VStack spacing={20} align="stretch">
        <Box
          position="relative"
          h={{ base: "70vh", md: "100vh" }}
          overflow="hidden"
          mb={{ base: 12, md: 20 }}
        >
          <Image
            src="https://plus.unsplash.com/premium_vector-1711987817831-55bfbf7200a6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About hero"
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
              mb={8}
            >
              About Sundown Social
            </Heading>

            <Text
              fontFamily="'Thasadith', sans-serif"
              fontWeight="bold"
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              textShadow="0 3px 18px rgba(0,0,0,0.28)"
              maxW="900px"
              lineHeight="1.8"
            >
              In a world full of scrolling, swiping, cancelling, rescheduling
              and staying in “just this once”, we wanted to create a place that
              makes going out and connecting feel exciting again.
            </Text>
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

        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          gap={10}
          px={12}
        >
          <Box flex="1">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
              alt="Friends enjoying time together outdoors"
              w="100%"
              h={{ base: "280px", md: "500px" }}
              objectFit="cover"
            />
          </Box>

          <VStack flex="1" align="start" spacing={5}>
            <Heading
              fontFamily="'Italiana', serif"
              fontWeight="bold"
              color="#f8e7d2"
              fontSize={{ base: "2xl", md: "4xl" }}
            >
              Why this site exists
            </Heading>

            <Text
              fontFamily="'Thasadith', sans-serif"
              color="white"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold"
              lineHeight="1.8"
              mb={4}
            >
              After the pandemic, and with social media becoming such a huge
              part of everyday life, a lot of people started feeling more
              disconnected from each other. Loneliness and isolation seems like
              the new pandemic.
            </Text>

            <Text
              fontFamily="'Thasadith', sans-serif"
              color="white"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold"
              lineHeight="1.8"
              mb={4}
            >
              This platform was created to make it easier to discover fun,
              low-pressure events where people can step away from screens, meet
              up, laugh, try something new and enjoy being around fellow humans
              again.
            </Text>
          </VStack>
        </Flex>

        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          align="center"
          gap={10}
          px={{ base: 6, md: 12 }}
        >
          <VStack flex="1" align="start" spacing={5}>
            <Heading
              fontFamily="'Italiana', serif"
              fontWeight="bold"
              color="#f8e7d2"
              fontSize={{ base: "2xl", md: "4xl" }}
            >
              Not too serious. Still important.
            </Heading>

            <Text
              fontFamily="'Thasadith', sans-serif"
              color="white"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold"
              lineHeight="1.8"
              mb={4}
            >
              Not every event has to be life-changing. Sometimes the best plans
              are simply the ones that get you out of the house. Either to
              unleash your inner-child, to relax with some tea, or to learn new
              things.
            </Text>

            <Text
              fontFamily="'Thasadith', sans-serif"
              color="white"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold"
              lineHeight="1.8"
              mb={4}
            >
              We believe little moments matter. Those moments where you become
              pleasantly surprised with the outcome. A good memory does not
              always start with a big plan. Sometimes it starts with someone
              saying: “you coming?”
            </Text>
          </VStack>

          <Box flex="1">
            <Image
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80"
              alt="People at a lively gathering"
              w="100%"
              h={{ base: "280px", md: "500px" }}
              objectFit="cover"
              mb={6}
            />
          </Box>
        </Flex>

        <Box
          px={{ base: 6, md: 12 }}
          pb={{ base: 14, md: 20 }}
          textAlign="center"
        >
          <Heading
            fontFamily="'Italiana', serif"
            fontWeight="bold"
            color="#f8e7d2"
            fontSize={{ base: "2xl", md: "4xl" }}
            mb={5}
          >
            A small excuse to make real plans
          </Heading>

          <Text
            fontFamily="'Thasadith', sans-serif"
            color="white"
            fontSize={{ base: "md", md: "xl" }}
            fontWeight="bold"
            maxW="950px"
            mx="auto"
            lineHeight="1.8"
            mb={4}
          >
            Whether you are looking for something energetic, social, silly or
            just different from your usual routine, this site was built to bring
            events together in one inviting place. A place where you can be
            yourself and let loose. We all need a few more reasons to actually
            be present and go live a little more.
          </Text>
          <Text
            fontFamily="'Thasadith', sans-serif"
            color="white"
            fontSize={{ base: "md", md: "xl" }}
            fontWeight="bold"
            maxW="950px"
            mx="auto"
            lineHeight="1.8"
          >
            So... <br></br> Are you coming?
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};
