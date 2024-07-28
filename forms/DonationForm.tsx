import { Box, Button, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import ButtonGroupInput from "../components/ButtonGroup";
import CheckboxInput from "../components/CheckboxInput";
import TextInput from "../components/TextInput";
import TextInputGroup from "../components/TextInputGroup";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { CurrentUser } from "../types/dynamicsEntities";
import { useContacts } from "../hooks/useContacts";
import { donationSchema } from "../utils/validation";

interface IDonationFormProps {
  user?: CurrentUser;
}

type DonationValues = {
  isRecurring: boolean;
  amount: number;
  isProcessingFeeCovered: boolean;
  fund: string;
  description: string;
  emailaddress1: string;
  firstname: string;
  lastname: string;
  address1_line1: string;
  address1_line2: string;
  address1_city: string;
  address1_country: string;
  address1_stateorprovince: string;
  address1_postalcode: string;
};

const DonationForm: React.FunctionComponent<IDonationFormProps> = ({
  user,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const paymentElementOptions: any = {
    layout: "tabs",
  };
  const { contact, isError, isLoading } = useContacts(user?._id);

  return (
    <Box
      boxShadow="rgba(0,0,0,0.3) 0px 5px 15px"
      borderRadius="5px"
      h="100%"
      p="1.5rem"
      position="relative"
      bg="whiteAlpha.900"
      overflowY="scroll"
    >
      <Formik
        enableReinitialize={true}
        initialValues={
          isLoading || isError
            ? ({
                isRecurring: false,
                amount: 36,
                firstname: "",
                lastname: "",
                emailaddress1: "",
                address1_city: "",
                address1_country: "",
                address1_line1: "",
                address1_line2: "",
                address1_postalcode: "",
                address1_stateorprovince: "",
              } as DonationValues)
            : ({
                isRecurring: false,
                amount: 36,
                firstname: contact.firstname || "",
                lastname: contact.lastname || "",
                emailaddress1: contact.emailaddress1 || "",
                address1_city: contact.address1_city || "",
                address1_country: contact.address1_country || "",
                address1_line1: contact.address1_line1 || "",
                address1_line2: contact.address1_line2 || "",
                address1_postalcode: contact.address1_postalcode || "",
                address1_stateorprovince:
                  contact.address1_stateorprovince || "",
              } as DonationValues)
        }
        validationSchema={donationSchema}
        onSubmit={async (values: DonationValues, { setSubmitting }) => {
          if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }

          setSubmitting(true);
          const {
            firstname,
            lastname,
            emailaddress1,
            address1_city,
            address1_country,
            address1_line1,
            address1_line2,
            address1_postalcode,
            address1_stateorprovince,
            description,
          } = values;
          elements.update({
            mode: values.isRecurring ? "subscription" : "payment",
            setup_future_usage: values.isRecurring ? "off_session" : null,
          });

          const { error: submitError } = await elements.submit();

          if (submitError) {
            toast({
              title: submitError.message,
              description: submitError.message,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return setSubmitting(false);
          }

          let contactId;
          const stripeCustomerRes = await axios.post(
            "/api/stripe/create-customer",
            {
              customer: {
                firstname,
                lastname,
                emailaddress1,
                address1_city,
                address1_country,
                address1_line1,
                address1_line2,
                address1_postalcode,
                address1_stateorprovince,
              },
            }
          );
          if (!!user) {
            contactId = user._id;
          } else {
            const contactRes = await axios.post("/api/contact", {
              contactData: {
                firstname,
                lastname,
                emailaddress1,
                address1_city,
                address1_country,
                address1_line1,
                address1_line2,
                address1_postalcode,
                address1_stateorprovince,
                description,
                msnfp_primaryconstituenttype: 100000000,
                mnp_stripecustomerid: stripeCustomerRes.data.customerId,
              },
            });
            contactId = contactRes.data.contact.contactid;
          }

          if (!values.isRecurring) {
            const result = await axios.post(
              "/api/stripe/create-payment-intent",
              {
                amount: values.isProcessingFeeCovered
                  ? values.amount + values.amount * 0.04
                  : values.amount,
                customerId: stripeCustomerRes.data.customerId,
              }
            );
            const clientSecret = result.data.clientSecret;

            const donorCommitmentRes = await axios.post(
              "/api/donor-commitment",
              {
                donorCommitmentData: {
                  msnfp_name: `$${values.amount} One-Time Donation (${firstname} ${lastname})`,
                  msnfp_commitmentdate: new Date(),
                  msnfp_isbookable: true,
                  msiati_description: values.description,
                  msnfp_pledgedbycontactid: contactId,
                  msnfp_totalamount: values.isProcessingFeeCovered
                    ? values.amount + values.amount * 0.04
                    : values.amount,
                  msnfp_commitmenttype: 100000000,
                },
              }
            );
            await axios.post("/api/transactions", {
              transactionData: {
                msnfp_name: `$${values.amount} One-Time: Stripe Online (${firstname} ${lastname})`,
                msnfp_amount: values.isProcessingFeeCovered
                  ? values.amount + values.amount * 0.04
                  : values.amount,
                msnfp_bookdate: new Date(),
                msnfp_receiveddate: new Date(),
                mnp_stripepaymentintentid: result.data.id,
                _msnfp_receiptoncontactid_value: contactId,
                mnp_donorcommitment:
                  donorCommitmentRes.data.msnfp_donorcommitment
                    .msnfp_donorcommitmentid,
              },
            });

            const { error } = await stripe.confirmPayment({
              elements,
              clientSecret,
              confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/thank-you`,
              },
            });

            if (
              error.type === "card_error" ||
              error.type === "validation_error"
            ) {
              toast({
                title: error.message,
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setSubmitting(false);
            } else {
              toast({
                title: "Unexpected Error",
                description: "An unexpected error occurred.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setSubmitting(false);
            }
          } else {
            // const customerRes = await axios.post(
            //   "/api/stripe/create-customer",
            //   {
            //     customer: { ...values },
            //   }
            // );

            const donorCommitment = await axios.post("/api/donor-commitment", {
              donorCommitmentData: {
                msnfp_name: `$${values.amount} Monthly Donation (${firstname} ${lastname})`,
                msnfp_commitmentdate: new Date(),
                msnfp_isbookable: true,
                msnfp_pledgedbycontactid: contactId,
                msnfp_totalamount: values.amount,
                msiati_description: values.description,
                msnfp_commitmenttype: 100000001,
              },
            });

            const paymentScheduleRes = await axios.post(
              "/api/payment-schedule",
              {
                paymentScheduleData: {
                  msnfp_name: `$${values.amount} Monthly: Stripe Online (${firstname} ${lastname})`,
                  msnfp_frequency: 100000000,
                  msnfp_frequencyinterval: 1,
                  msnfp_firstpaymentdate: new Date(),
                  msnfp_recurringamount: values.isProcessingFeeCovered
                    ? values.amount + values.amount * 0.04
                    : values.amount,
                  msnfp_nextpaymentamount: values.isProcessingFeeCovered
                    ? values.amount + values.amount * 0.04
                    : values.amount,
                  msnfp_paymentschedule_donorcommitmentid:
                    donorCommitment.data.msnfp_donorcommitment
                      .msnfp_donorcommitmentid,
                },
              }
            );

            const subscriptionRes = await axios.post(
              "/api/stripe/create-subscription",
              {
                customerId: stripeCustomerRes.data.customerId,
                customerName: `${values.firstname} ${values.lastname}`,
                amount: values.isProcessingFeeCovered
                  ? values.amount + values.amount * 0.04
                  : values.amount,
                metadata: {
                  paymentscheduleid:
                    paymentScheduleRes.data.msnfp_paymentschedule
                      .msnfp_paymentscheduleid,
                },
              }
            );

            const clientSecret = subscriptionRes.data.clientSecret;

            const { error } = await stripe.confirmPayment({
              elements,
              clientSecret,
              confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/thank-you`,
              },
            });

            if (
              error.type === "card_error" ||
              error.type === "validation_error"
            ) {
              toast({
                title: error.message,
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setSubmitting(false);
            } else {
              toast({
                title: "Unexpected Error",
                description: "An unexpected error occurred.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ isSubmitting, values }: FormikProps<DonationValues>) => {
          return (
            <Form
              style={{
                padding: "0",
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <ButtonGroupInput
                name="isRecurring"
                id="isRecurring"
                label=""
                options={[
                  { label: "Donate Once", value: false },
                  { label: "Donate Monthly", value: true },
                ]}
                p="1rem"
              />
              <ButtonGroupInput
                name="amount"
                id="amount-button"
                label="Donation Amount"
                options={[
                  { label: "$36", value: 36 },
                  { label: "$54", value: 54 },
                  { label: "$72", value: 72 },
                ]}
                p="1rem"
              />
              <TextInputGroup
                name="amount"
                id="amount"
                type="number"
                disabled={isSubmitting}
                w="50%"
                p="1rem"
              />
              <CheckboxInput
                name="isProcessingFeeCovered"
                id="isProcessingFeeCovered"
                label={`Make my gift go further. I'd like to cover the $${
                  values.amount * 0.04
                } processing fee so 100% of my donation goes to this charity.`}
                p="1rem"
              />
              <TextInput
                name="description"
                id="description"
                type="text"
                disabled={isSubmitting}
                placeholder="Write a private message to us (optional)"
                label="Message"
                w="100%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="emailaddress1"
                id="emailaddress1"
                type="email"
                disabled={isSubmitting}
                placeholder="Email Address"
                label="Email Address"
                w="100%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="firstname"
                id="firstname"
                type="text"
                disabled={isSubmitting}
                placeholder="First Name"
                label="First Name"
                w="50%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="lastname"
                id="lastname"
                type="text"
                disabled={isSubmitting}
                placeholder="Last Name"
                label="Last Name"
                w="50%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="address1_line1"
                id="address1_line1"
                type="text"
                disabled={isSubmitting}
                placeholder="Address Line 1"
                label="Address Line 1"
                w="50%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="address1_line2"
                id="address1_line2"
                type="text"
                disabled={isSubmitting}
                placeholder="Address Line 2"
                label="Address Line 2"
                w="50%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="address1_city"
                id="address1_city"
                type="text"
                disabled={isSubmitting}
                placeholder="City"
                label="City"
                w="50%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="address1_country"
                id="address1_country"
                type="text"
                disabled={isSubmitting}
                placeholder="Country"
                label="Country"
                w="50%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="address1_stateorprovince"
                id="address1_stateorprovince"
                type="text"
                disabled={isSubmitting}
                placeholder="Province"
                label="Province"
                w="50%"
                py="0.375rem"
                px="1rem"
              />
              <TextInput
                name="address1_postalcode"
                id="address1_postalcode"
                type="text"
                disabled={isSubmitting}
                placeholder="Postal Code"
                label="Postal Code"
                w="50%"
                py="0.375rem"
                px="1rem"
              />
              <Box display="block" w="100%" p="1rem">
                <PaymentElement
                  id="payment-element"
                  options={paymentElementOptions}
                />
              </Box>
              <Button
                type="submit"
                disabled={isSubmitting || !stripe || !elements}
                colorScheme="teal"
                px="2rem"
                py="1.5rem"
                m="1rem"
                isLoading={isSubmitting}
              >
                GIVE NOW!
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

const memoizedDonationForm = React.memo(DonationForm);

export default memoizedDonationForm;
