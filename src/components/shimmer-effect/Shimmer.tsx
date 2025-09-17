import { Box } from "@chakra-ui/react";
import * as shimmerStyle from "./Shimmer.module.scss";

const Shimmer = ({ newLoad, menuShimmerStyle }: any) => {
  const styles = menuShimmerStyle || shimmerStyle;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {!newLoad && <div className={styles["top-container"]}></div>}
      <Box
        className={styles["shimmer-container"]}
        display={newLoad ? "contents" : " "}
        data-testid="shimmer-container"
      >
        {arr.map((value, index) => {
          return (
            <div className={styles["shimmer"]} key={index}>
              {!menuShimmerStyle && <div className={styles["shimmer-img"]}></div>}
              <div className={styles["shimmer-info"]}>
                {!menuShimmerStyle && <p className={styles["name"]}></p>}
                <p className={styles["rating"]}></p>
                <p className={styles["cuisine"]}></p>
              </div>
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default Shimmer;