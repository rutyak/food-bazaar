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
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";

interface DeleteAlertProps {
  id: string;
  restaurantId?: string;
  category?: string;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  id,
  restaurantId,
  category,
}: DeleteAlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handleDelete = () => {
    try {
      // const res = await axios.delete("api/restaurant/delete", id);
    } catch (error: any) {
      console.error(error.message);
      errorToast("Delete failed");
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

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAlert;
