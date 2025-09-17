import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Button,
  Divider,
} from '@chakra-ui/react';

const Help = () => {
  const bgGradient = 'linear(to-r, teal.500, green.500)';
  const bgCard = 'white';
  const textColor = 'gray.800';

  return (
    <Box p={8} maxW="1200px" mx="auto" bgGradient={bgGradient} borderRadius="md" boxShadow="lg">
      <Heading as="h1" mb={8} textAlign="center" fontSize="4xl" color="white">
        Help Center
      </Heading>
      <Flex direction={['column', 'row']} align="center" justify="space-between" mb={8}>
        <VStack flex="1" spacing={4} align="start" p={4} bg={bgCard} borderRadius="md" boxShadow="lg">
          <Heading as="h2" size="lg" mb={4} color={textColor}>
            Frequently Asked Questions
          </Heading>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" color={textColor}>
                  How do I place an order?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} color={textColor}>
                To place an order, simply browse our menu, select the items you wish to purchase, and click on the 'Add to Cart' button. Once you're ready, proceed to checkout and follow the prompts to complete your order.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" color={textColor}>
                  What payment methods do you accept?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} color={textColor}>
                We accept various payment methods, including credit/debit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" color={textColor}>
                  How can I track my order?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} color={textColor}>
                After placing your order, you will receive a confirmation email with a tracking link. You can use this link to monitor the status and estimated delivery time of your order.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" color={textColor}>
                  What is your refund policy?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} color={textColor}>
                If you are not satisfied with your order, please contact our customer support within 24 hours of delivery. We will review your case and offer a refund or replacement if necessary.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" color={textColor}>
                  How do I contact customer support?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} color={textColor}>
                You can contact our customer support via email at support@foodbazaar.com or call us at (123) 456-7890. Our support team is available 24/7 to assist you with any inquiries.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Flex>

      <Divider my={8} borderColor="whiteAlpha.700" />

      <Heading as="h2" size="lg" mb={8} textAlign="center" color="white">
        Contact Us
      </Heading>
      <Stack direction={['column', 'row']} spacing={8} justify="center">
        <Box textAlign="center" p={6} bg={bgCard} borderRadius="md" boxShadow="lg">
          <Heading as="h3" size="md" mb={2} color={textColor}>
            Email Support
          </Heading>
          <Text fontSize="md" mb={4} color={textColor}>
            For any inquiries, feel free to email us at support@foodbazaar.com.
          </Text>
          <Button colorScheme="teal">Email Us</Button>
        </Box>
        <Box textAlign="center" p={6} bg={bgCard} borderRadius="md" boxShadow="lg">
          <Heading as="h3" size="md" mb={2} color={textColor}>
            Call Support
          </Heading>
          <Text fontSize="md" mb={4} color={textColor}>
            You can reach us by phone at (123) 456-7890. Our lines are open 24/7.
          </Text>
          <Button colorScheme="teal">Call Us</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Help;