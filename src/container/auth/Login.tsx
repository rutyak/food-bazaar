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
  Box,
} from "@chakra-ui/react";
import SignUp from "./Signup";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import styles from "./Auth.module.css";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { IoClose } from "react-icons/io5";

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
        role: formData.role,
      });

      if (result?.error) {
        errorToast(result?.error || "Invalid credentials");
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  const signupFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "your@email.com",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <>
      <Button className={styles.loginBtn} onClick={onOpen}>
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
          m="10px"
          position="relative"
        >
          <Box
            position="absolute"
            top="5px"
            right="5px"
            cursor="pointer"
            onClick={onClose}
            zIndex={10}
            _hover={{ color: "orange.500" }}
          >
            <IoClose size={24} />
          </Box>

          <Tabs
            isFitted
            variant="soft-rounded"
            colorScheme="orange"
            pt={{ base: 6, md: 0 }}
            pb={3}
          >
            <TabList p={{ base: 3, md: 6 }} gap={2}>
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
              <TabPanel p={0} pb={4}>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    {signupFields.map(({ id, label, type, placeholder }) => (
                      <FormControl key={id} isRequired>
                        <FormLabel htmlFor={id} mb={1} fontSize="sm">
                          {label}
                        </FormLabel>
                        <Input
                          id={id}
                          type={type}
                          value={formData[id as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          bg="gray.800"
                          border="none"
                        />
                      </FormControl>
                    ))}

                    <FormControl isRequired>
                      <FormLabel htmlFor="role" mb={1} fontSize="sm">
                        Role
                      </FormLabel>
                      <Select
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        color="white"
                        bg="gray.800"
                        border="none"
                      >
                        <option
                          value="customer"
                          style={{ background: "#1A202C" }}
                        >
                          Customer
                        </option>
                        <option value="admin" style={{ background: "#1A202C" }}>
                          Admin
                        </option>
                      </Select>
                    </FormControl>

                    <HStack justify="space-between" width="100%">
                      <Checkbox
                        colorScheme="orange"
                        size="sm"
                        isChecked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      >
                        Remember me
                      </Checkbox>
                      <Button
                        variant="link"
                        colorScheme="orange"
                        size="xs"
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
                    >
                      Login
                    </Button>

                    <Flex align="center" my={2}>
                      <Divider borderColor="gray.600" />
                      <Text px={2} color="gray.400" fontSize="xs">
                        OR
                      </Text>
                      <Divider borderColor="gray.600" />
                    </Flex>

                    <Button
                      leftIcon={<FaGoogle />}
                      variant="outline"
                      color="white"
                      borderColor="gray.600"
                      onClick={() => handleSocialSignIn("google")}
                      isLoading={socialLoading === "google"}
                      _hover={{ bg: "gray.700" }}
                    >
                      Continue with Google
                    </Button>
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
