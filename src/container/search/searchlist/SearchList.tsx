import { Box, Image, Text } from "@chakra-ui/react";
import { image_url } from "@/config/Config";
import "./SearchList.scss";
import Link from "next/link";

const SearchList = ({ resultList }: any) => {
  return (
    <div className="searchList" >
      {resultList?.length === 0 ? (
        <li>Not found</li>
      ) : (
        resultList?.map((list: any) => {
          return (
            <Box key={list?.info?.id}>
              <Link href={`/menu/${list?.info?.id}`}  className="searchList-images">
          
                <Image
                  src={`${image_url}/${list?.info?.cloudinaryImageId}`}
                  alt="list-img"
                  boxSize="73px"
                  objectFit="cover"
                />
                <Box>
                  <Text fontWeight="400">{list?.info?.name}</Text>
                  <Text fontWeight="300">{list?.info?.costForTwo}</Text>
                </Box>
              </Link>
            </Box>
          );
        })
      )}
    </div>
  );
};

export default SearchList;
