"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  TabPanel,
  Stack,
  Text,
  Box,
  Flex,
  Divider,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import styles from "./Auth.module.css";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";

interface SignUpProps {
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      errorToast("Passwords are not matching");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      successToast(data.message || "Signup successful!");
      router.push("/");
      onClose();
    } catch (err: any) {
      errorToast(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    try {
      setSocialLoading(provider);
      await signIn(provider, { callbackUrl: "/" });
    } catch {
      errorToast("Sign up failed");
    } finally {
      setSocialLoading(null);
    }
  };

  const signupFields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
    { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
  ];

  return (
    <TabPanel p={0} pb={4} className={styles.signupBody}>
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
                _focus={{ ring: 1, ringColor: "orange.500" }}
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
              _focus={{ ring: 1, ringColor: "orange.500" }}
            >
              <option value="customer" style={{ background: "#1A202C" }}>
                Customer
              </option>
              <option value="admin" style={{ background: "#1A202C" }}>
                Admin
              </option>
            </Select>
          </FormControl>

          <Box pt={2}>
            <Button
              colorScheme="orange"
              width="full"
              type="submit"
              isLoading={isLoading}
              loadingText="Signing up..."
              size="lg"
            >
              Sign Up
            </Button>
          </Box>

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
            borderColor="gray.600"
            color="white"
            onClick={() => handleSocialSignUp("google")}
            isLoading={socialLoading === "google"}
            disabled={isLoading}
            _hover={{ bg: "gray.700" }}
          >
            Continue with Google
          </Button>
        </Stack>
      </form>
    </TabPanel>
  );
};

export default SignUp;