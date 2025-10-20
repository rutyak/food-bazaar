import MenuItemForm from "@/container/adminDashboard/menuItem/MenuItemForm";
import RestaurantForm from "@/container/adminDashboard/restaurant/RestaurantForm";
import { updateMenu } from "@/redux/slices/menuSlice";
import { updateRestaurant } from "@/redux/slices/restaurantSlice";
import { RootState } from "@/redux/store";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { DataType } from "@/types/admin";
import { CategoryType, ItemsType, MenuType } from "@/types/menu";
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
import { useDispatch, useSelector } from "react-redux";

interface EditModalType {
  modalTitle: string;
  id: string;
  restaurantId?: string;
  category?: string;
}

function EditModal({ modalTitle, id, restaurantId, category }: EditModalType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const dispatch = useDispatch();

  const allRestaurants = useSelector((state: RootState) => state?.restaurants);
  const restaurant = allRestaurants?.filter(
    (restau: RestaurantType) => restau._id === id
  );

  const allMenu = useSelector((state: RootState) => state?.menu);

  const restauMenu = allMenu?.filter(
    (restau: MenuType) => restau?.restaurantId === restaurantId
  );

  const catItem = restauMenu?.[0]?.categories?.filter(
    (cat: CategoryType) => cat.category === category
  );

  const editItem = catItem?.[0]?.items?.filter(
    (item: ItemsType) => item._id === id
  );

  const [loading, setLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState<DataType>({
    name: restaurant?.[0]?.name,
    description: restaurant?.[0]?.description,
    image: restaurant?.[0]?.image,
    location: restaurant?.[0]?.location,
    categories: restaurant?.[0]?.categories,
  });

  const [menuItems, setMenuItems] = useState<DataType[]>([
    {
      restaurantId: editItem?.[0]?.restaurantId,
      name: editItem?.[0]?.name,
      description: editItem?.[0]?.description,
      price: editItem?.[0]?.price,
      image: editItem?.[0]?.image,
      category: editItem?.[0]?.category,
      rating: editItem?.[0]?.rating,
      isVeg: editItem?.[0]?.isVeg,
    },
  ]);

  async function handleEdit(endpoint: string, data: any) {

    setLoading(true);
    try {
      data = endpoint === "menuItem" ? data[0] : data;
      const imageFile = data.image;
      let imageUrl;

      if (typeof imageFile !== "string" && imageFile !== null) {
        const formData = new FormData();
        formData.append("file", imageFile as any);

        const imageRes = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = imageRes.data.uploadRes.url;
      }

      const res = await axios.patch(`/api/${endpoint}/${id}`, {
        ...data,
        image: imageUrl ? imageUrl : imageFile,
      });

      if (res.status === 200) {
        if (modalTitle === "Edit Restaurant") {
          const restaurant = res.data?.restaurant;
          dispatch(updateRestaurant({ id, restaurant }));
          successToast("Restaurant updated successfully");
        } else {
          const menuItem = res.data?.menuItem;
          dispatch(
            updateMenu({
              id,
              restaurantId: restaurantId as string,
              category: category as string,
              menuItem,
            })
          );
          successToast("MenuItem updated successfully");
        }
      }
      onClose();
    } catch (error) {
      console.error(error);
      errorToast("Edit failed");
    } finally {
      setLoading(false);
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
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalTitle === "Edit Restaurant" ? (
              <RestaurantForm
                data={restaurantData}
                setData={setRestaurantData}
                onEditSubmit={() => handleEdit("restaurant", restaurantData)}
                handleChangeFactory={handleChangeFactory}
                loading={loading}
              />
            ) : (
              <MenuItemForm
                editMode={true}
                data={menuItems}
                setData={setMenuItems}
                onEditSumit={() => handleEdit("menuItem", menuItems)}
                loading={loading}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditModal;
