import React, { useRef } from "react";
import Card from "../card/Card";
import "./Carousel.scss";
import { Box, Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RestaurantType } from "@/types/restaurant";

interface CarouselType {
  suggestions: RestaurantType[];
  title: string;
}

const Carousel = ({ suggestions, title }: CarouselType) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: string) => {
    if (scrollRef.current) {
      const amount = 280;
      scrollRef.current?.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Box className="carousel-heading">
        <VStack align="flex-start" spacing={1}>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="800"
            letterSpacing="tight"
            lineHeight="1.2"
            color="gray.800"
            _dark={{ color: "white" }}
          >
            {title.split(" ").map((word, index) => (
              <React.Fragment key={index}>
                {index === title.split(" ").length - 1 ? (
                  <Text
                    as="span"
                    bgGradient="linear(to-r, orange.400, red.500)"
                    bgClip="text"
                  >
                    {word}
                  </Text>
                ) : (
                  word + " "
                )}
              </React.Fragment>
            ))}
          </Heading>
          <Box
            h="4px"
            w="65px"
            bgGradient="linear(to-r, orange.400, red.500)"
            borderRadius="full"
          />
        </VStack>
        <Flex gap={{ base: "10px", sm: "24px" }} align="center">
          <IconButton
            aria-label="Scroll Left"
            icon={<MdChevronLeft size="24px" />}
            onClick={() => handleScroll("left")}
            className="nav-btn"
          />
          <IconButton
            aria-label="Scroll Right"
            icon={<MdChevronRight size="24px" />}
            onClick={() => handleScroll("right")}
            className="nav-btn"
          />
        </Flex>
      </Box>
      <Box className="carousel-card" ref={scrollRef} data-testid="carousel">
        {suggestions?.map((data: RestaurantType) => (
          <Card key={data?._id} {...data} {...data} />
        ))}
      </Box>
    </>
  );
};

export default Carousel;
