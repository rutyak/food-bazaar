import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

function RestaurantForm({
  data,
  setData,
  onSubmit,
  handleChangeFactory,
  loading,
}: any) {
  const handleChange = handleChangeFactory(setData);
  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input id="name" value={data.name} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          id="description"
          value={data.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Image</FormLabel>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Location</FormLabel>
        <Input id="location" value={data.location} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Ratings</FormLabel>
        <Input id="rating" value={data.rating} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Categories (comma separated)</FormLabel>
        <Input
          id="categories"
          value={data.categories}
          onChange={handleChange}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={onSubmit}>
        {loading ? "Saving..." : "Save Restaurant"}
      </Button>
    </VStack>
  );
}

export default RestaurantForm;
