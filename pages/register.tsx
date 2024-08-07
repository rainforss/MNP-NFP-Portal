import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  useToast,
} from "@chakra-ui/react";
import { Formik, FormikProps, Form } from "formik";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import * as React from "react";
import TextInput from "../components/TextInput";
import { submitRegistration } from "../services/user";
import { registrationSchema } from "../utils/validation";
import { withSessionSsr } from "../utils/withSession";

export interface RegistrationValues {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface IRegisterProps {}

const Register: NextPage<IRegisterProps> = (props) => {
  const router = useRouter();
  const toast = useToast();
  return (
    <Center
      h="100vh"
      w="100%"
      bg="linear-gradient(to bottom right, #107F8A 70%, #EF5A27 100%)"
    >
      <Box
        w="50%"
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
          top="2rem"
          right="3rem"
        />
        <Heading as="h2" p="1rem" py="2rem" fontWeight="bold" color="#0F3D4F">
          Registration Form
        </Heading>
        <Formik
          validationSchema={registrationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            studentId: "",
            password: "",
            confirmPassword: "",
            username: "",
          }}
          onSubmit={async (values, actions) => {
            try {
              const result = await submitRegistration(values);
              actions.setSubmitting(false);
              toast({
                title: "User account created.",
                description: `We've created your account ${result.data.username} for you. Now redirecting you to home page.`,
                status: "success",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => router.push("/"),
              });
            } catch (error: any) {
              return toast({
                title: error.response.data.error.name,
                description: error.response.data.error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {(props: FormikProps<RegistrationValues>) => {
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
                  name="firstName"
                  id="firstName"
                  type="text"
                  label="First Name"
                  w="50%"
                  p="1rem"
                  disabled={props.isSubmitting}
                />
                <TextInput
                  name="lastName"
                  id="lastName"
                  type="text"
                  label="Last Name"
                  w="50%"
                  p="1rem"
                  disabled={props.isSubmitting}
                />
                <TextInput
                  name="email"
                  id="email"
                  type="email"
                  label="Email"
                  w="100%"
                  p="1rem"
                  disabled={props.isSubmitting}
                />

                <TextInput
                  name="username"
                  id="username"
                  type="text"
                  label="Username"
                  w="100%"
                  p="1rem"
                  disabled={props.isSubmitting}
                />
                <TextInput
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                  w="50%"
                  p="1rem"
                  disabled={props.isSubmitting}
                />
                <TextInput
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  w="50%"
                  p="1rem"
                  disabled={props.isSubmitting}
                />
                <Button
                  type="submit"
                  mx="auto"
                  mt="5rem"
                  colorScheme="teal"
                  px="2rem"
                  py="1.5rem"
                  isLoading={props.isSubmitting}
                  disabled={props.isSubmitting}
                >
                  REGISTER
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

export default Register;
