import RestaurantForm from "@/container/adminDashboard/restaurant/RestaurantForm";
import { DataType } from "@/types/admin";
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
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

interface EditModalType {
  onEdit: () => void;
}

function EditModal({ onEdit }: EditModalType) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState<DataType>({
    name: "",
    description: "",
    image: null,
    location: "",
    categories: "",
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

  function handleEdit() {
    onClose();
    onEdit();
  }

  function handleSubmit(type: string, data: any) {
    console.log("submit clicked: ", data);
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
              onSubmit={() => handleSubmit("restaurant", restaurantData)}
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
