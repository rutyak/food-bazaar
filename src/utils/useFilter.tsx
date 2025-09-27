import { RestaurantType } from "@/types/restaurant";

const useFilter = (searchValue: string, restaurants: RestaurantType[]) => {
  const filteredData = restaurants?.filter((data: RestaurantType) => {
    return data?.name
      ?.trim()
      .toLowerCase()
      .includes(searchValue?.trim().toLowerCase());
  });

  return filteredData;
};

export default useFilter;
