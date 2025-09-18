"use client";

import { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

import styles from "./Dashboard.module.css";

function AdminDashboard() {
  const toast = useToast();

  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    image: "",
    location: "",
    categories: "",
  });

  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
    description: "",
  });

  const [menuItemData, setMenuItemData] = useState({
    restaurantId: "",
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    isVeg: "true",
  });

  const handleChange =
    (setState: any) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { id, value } = e.target;
      setState((prev: any) => ({ ...prev, [id]: value }));
    };

  const handleSubmit = (data: any, type: string) => {
    console.log(type, data);
    toast({
      title: `${type} saved.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box className={styles.dashboard} p={6}>
      <Heading size="lg" mb={6}>
        Admin Dashboard
      </Heading>

      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Restaurants</Tab>
          <Tab>Categories</Tab>
          <Tab>Menu Items</Tab>
        </TabList>

        <TabPanels>
          {/* Restaurant Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={restaurantData.name}
                  onChange={handleChange(setRestaurantData)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  id="description"
                  value={restaurantData.description}
                  onChange={handleChange(setRestaurantData)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  id="image"
                  value={restaurantData.image}
                  onChange={handleChange(setRestaurantData)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  id="location"
                  value={restaurantData.location}
                  onChange={handleChange(setRestaurantData)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Categories (comma separated)</FormLabel>
                <Input
                  id="categories"
                  value={restaurantData.categories}
                  onChange={handleChange(setRestaurantData)}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                onClick={() => handleSubmit(restaurantData, "Restaurant")}
              >
                Save Restaurant
              </Button>
            </VStack>
          </TabPanel>

          {/* Category Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={categoryData.name}
                  onChange={handleChange(setCategoryData)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Image URL</FormLabel>
                <Input
                  id="image"
                  value={categoryData.image}
                  onChange={handleChange(setCategoryData)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  id="description"
                  value={categoryData.description}
                  onChange={handleChange(setCategoryData)}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                onClick={() => handleSubmit(categoryData, "Category")}
              >
                Save Category
              </Button>
            </VStack>
          </TabPanel>

          {/* Menu Items Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Restaurant ID</FormLabel>
                <Input
                  id="restaurantId"
                  value={menuItemData.restaurantId}
                  onChange={handleChange(setMenuItemData)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={menuItemData.name}
                  onChange={handleChange(setMenuItemData)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  id="description"
                  value={menuItemData.description}
                  onChange={handleChange(setMenuItemData)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  id="price"
                  value={menuItemData.price}
                  onChange={handleChange(setMenuItemData)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  id="image"
                  value={menuItemData.image}
                  onChange={handleChange(setMenuItemData)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  id="category"
                  value={menuItemData.category}
                  onChange={handleChange(setMenuItemData)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Is Vegetarian?</FormLabel>
                <Select
                  id="isVeg"
                  value={menuItemData.isVeg}
                  onChange={handleChange(setMenuItemData)}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Select>
              </FormControl>
              <Button
                colorScheme="blue"
                onClick={() => handleSubmit(menuItemData, "Menu Item")}
              >
                Save Menu Item
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default AdminDashboard;
