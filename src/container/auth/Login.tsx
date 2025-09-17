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
  Box,
  IconButton,
} from "@chakra-ui/react";
import SignUp from "./Signup";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaTimes } from "react-icons/fa";
import { getSession, signIn } from "next-auth/react";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Email: ", email, "Password: ", password);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Login failed",
          description: result.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/");
      onClose();
    } catch (error: any) {
      toast({
        title: error.message || "Login failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google") => {
    setSocialLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during social login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSocialLoading(null);
    }
  };

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
          bg="gray.900"
          color="white"
          borderRadius="lg"
          border="1px"
          borderColor="gray.700"
          position="relative"
          m="10px"
        >
          <IconButton
            aria-label="Close modal"
            icon={<FaTimes />}
            position="absolute"
            top={1}
            right={1}
            size="sm"
            variant="ghost"
            color="white"
            zIndex={10}
            onClick={onClose}
            _hover={{ bg: "gray.700" }}
          />
          <Tabs isFitted variant="soft-rounded" colorScheme="orange" pb={3}>
            <TabList
              p={4}
              display="flex"
              justifyItems="center"
              alignContent="center"
              gap={2}
              mt={6}
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
                  <FormControl mb={4}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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

                  <FormControl mb={6}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
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

                  <HStack justify="space-between" width="100%" mb={6}>
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
                    mb={6}
                    size="lg"
                    _hover={{ bg: "orange.600" }}
                  >
                    Login
                  </Button>

                  <Flex align="center" mb={6}>
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
                      colorScheme="red"
                      onClick={() => handleSocialSignIn("google")}
                      isLoading={socialLoading === "google"}
                      loadingText="Signing in with Google"
                      disabled={isLoading}
                      _hover={{ bg: "gray.700" }}
                    >
                      Continue with Google
                    </Button>
                  </Flex>
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
