import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  Skeleton,
  Spinner,
  Text,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import TextInput from "../components/TextInput";
import { msnfp_Transaction } from "../dataverse-types/entities/msnfp_Transaction";
import { useTransactions } from "../hooks/useTransactions";
import DocumentsDrawer from "../stated-components/DocumentsDrawer";

interface ITransactionFormProps {
  transactionId: string;
}

type TransactionValues = msnfp_Transaction;

const TransactionForm: React.FunctionComponent<ITransactionFormProps> = ({
  transactionId,
}) => {
  const { transactions, isError, isLoading } = useTransactions(
    undefined,
    transactionId
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const memoizedOnClose = React.useCallback(() => onClose(), []);

  return (
    <Box
      boxShadow="rgba(0,0,0,0.3) 0px 5px 15px"
      borderRadius="5px"
      h="100%"
      p="1.5rem"
      position="relative"
      w="60%"
      mx="auto"
      bg="whiteAlpha.900"
    >
      {isLoading && !!transactionId && (
        <Center h="100%" flexDirection="column">
          <Spinner size="xl" />
          <Text mt={6}>Loading Transaction Information</Text>
        </Center>
      )}
      {!isLoading && !!isError && (
        <Box h="100%">
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>NOT FOUND</AlertTitle>
            <AlertDescription>
              Transacction not found from database.
            </AlertDescription>
          </Alert>
        </Box>
      )}
      {(!isLoading || !transactionId) && !isError && (
        <Formik
          initialValues={{
            ...(transactions as msnfp_Transaction),

            mnp_accountname: (transactions as msnfp_Transaction)[
              "_msnfp_transaction_receiptonaccountid_value@OData.Community.Display.V1.FormattedValue"
            ],
            mnp_contactname: (transactions as msnfp_Transaction)[
              "_msnfp_receiptoncontactid_value@OData.Community.Display.V1.FormattedValue"
            ],
            mnp_statuscode: (transactions as msnfp_Transaction)[
              "statuscode@OData.Community.Display.V1.FormattedValue"
            ],
          }}
          onSubmit={() => {}}
        >
          {({ isSubmitting, values }: FormikProps<TransactionValues>) => {
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
                  name="msnfp_name"
                  id="msnfp_name"
                  type="text"
                  label="Transaction Name"
                  disabled={!!transactionId}
                  w="50%"
                  p="1rem"
                />

                <TextInput
                  name="msnfp_amount"
                  id="msnfp_amount"
                  type="text"
                  label="Transaction Amount ($)"
                  disabled={!!transactionId}
                  w="50%"
                  p="1rem"
                />

                <TextInput
                  name="mnp_statuscode"
                  id="mnp_statuscode"
                  type="text"
                  label="Status"
                  disabled={!!transactionId}
                  w="50%"
                  p="1rem"
                />

                <TextInput
                  name="msnfp_receiveddate"
                  id="msnfp_receiveddate"
                  type="text"
                  label="Received Date"
                  isDate={true}
                  disabled={!!transactionId}
                  w="50%"
                  p="1rem"
                />

                <TextInput
                  name="mnp_contactname"
                  id="mnp_contactname"
                  type="text"
                  label="Receipt on Contact"
                  disabled={!!transactionId}
                  w="50%"
                  p="1rem"
                />

                <TextInput
                  name="mnp_accountname"
                  id="mnp_accountname"
                  type="text"
                  label="Receipt on Account"
                  disabled={!!transactionId}
                  w="50%"
                  p="1rem"
                />

                {!!transactionId &&
                  values.mnp_statuscode === "New" &&
                  !!values.mnp_stripepaymentlink && (
                    <Link
                      href={values.mnp_stripepaymentlink as string}
                      target="_blank"
                    >
                      <Button
                        disabled={!transactionId}
                        left="2.5rem"
                        bottom="2.5rem"
                        bgColor="#92295e"
                        color="white"
                        px="2rem"
                        py="1.5rem"
                        position="absolute"
                      >
                        Make a Payment
                      </Button>
                    </Link>
                  )}

                {!!transactionId &&
                  !!onOpen &&
                  values.mnp_statuscode !== "New" && (
                    <Button
                      disabled={!transactionId}
                      left="2.5rem"
                      bottom="2.5rem"
                      bgColor="#92295e"
                      color="white"
                      px="2rem"
                      py="1.5rem"
                      position="absolute"
                      onClick={onOpen}
                    >
                      Download Documents
                    </Button>
                  )}
              </Form>
            );
          }}
        </Formik>
      )}
      {!!transactionId && transactions && (
        <DocumentsDrawer
          recordId={transactionId}
          recordLogicalName={"transactions"}
          recordName={(transactions as msnfp_Transaction).msnfp_name!}
          isOpen={isOpen}
          onClose={memoizedOnClose}
        />
      )}
    </Box>
  );
};

const memoizedTransactionForm = React.memo(TransactionForm);

export default memoizedTransactionForm;
