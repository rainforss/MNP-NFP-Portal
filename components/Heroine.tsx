import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";

interface IHeroineProps {
  userId?: string;
}

const Heroine: React.FunctionComponent<IHeroineProps> = ({ userId }) => {
  return (
    <>
      <Flex
        w="100%"
        h="50%"
        flexDirection="column"
        justify="center"
        align="center"
        gap="2rem"
        p={8}
        bg="whiteAlpha.900"
        borderRadius={5}
        boxShadow="rgba(0,0,0,0.3) 0px 5px 15px"
      >
        <Heading
          as="h1"
          color="#0f3d4f"
          textTransform="uppercase"
          size="3xl"
          mt={12}
        >
          Thank you for your payment!
        </Heading>

        {!!userId ? (
          <Text fontSize="lg">
            Your receipt document will be sent to you through email. The receipt
            will also be available for download under "My Transactions" in 5
            minutes.
          </Text>
        ) : (
          <Text fontSize="lg">
            Your receipt document will be sent to you through email. If you wish
            to see a list of transactions and their documents under your email
            address, please click the button below to register an account using
            your email address.
          </Text>
        )}

        {!!userId ? (
          <NextLink href="/transactions">
            <Button
              colorScheme="teal"
              size="lg"
              textTransform="uppercase"
              fontSize="xl"
              p={8}
            >
              My Transactions
            </Button>
          </NextLink>
        ) : (
          <NextLink href="/register">
            <Button
              colorScheme="teal"
              size="lg"
              textTransform="uppercase"
              fontSize="xl"
              p={8}
            >
              Register
            </Button>
          </NextLink>
        )}
      </Flex>
    </>
  );
};

export default Heroine;
