import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Flex,
  Skeleton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Icon,
  Center,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as React from "react";
import { RiFileList3Fill } from "react-icons/ri";
import { msnfp_Transaction } from "../dataverse-types/entities/msnfp_Transaction";
import { useTransactions } from "../hooks/useTransactions";

interface ITransactionsListProps {
  contactId: string;
}

const TransactionsList: React.FunctionComponent<ITransactionsListProps> = (
  props
) => {
  const { transactions, isError, isLoading } = useTransactions(props.contactId);
  return (
    <>
      <TableContainer
        h="100%"
        overflowX="auto"
        overflowY="auto"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        borderRadius="5px"
        bg="whiteAlpha.900"
      >
        {isLoading && (
          <Flex flexDir="column" align="stretch" style={{ gap: "2px" }}>
            <Skeleton isLoaded={!isLoading} h="40.5px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
          </Flex>
        )}
        {!isLoading && (
          <>
            <Table variant="striped" colorScheme="telegram">
              <Thead
                position="sticky"
                top="0"
                zIndex={3}
                bg="white"
                boxShadow="inset 0 2px 0 #0a2351, inset 0 -2px 0 #0a2351"
              >
                <Tr>
                  <Th color="#0a2351">Name</Th>
                  <Th color="#0a2351">Amount</Th>
                  <Th color="#0a2351">Status</Th>
                  <Th color="#0a2351">Received Date</Th>
                </Tr>
              </Thead>

              <Tbody>
                {(transactions as msnfp_Transaction[]).length > 0 &&
                  (transactions as msnfp_Transaction[]).map((t: any) => (
                    <Tr key={t.msnfp_transactionid}>
                      <Td>
                        <IconButton
                          aria-label="Details"
                          as="a"
                          icon={<Icon as={RiFileList3Fill} />}
                          bgColor="white"
                          color="#767676"
                          _hover={{ color: "#0a2351" }}
                          transition="ease-in-out 0.5s"
                          fontSize="2xl"
                          mr={4}
                          href={`/transactions/${t.msnfp_transactionid}`}
                        />{" "}
                        {t.msnfp_name}
                      </Td>
                      <Td>${t.msnfp_amount}</Td>
                      <Td>
                        {
                          t[
                            "statuscode@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </Td>
                      <Td>
                        {new Date(t.msnfp_receiveddate!).toLocaleDateString()}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            {transactions && transactions.length === 0 && (
              <Center mt={16} px={8}>
                <Alert status="info">
                  <AlertIcon />
                  You have no transactions at this moment.
                </Alert>
              </Center>
            )}
          </>
        )}
      </TableContainer>
    </>
  );
};

export default TransactionsList;
