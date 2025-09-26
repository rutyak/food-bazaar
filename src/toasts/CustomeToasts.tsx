import { useToast } from "@chakra-ui/react";

export function useSuccessToast() {
  const toast = useToast();

  return (message: string) => {
    toast({
      title: message,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
}

export function useErrorToast() {
  const toast = useToast();

  return (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
}
