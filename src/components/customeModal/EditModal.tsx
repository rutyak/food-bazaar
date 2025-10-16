import RestaurantForm from "@/container/adminDashboard/restaurant/RestaurantForm";
import { RootState } from "@/redux/store";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { DataType } from "@/types/admin";
import { RestaurantType } from "@/types/restaurant";
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

interface EditModalType {
  id: string;
}

function EditModal({ id }: EditModalType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const allRestaurants = useSelector((state: RootState) => state?.restaurants);
  const restaurant = allRestaurants?.filter((restau) => restau._id === id);

  console.log("restaurant from redux :", restaurant, id);

  const [loading, setLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState<DataType>({
    name: restaurant[0].name,
    description: restaurant[0].description,
    image: null,
    location: restaurant[0].location,
    categories: restaurant[0].categories,
  });

  const [menuItems, setMenuItems] = useState<DataType[]>([
    {
      restaurantId: "",
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      rating: 3,
      isVeg: false,
    },
  ]);

  async function handleRestaurantEdit() {
    console.log("submit clicked: ", restaurantData.image);

    try {
      // const formData = new FormData();
      // formData.append("file", restaurantDat.image);

      // const imageRes = await axios.post("/api/upload", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      const res = await axios.patch(`/api/restaurant/${id}`, restaurantData);
    } catch (error) {
      console.error(error);
      errorToast("Edit restaurant failed");
    }
  }

  const handleChangeFactory =
    (setState: React.Dispatch<React.SetStateAction<DataType>>) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { id, value, files } = e.target as HTMLInputElement;
      setState((prev: DataType) => ({
        ...prev,
        [id]: files && files.length > 0 ? files[0] : value,
      }));
    };

  return (
    <>
      <IconButton
        aria-label="Edit item"
        icon={<MdEdit size={16} />}
        size="sm"
        colorScheme="yellow"
        variant="solid"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH={"600px"} overflow={"auto"}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RestaurantForm
              data={restaurantData}
              setData={setRestaurantData}
              onSubmit={handleRestaurantEdit}
              handleChangeFactory={handleChangeFactory}
              loading={loading}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditModal;
