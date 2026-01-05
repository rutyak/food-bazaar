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
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { MdMyLocation } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import React from "react";

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

  const triggerIconSize = useBreakpointValue({ base: 14, md: 18 });
  const textSize = useBreakpointValue({ base: "13px", md: "14px" });

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-start"
      closeOnBlur
    >
      <PopoverTrigger>
        <Button
          onClick={onToggle}
          leftIcon={
            <Icon
              as={FaLocationDot}
              boxSize={triggerIconSize}
              color="red.500"
            />
          }
          px={{ base: 4, md: 5 }}
          py={{ base: 3, md: 4 }}
          borderRadius="xl"
          fontWeight="semibold"
          color="white"
          bg="teal.500"
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
        >
          {text}
        </Button>
      </PopoverTrigger>

      <Portal>
        <PopoverContent
          w={{ base: "240px", md: "280px" }}
          borderRadius="xl"
          boxShadow="lg"
          _focus={{ boxShadow: "lg" }}
        >
          <PopoverArrow />
          <PopoverBody p={4}>
            <Flex direction="column" gap={4}>
              {/* Detect Button */}
              <Button
                onClick={onDetectLocation}
                leftIcon={<MdMyLocation />}
                isLoading={isLoading}
                loadingText="Detecting"
                w="full"
                size="md"
                fontSize={textSize}
                borderRadius="lg"
                colorScheme="teal"
              >
                Detect My Location
              </Button>

              <Divider />

              {/* Location Display */}
              <Flex align="flex-start" gap={2}>
                <Icon
                  as={GrLocationPin}
                  boxSize={4}
                  color="red.500"
                  mt="2px"
                />

                <Text
                  flex="1"
                  fontSize={textSize}
                  fontWeight="medium"
                  color="gray.700"
                  lineHeight="1.4"
                  noOfLines={2}
                >
                  {isLoading
                    ? "Detecting your location..."
                    : currentLocation}
                </Text>

                {isLoading && (
                  <Spinner
                    size="sm"
                    color="teal.500"
                    mt="2px"
                  />
                )}
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default CustomPopover;
