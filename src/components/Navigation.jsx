import { Flex, Button, Link } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

export const Navigation = ({ onOpenAddEvent }) => {
  return (
    <Flex
      as="nav"
      position="fixed"
      left="0"
      right="0"
      zIndex="20"
      align="center"
      bg="rgba(76, 54, 30, 0.35)"
      backdropFilter="blur(10px)"
      px={{ base: 6, md: 10, lg: 14 }}
      py={3}
      fontFamily="'Thasadith', sans-serif"
      fontWeight="medium"
      fontSize={{ base: "lg", md: "xl" }}
    >
      <Flex
        align="center"
        justify="space-between"
        w="100%"
        maxW="1500px"
        mx="auto"
      >
        <Flex flex="1" justify="flex-start" gap={8}>
          <Link
            as={RouterLink}
            to="/"
            color="white"
            fontWeight="bold"
            textDecoration="none"
            _hover={{
              textDecoration: "none",
              transform: "translateY(-1px)",
              color: "#f5e3d2",
            }}
          >
            Events
          </Link>

          <Link
            as={RouterLink}
            to="/about"
            color="white"
            fontWeight="bold"
            textDecoration="none"
            _hover={{
              textDecoration: "none",
              transform: "translateY(-1px)",
              color: "#f5e3d2",
            }}
          >
            About
          </Link>
        </Flex>

        <Flex flex="1" justify="flex-end">
          <Button
            bg="rgba(255, 255, 255, 0.22)"
            fontSize="lg"
            fontWeight="bold"
            color="white"
            onClick={onOpenAddEvent}
            _hover={{
              transform: "translateY(-1px)",
              bg: "rgba(255,255,255,0.30)",
            }}
          >
            Add Event
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};