import {
  Box,
  Button,
  Center,
  Heading,
  useToast,
  Image,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import * as React from "react";
import TextInput from "../components/TextInput";
import { login } from "../services/user";
import { withSessionSsr } from "../utils/withSession";

export interface LoginValues {
  password: string;
  username: string;
}

interface ILoginProps {}

const Login: NextPage<ILoginProps> = () => {
  const toast = useToast();
  const router = useRouter();
  return (
    <Center
      h="100vh"
      w="100%"
      bg="linear-gradient(to bottom right, #107F8A 70%, #EF5A27 100%)"
    >
      <Box
        w="30%"
        h="80vh"
        bg="white"
        borderRadius="10px"
        p="2rem"
        position="relative"
      >
        <Image
          src="/mnp-llp-vector-logo.png"
          alt="Betach SCS"
          position="absolute"
          w="100px"
          top="2.5rem"
          right="3rem"
        />
        <Heading
          as="h2"
          p="1rem"
          py="2rem"
          fontWeight="bold"
          color="#0F3D4F"
          fontSize="2.1rem"
        >
          Login
        </Heading>
        <Formik
          initialValues={{
            password: "",
            username: "",
          }}
          onSubmit={async (values, actions) => {
            try {
              const result = await login(values);
              actions.setSubmitting(false);
              toast({
                title: "Successfully Logged In.",
                description: `Welcome back ${
                  result.data.firstName + " " + result.data.lastName
                }. Now redirecting you to home page.`,
                status: "success",
                duration: 1000,
                isClosable: true,
                onCloseComplete: () => router.push("/"),
              });
            } catch (error: any) {
              return toast({
                title: error.error.name,
                description: error.error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {(props: FormikProps<LoginValues>) => {
            return (
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <TextInput
                  name="username"
                  id="username"
                  type="text"
                  label="Username"
                  autoComplete="username"
                  w="100%"
                  p="1rem"
                  disabled={props.isSubmitting}
                />
                <TextInput
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  disabled={props.isSubmitting}
                  w="100%"
                  p="1rem"
                />
                <Button
                  type="submit"
                  isLoading={props.isSubmitting}
                  disabled={props.isSubmitting}
                  mx="auto"
                  my="4rem"
                  colorScheme="teal"
                  px="2rem"
                  py="1.5rem"
                >
                  LOGIN
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Center>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
    return {
      props: {},
    };
  }
);

export default Login;
