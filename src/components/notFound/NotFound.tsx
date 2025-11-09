"use client";

import { Box } from "@chakra-ui/react";

interface notFoundType {
  title: string;
  message: string;
}

const NotFound = ({ title, message }: notFoundType) => {
  return (
    <Box
      h="300px"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      color="gray.600"
      fontSize="xl"
      fontWeight="semibold"
      gap={3}
    >
      <Box fontSize="3xl" color="gray.400">
        🍽️
      </Box>
      <Box>{title}</Box>
      <Box fontSize="sm" color="gray.500">
        {message}
      </Box>
    </Box>
  );
};

export default NotFound;
