
const useFilter = (searchText: any, allCards: any) =>{

    const filteredData = allCards?.filter((data: any) => {
        return data?.info?.name?.trim().toLowerCase().includes(searchText?.trim().toLowerCase());
      });

    return filteredData;
}

export default useFilter;