import {
  Button,
  Input,
  Modal,
  ModalContent,
  FormControl,
  FormLabel,
  HStack,
  Checkbox,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useToast,
  Flex,
  Text,
  Divider,
  Select,
  Stack,
} from "@chakra-ui/react";
import SignUp from "./Signup";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import styles from "./Auth.module.css";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const router = useRouter();

  const toast = useToast();
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        errorToast("Invalid credentials");
        return;
      }

      successToast("Login Successful");

      router.push("/");
      onClose();
    } catch (error: any) {
      errorToast(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google") => {
    setSocialLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      errorToast("Login failed");
    } finally {
      setSocialLoading(null);
    }
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <>
      <Button
        bg="sandybrown"
        onClick={onOpen}
        _hover={{ bg: "darkorange" }}
        color="white"
      >
        Login
      </Button>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        isCentered
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent
          className={styles.modalContent}
          bg="gray.900"
          color="white"
          borderRadius="lg"
          border="1px"
          borderColor="gray.700"
          position="relative"
          m="10px"
        >
          <Tabs isFitted variant="soft-rounded" colorScheme="orange" pb={3}>
            <TabList
              p={4}
              display="flex"
              justifyItems="center"
              alignContent="center"
              gap={2}
            >
              <Tab
                _selected={{ color: "white", bg: "orange.500" }}
                _hover={{ bg: "gray.700" }}
              >
                Login
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "orange.500" }}
                _hover={{ bg: "gray.700" }}
              >
                Sign Up
              </Tab>
            </TabList>
            <TabPanels px={6}>
              <TabPanel>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        value={formData.email}
                        bg="gray.800"
                        borderColor="gray.600"
                        _hover={{ borderColor: "gray.500" }}
                        _focus={{
                          borderColor: "orange.500",
                          boxShadow: "0 0 0 1px orange.500",
                        }}
                        autoComplete="email"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        value={formData.password}
                        bg="gray.800"
                        borderColor="gray.600"
                        _hover={{ borderColor: "gray.500" }}
                        _focus={{
                          borderColor: "orange.500",
                          boxShadow: "0 0 0 1px orange.500",
                        }}
                        autoComplete="current-password"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="role">Role</FormLabel>
                      <Select
                        id="role"
                        w="100%"
                        value={formData.role}
                        onChange={handleChange}
                        color="black"
                        bg="white"
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </FormControl>

                    <HStack justify="space-between" width="100%">
                      <Checkbox
                        colorScheme="orange"
                        isChecked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      >
                        Remember me
                      </Checkbox>
                      <Button
                        variant="link"
                        colorScheme="orange"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Password reset",
                            status: "info",
                            duration: 3000,
                            isClosable: true,
                          });
                        }}
                      >
                        Forgot password?
                      </Button>
                    </HStack>

                    <Button
                      colorScheme="orange"
                      width="full"
                      type="submit"
                      isLoading={isLoading}
                      loadingText="Signing in..."
                      size="lg"
                      _hover={{ bg: "orange.600" }}
                    >
                      Login
                    </Button>

                    <Flex align="center" my={2}>
                      <Divider borderColor="gray.600" />
                      <Text px={2} color="gray.400" fontSize="sm">
                        OR
                      </Text>
                      <Divider borderColor="gray.600" />
                    </Flex>

                    <Flex direction="column" gap={3}>
                      <Button
                        leftIcon={<FaGoogle />}
                        variant="outline"
                        color="white"
                        colorScheme="red"
                        onClick={() => handleSocialSignIn("google")}
                        isLoading={socialLoading === "google"}
                        loadingText="Signing in with Google...."
                        disabled={isLoading}
                        _hover={{ bg: "gray.700" }}
                      >
                        Continue with Google
                      </Button>
                    </Flex>
                  </Stack>
                </form>
              </TabPanel>
              <TabPanel p={0}>
                <SignUp onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
