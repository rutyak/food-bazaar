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
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  return (
    <TabPanel className={styles.signupBody}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </FormControl>

          {/* New Role Selection */}
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

          <Box pt={2}>
            <Button
              colorScheme="orange"
              width="full"
              type="submit"
              isLoading={isLoading}
              loadingText="Signing up..."
            >
              Sign Up
            </Button>
          </Box>

          <Flex align="center" my={2}>
            <Divider />
            <Text px={2} color="gray.500">
              OR
            </Text>
            <Divider />
          </Flex>

          <Stack spacing={3}>
            <Button
              leftIcon={<FaGoogle />}
              variant="outline"
              onClick={() => handleSocialSignUp("google")}
              isLoading={socialLoading === "google"}
              loadingText="Signing up with Google"
              disabled={isLoading}
              color="white"
              _hover={{ bg: "gray.700" }}
            >
              Continue with Google
            </Button>
          </Stack>
        </Stack>
      </form>
    </TabPanel>
  );
};

export default SignUp;
