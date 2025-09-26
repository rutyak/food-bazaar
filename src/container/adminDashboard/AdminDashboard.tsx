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
  Button,
  useToast,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";
import RestaurantForm from "./restaurant/RestaurantForm";
import MenuItemForm from "./menuItem/MenuItemForm";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";

const handleChangeFactory =
  (setState: React.Dispatch<React.SetStateAction<any>>) =>
  (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value, files } = e.target as HTMLInputElement;
    setState((prev: any) => ({
      ...prev,
      [id]: files && files.length > 0 ? files[0] : value,
    }));
  };

function AdminDashboard() {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  // States
  const [loading, setLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    image: null,
    location: "",
    categories: "",
  });

  const [menuItems, setMenuItems] = useState([
    {
      restaurantId: "",
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      isVeg: "true",
    },
  ]);

  // API Submitters
  const handleSubmit = async (endpoint: string, data: any) => {
    setLoading(true);

    try {
      if (Array.isArray(data)) {
        const uploadedItems = [];
        let imageUrl = "";

        for (let item of data) {
          if (item.image instanceof File) {
            const formData = new FormData();
            formData.append("file", item.image);

            const imageRes = await axios.post("/api/upload", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            imageUrl = imageRes.data.uploadRes.url;
          }
          uploadedItems.push({ ...item, image: imageUrl });
        }

        const res = await axios.post(`/api/${endpoint}`, uploadedItems);

        successToast(res.data.message);
      } else {
        let imageUrl = data.image;
        if (data.image instanceof File) {
          const formData = new FormData();
          formData.append("file", data.image);

          const imageRes = await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          imageUrl = imageRes.data.uploadRes.url;
        }

        const res = await axios.post(`api/${endpoint}`, {
          ...data,
          image: imageUrl,
        });

        successToast(res.data.message);
      }

      if (endpoint === "restaurant") {
        setRestaurantData({
          name: "",
          description: "",
          image: null,
          location: "",
          categories: "",
        });
      } else {
        setMenuItems([
          {
            restaurantId: "",
            name: "",
            description: "",
            price: "",
            image: "",
            category: "",
            isVeg: "true",
          },
        ]);
      }
    } catch (error) {
      errorToast("Error while saving");
    } finally {
      setLoading(false);
    }
  };

  // const handleAddMenuItem = () => {
  //   if (!currentMenuItem.name || !currentMenuItem.price) {
  //     toast({
  //       title: "Name and price are required",
  //       status: "warning",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //     return;
  //   }
  //   setMenuItems((prev) => [...prev, currentMenuItem]);
  //   setCurrentMenuItem({
  //     restaurantId: "",
  //     name: "",
  //     description: "",
  //     price: "",
  //     image: null,
  //     category: "",
  //     isVeg: "true",
  //   });
  // };

  const handleSaveAllMenuItems = () => {
    successToast("All menu items saved");
    setMenuItems([]);
  };

  function handleAddMore() {
    setMenuItems((prev: any) => [
      ...prev,
      {
        restaurantId: "",
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        isVeg: "true",
      },
    ]);
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.dashboard} p={6}>
        <Heading size="lg" mb={6}>
          Admin Dashboard
        </Heading>

        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Restaurants</Tab>
            <Tab>Menu Items</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <RestaurantForm
                data={restaurantData}
                setData={setRestaurantData}
                onSubmit={() => handleSubmit("restaurant", restaurantData)}
                handleChangeFactory={handleChangeFactory}
                loading={loading}
              />
            </TabPanel>

            <TabPanel>
              <MenuItemForm
                data={menuItems}
                setData={setMenuItems}
                // addItem={handleAddMenuItem}
                handleChangeFactory={handleChangeFactory}
              />

              {menuItems.length > 0 && (
                <>
                  <Stack spacing={4} mt={4}>
                    <Button colorScheme="blue" onClick={handleAddMore}>
                      Add More
                    </Button>

                    <Button
                      colorScheme="blue"
                      onClick={() => handleSubmit("menuItem", menuItems)}
                    >
                      {loading
                        ? "Saving all menu items..."
                        : "Save All Menu Items"}
                    </Button>
                  </Stack>
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
