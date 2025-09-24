import { useRef } from "react";
import Card from "../card/Card";
import "./Carousel.scss";
import { Box, Button, Heading } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Carousel = ({ suggestions, title }: any) => {
  const scrollRef = useRef<any>(null);

  const handleScroll = (direction: any) => {
    if (scrollRef.current) {
      const amount = 900;
      scrollRef.current?.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Box className="carousel-heading">
        <Heading as="h2" fontSize={["xl","2xl"]}>
          {title}
        </Heading>
        <Box display="flex" gap="34px" zIndex="10 !important">
          <div onClick={() => handleScroll("left")} className="scroll-left">
            <MdChevronLeft size="24px" />
          </div>
          <div onClick={() => handleScroll("right")} className="scroll-right">
            <MdChevronRight size="24px" />
          </div>
        </Box>
      </Box>
      <Box className="carousel-card" ref={scrollRef} data-testid="carousel">
        {suggestions?.map((data: any, index: any) => (
          <Card key={data?.info?.id || index} {...data?.info} {...data} />
        ))}
      </Box>
    </>
  );
};

export default Carousel;
