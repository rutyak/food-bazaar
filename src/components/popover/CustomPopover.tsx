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
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { MdMyLocation, MdLocationOn } from "react-icons/md";
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
          size="sm"
          variant="outline"
          colorScheme="teal"
          onClick={onToggle}
          leftIcon={<FaLocationDot size={18} color="red" />}
          _hover={{
            bg: "teal.50",
            transform: "scale(1.02)",
          }}
          _active={{
            transform: "scale(0.98)",
          }}
          transition="all 0.2s ease"
          borderRadius="md"
          px={4}
          py={2}
        >
          {text}
        </Button>
      </PopoverTrigger>
      <Portal>
        <MotionPopoverContent
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          width="300px"
          border="none"
          boxShadow="xl"
          bg="white"
          _focus={{ boxShadow: "xl" }}
        >
          <PopoverArrow bg="white" />
          <PopoverBody p={0}>
            <Box p={4}>
              <Button
                size="sm"
                colorScheme="teal"
                w="full"
                onClick={onDetectLocation}
                leftIcon={<MdMyLocation />}
                isLoading={isLoading}
                loadingText="Detecting"
                variant="solid"
              >
                Detect My Location
              </Button>

              <Flex align="center" gap={3} mt={4}>
                <Text fontSize="sm" color="gray.600">
                  {isLoading ? "Detecting your location..." : currentLocation}
                </Text>
                {isLoading && <Spinner size="sm" ml="auto" />}
              </Flex>
            </Box>
          </PopoverBody>
        </MotionPopoverContent>
      </Portal>
    </Popover>
  );
};

export default CustomPopover;
