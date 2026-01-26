"use client";

import React from "react";
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
  Flex,
  Spinner,
  Divider,
  Icon,
  Box,
  VStack,
} from "@chakra-ui/react";
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import "./CustomPopover.scss";

interface CustomPopoverProps {
  text: string;
  onDetectLocation?: () => void;
  isLoading?: boolean;
  currentLocation?: string;
}

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
      // Improved placement logic for responsiveness
      placement="bottom-start"
      closeOnBlur
      gutter={12}
    >
      <PopoverTrigger>
        <Button
          onClick={onToggle}
          className="location-trigger-btn"
          leftIcon={<Icon as={FaLocationDot} className="trigger-icon" />}
        >
          {/* Responsive max-widths for text */}
          <Text isTruncated maxW={{ base: "120px", sm: "180px", md: "250px", lg: "300px" }}>
            {text}
          </Text>
        </Button>
      </PopoverTrigger>

      <Portal>
        <PopoverContent className="location-popover-content">
          <PopoverArrow bg="#1a1a1a" />
          <PopoverBody p={0}>
            <VStack align="stretch" spacing={0}>
              <Box p={{ base: 3, md: 4 }} className="popover-header">
                <Flex align="center" gap={3}>
                  <Box className="icon-badge">
                    <FaMapLocationDot size={18} color="#ffcc00" />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="800" color="white">
                      Your Location
                    </Text>
                    <Text fontSize={{ base: "10px", md: "xs" }} color="whiteAlpha.600">
                      Find nearby services
                    </Text>
                  </VStack>
                </Flex>
              </Box>

              <Divider borderColor="whiteAlpha.100" />

              <Box p={{ base: 3, md: 4 }}>
                <VStack spacing={{ base: 3, md: 4 }}>
                  <Button
                    onClick={onDetectLocation}
                    leftIcon={<MdMyLocation size={18} />}
                    isLoading={isLoading}
                    className="detect-btn"
                  >
                    Auto-detect Location
                  </Button>

                  <Box className="location-display-card">
                    <Flex gap={3} align="flex-start">
                      <Icon as={FaLocationDot} color="#ff4d4d" mt={1} />
                      <Box flex="1">
                        <Text className="location-label">Current Address</Text>
                        <Text className="location-text">
                          {isLoading ? "Searching GPS..." : currentLocation}
                        </Text>
                      </Box>
                      {isLoading && <Spinner size="xs" color="#ffcc00" />}
                    </Flex>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default CustomPopover;