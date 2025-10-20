import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteRestaurant } from "@/redux/slices/restaurantSlice";
import { deleteMenu } from "@/redux/slices/menuSlice";

interface DeleteAlertProps {
  id: string;
  restaurantId?: string;
  category?: string;
  type: string;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  id,
  restaurantId,
  category,
  type,
}: DeleteAlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handleDelete = async (type: string) => {
    console.log("type: ", type);

    setLoading(true);
    try {
      const res = await axios.delete(`/api/${type}/${id}`);

      if (res.status === 200) {
        successToast("Deleted successfully");
        if (type === "restaurant") {
          dispatch(deleteRestaurant({ id }));
        } else {
          dispatch(
            deleteMenu({
              id,
              restaurantId: restaurantId as string,
              category: category as string,
            })
          );
        }
      }
    } catch (error: any) {
      console.error(error.message);
      errorToast("Delete failed");
    } finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Delete item"
        icon={<MdDeleteOutline size={16} />}
        size="sm"
        colorScheme="red"
        variant="solid"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You want to delete.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(type)}
                ml={3}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAlert;
