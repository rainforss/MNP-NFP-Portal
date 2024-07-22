import { Box, Flex, Text, Link } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { MdDashboard, MdEditCalendar } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { RiFilePaper2Fill } from "react-icons/ri";
import { NavigationItem } from "../types/components";
import NavItem from "./NavItem";
import NextLink from "next/link";

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const navItems: NavigationItem[] = [
    { label: "Home", url: "", icon: MdDashboard },
    { label: "Donation", url: "donation", icon: BiDonateHeart },
    {
      label: "My Transactions",
      url: "transactions",
      icon: RiFilePaper2Fill,
    },
  ];

  const router = useRouter();

  return (
    <>
      <Flex
        position="fixed"
        top="0"
        left="0"
        px={4}
        py={12}
        h="100%"
        w="300px"
        bg="white"
        flexDirection="column"
        align="center"
        justify="flex-start"
        style={{ gap: "60px" }}
        borderRight="1px solid #ebe6e6"
        color="#63605f"
      >
        <Flex
          w="90%"
          flexDirection="column"
          justify="center"
          align="center"
          style={{ gap: "20px" }}
        >
          <NextLink href="/" passHref>
            <Link>
              <Image
                src="/mnp-llp-vector-logo.png"
                width="100px"
                height="60px"
                alt="Betach Institute Logo"
                loading="eager"
              />
            </Link>
          </NextLink>
          <Text
            as="span"
            fontWeight="bold"
            fontSize="1.0rem"
            textTransform="uppercase"
          >
            Fundrasing & Engagement
          </Text>
          <Box w="100%" h="1px" bgColor="#0a2351"></Box>
        </Flex>
        <Flex w="90%" flexDir="column" style={{ gap: "20px" }}>
          {navItems.map((ni, index) => (
            <NavItem
              navItem={ni}
              active={router.pathname.split("/")[1] === ni.url}
              key={ni.label}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Sidebar;
