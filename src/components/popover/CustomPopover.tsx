import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Portal,
  Text,
  useDisclosure,
  Box,
  Flex,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { MdMyLocation } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import React from "react";

interface CustomPopoverProps {
  text: string;
  onDetectLocation?: () => void;
  isLoading?: boolean;
  currentLocation?: string;
}

const MotionPopoverContent = motion(PopoverContent);

const CustomPopover: React.FC<CustomPopoverProps> = ({
  text,
  onDetectLocation,
  isLoading = false,
  currentLocation = "Location not detected",
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-start"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button
          size="md"
          variant="solid"
          color="white"
          bg="linear-gradient(to-r, gray.900, blue.900)"
          onClick={onToggle}
          leftIcon={<FaLocationDot size={20} color="red" />}
          _hover={{
            bgGradient: "linear(to-r, teal.500, teal.600)",
            transform: "scale(1.03)",
          }}
          _active={{
            transform: "scale(0.97)",
          }}
          transition="all 0.2s ease"
          borderRadius="xl"
          px={5}
          py={3}
          fontWeight="semibold"
        >
          {text}
        </Button>
      </PopoverTrigger>

      <Portal>
        <MotionPopoverContent
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          borderRadius="xl"
          boxShadow="2xl"
          bg="white"
          w="230px"
          _focus={{ boxShadow: "2xl" }}
        >
          <PopoverArrow bg="white" />
          <PopoverBody p={4}>
            <Flex direction="column">
              <Button
                size="md"
                colorScheme="teal"
                w="full"
                onClick={onDetectLocation}
                leftIcon={<MdMyLocation />}
                isLoading={isLoading}
                loadingText="Detecting"
                borderRadius="lg"
                bgGradient="linear(to-r, teal.400, teal.500)"
                _hover={{ bgGradient: "linear(to-r, teal.500, teal.600)" }}
                color="white"
                fontWeight="medium"
              >
                Detect My Location
              </Button>

              <Divider my={2} />

              <Flex align="center">
                <GrLocationPin color="red" size={20} />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.700"
                  ml={1}
                  noOfLines={2}
                >
                  {isLoading ? "Detecting your location..." : currentLocation}
                </Text>
                {isLoading && <Spinner size="sm" ml="auto" color="teal.500" />}
              </Flex>
            </Flex>
          </PopoverBody>
        </MotionPopoverContent>
      </Portal>
    </Popover>
  );
};

export default CustomPopover;
