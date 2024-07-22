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

interface IHeroProps {
  userId: string | undefined | null;
}

const Hero: React.FunctionComponent<IHeroProps> = ({ userId }) => {
  return (
    <>
      <Flex
        w="100%"
        h="100%"
        flexDirection="column"
        justify="flex-start"
        align="center"
        gap="2rem"
        p={8}
        bg="whiteAlpha.900"
        borderRadius={5}
        boxShadow="rgba(0,0,0,0.3) 0px 5px 15px"
      >
        {!userId && (
          <Alert status="info">
            <AlertIcon />
            If you have an account with us, please login for additional
            information.
          </Alert>
        )}
        {!userId && (
          <Alert status="warning">
            <AlertIcon />
            If you wish to view transactions or download past receipts, please
            register an account using your email when you made donations.
          </Alert>
        )}
        <Heading
          as="h1"
          color="#0f3d4f"
          textTransform="uppercase"
          size="3xl"
          mt={12}
        >
          Help with our cause
        </Heading>
        <Text fontSize="lg">
          Communities Forward is our formal approach to social responsibility,
          sustainability, diversity, equity, and inclusion. Through Communities
          Forward we have established a set of guiding principles for building
          strong communities for the future. These tenets include community
          involvement, charitable giving, team engagements, building operations,
          responsible sourcing, our firm values, and our organizational culture.
          The{" "}
          <Link
            fontWeight="bold"
            href="https://mnp.foleon.com/mnp-communities-forward/communities-forward-fy-2023/"
          >
            Communities Forward Annual Report
          </Link>{" "}
          shares some highlights of our firm's social responsibility, diversity,
          and environmental stewardship actions from coast to coast for the
          fiscal year 2023.
        </Text>
        <Text fontSize="lg">
          While MNP is a national firm, our partners are as local as the
          individuals and family-owned businesses that make up our clientele.
          MNP proudly supports initiatives that reflect our entrepreneurial
          spirit and share our values of leadership, excellence, and commitment
          to enhancing the communities where we live and work. Working together
          we can make a difference in the lives of people and strengthen our
          communities.
        </Text>

        <NextLink href="/donation">
          <Button
            colorScheme="teal"
            size="lg"
            textTransform="uppercase"
            fontSize="xl"
            p={8}
          >
            Make A Donation
          </Button>
        </NextLink>
      </Flex>
    </>
  );
};

export default Hero;
