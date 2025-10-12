import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  handleConfirmPay: () => void;
  billingDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  deliveryCharge: number;
  estimatedTime: number;
  calculateSubtotal: () => number;
  calculateTotal: () => string;
};

const PaymentModal = ({
  isOpen,
  onClose,
  loading,
  handleConfirmPay,
  billingDetails,
  paymentMethod,
  deliveryCharge,
  estimatedTime,
  calculateSubtotal,
  calculateTotal,
}: PaymentModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m={2} borderRadius="xl" p={2}>
        <ModalHeader textAlign="center">Confirm Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Please confirm your order details:</Text>

          <Flex justify="space-between" align="center">
            <Text>Subtotal:</Text>
            <Text fontWeight="bold">₹{calculateSubtotal()}</Text>
          </Flex>
          <Flex justify="space-between" align="center" mt={2}>
            <Text>Delivery Charge:</Text>
            <Text fontWeight="bold">₹{deliveryCharge.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between" align="center" mt={2}>
            <Text>Total:</Text>
            <Text fontWeight="bold">₹{calculateTotal()}</Text>
          </Flex>
          <Flex justify="space-between" align="center" mt={2}>
            <Text>Payment Method:</Text>
            <Text fontWeight="bold">
              {paymentMethod === "creditCard" ? "Credit Card" : "PayPal"}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center" mt={2}>
            <Text>Estimated Delivery Time:</Text>
            <Text fontWeight="bold">{estimatedTime} mins</Text>
          </Flex>

          <Box mt={4} p={3} bg="gray.50" borderRadius="md">
            <Heading as="h4" size="sm" mb={2}>
              Billing Details:
            </Heading>
            <Text>Name: {billingDetails.name}</Text>
            <Text>Email: {billingDetails.email}</Text>
            <Text>Address: {billingDetails.address}</Text>
            <Text>City: {billingDetails.city}</Text>
            <Text>Zip Code: {billingDetails.zipCode}</Text>
            <Text>Country: {billingDetails.country}</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleConfirmPay} isLoading={loading}>
            Confirm Pay
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
