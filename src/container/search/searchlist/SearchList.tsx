import { Box, Flex, Image, Text } from "@chakra-ui/react";
import "./SearchList.scss";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { RestaurantType } from "@/types/restaurant";

const SearchList = ({ resultList }: { resultList: RestaurantType[] }) => {
  return (
    <div className="searchList">
      {resultList?.length === 0 ? (
        <li>Not found</li>
      ) : (
        resultList?.map((list: RestaurantType) => {
          return (
            <Box key={list?._id}>
              <Link href={`/menu/${list?._id}`} className="searchList-images">
                <Image
                  src={list?.image}
                  alt="list-img"
                  boxSize={{ base: "50px", md: "73px" }}
                  objectFit="cover"
                />
                <Flex direction="column" gap="3px">
                  <Text fontWeight="600" fontSize={{ base: 11, md: 12 }}>
                    {list?.name}
                  </Text>
                  <Flex
                    fontWeight="300"
                    fontSize={{ base: 9, md: 12 }}
                    gap="4px"
                    alignItems="center"
                  >
                    <AiFillStar color="gold" /> {list?.rating}
                  </Flex>
                  <Text fontWeight="300" fontSize={{ base: 9, md: 12 }}>
                    {list?.categories}
                  </Text>
                </Flex>
              </Link>
            </Box>
          );
        })
      )}
    </div>
  );
};

export default SearchList;
