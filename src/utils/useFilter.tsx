const useFilter = (searchValue: any, restaurants: any) => {
  
  const filteredData = restaurants?.filter((data: any) => {
    return data?.name
      ?.trim()
      .toLowerCase()
      .includes(searchValue?.trim().toLowerCase());
  });

  return filteredData;
};

export default useFilter;
