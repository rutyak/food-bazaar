import Image from "next/image";
import "./BackgroundImage.scss";
import { Box } from "@chakra-ui/react";
import headerBg from "../../assets/back-5.jpg";

const BackgroundImage = () => {
  return (
    <>
      <Box className="bg-image-wrapper">
        <Image
          src={headerBg}
          alt="Background"
          fill
          priority
          quality={100}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <div className="overlay-blur"></div>
    </>
  );
};

export default BackgroundImage;
