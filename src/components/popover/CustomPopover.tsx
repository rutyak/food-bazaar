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
  const iconSize = useBreakpointValue({ base: 14, md: 20 });

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
          onClick={onToggle}
          leftIcon={
            <FaLocationDot
              size={iconSize}
              color="red"
              style={{
                marginBottom: "2px",
              }}
            />
          }
          iconSpacing="1px"
          _hover={{
            bgGradient: "linear(to-r, teal.500, teal.600)",
          }}
          borderRadius="xl"
          px={4}
          py={{ base: 3, md: 6 }}
          fontWeight="semibold"
          alignItems="center"
          display="flex"
        >
          {text}
        </Button>
      </PopoverTrigger>

      <Portal>
        <PopoverContent
          borderRadius="xl"
          boxShadow="2xl"
          bg="white"
          w="230px"
          _focus={{ boxShadow: "2xl" }}
        >
          <PopoverArrow bg="white" />
          <PopoverBody p={{ base: 3, md: 4 }}>
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
                p={{ base: 2, md: 4 }}
                fontSize={{ base: "13px", md: "14px" }}
              >
                Detect My Location
              </Button>

              <Divider my={2} />

              <Flex align="center">
                <GrLocationPin color="red" size={20} />
                <Text
                  fontWeight="medium"
                  color="gray.700"
                  ml={1}
                  noOfLines={2}
                  fontSize={{ base: "13px", md: "14px" }}
                >
                  {isLoading ? "Detecting your location..." : currentLocation}
                </Text>
                {isLoading && <Spinner size="sm" ml="auto" color="teal.500" />}
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default CustomPopover;
