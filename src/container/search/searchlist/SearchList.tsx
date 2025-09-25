import { Box, Flex, Image, Text } from "@chakra-ui/react";
import "./SearchList.scss";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";

const SearchList = ({ resultList }: any) => {
  return (
    <div className="searchList">
      {resultList?.length === 0 ? (
        <li>Not found</li>
      ) : (
        resultList?.map((list: any) => {
          return (
            <Box key={list?._id}>
              <Link href={`/menu/${list?._id}`} className="searchList-images">
                <Image
                  src={list?.image}
                  alt="list-img"
                  boxSize="73px"
                  objectFit="cover"
                />
                <Flex direction="column" gap="3px">
                  <Text fontWeight="400">{list?.name}</Text>
                  <Flex fontWeight="300" fontSize={12} gap="4px" alignItems="center">
                    <AiFillStar color="gold"/> {list?.rating}
                  </Flex>
                  <Text fontWeight="300" fontSize={12}>
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
