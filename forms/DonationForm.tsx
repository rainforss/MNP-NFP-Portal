import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import ButtonGroupInput from "../components/ButtonGroup";
import CheckboxInput from "../components/CheckboxInput";
import SelectInput from "../components/SelectInput";
import TextAreaInput from "../components/TextAreaInput";
import TextInput from "../components/TextInput";
import TextInputGroup from "../components/TextInputGroup";
import { useContacts } from "../hooks/useContacts";
import { useDesignations } from "../hooks/useDesignations";
import { CurrentUser } from "../types/dynamicsEntities";
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
  msnfp_designationid: string;
  mnp_recipientname: string;
  mnp_recipientemail: string;
  mnp_inmemoryofname: string;
  mnp_tributemessage: string;
  mnp_sourcepageurl: string;
};

const DonationForm: React.FunctionComponent<IDonationFormProps> = ({
  user,
}) => {
  let referrer = "";
  if (typeof window !== "undefined") {
    // browser code

    referrer = document.referrer;
  }

  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const paymentElementOptions: any = {
    layout: "tabs",
  };
  const { contact, isError, isLoading } = useContacts(user?._id);
  const {
    designations,
    isError: isDesignationError,
    isLoading: isDesignationLoading,
  } = useDesignations();

  return (
    <Box
      boxShadow="rgba(0,0,0,0.3) 0px 5px 15px"
      borderRadius="5px"
      h="100%"
      p="1.5rem"
      position="relative"
      bg="whiteAlpha.900"
      overflowY="scroll"
      w="60%"
      mx="auto"
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
                msnfp_designationid: "",
                mnp_recipientemail: "",
                mnp_recipientname: "",
                mnp_inmemoryofname: "",
                mnp_tributemessage: "",
                mnp_sourcepageurl: referrer,
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
                msnfp_designationid: "",
                mnp_recipientemail: "",
                mnp_recipientname: "",
                mnp_inmemoryofname: "",
                mnp_tributemessage: "",
                mnp_sourcepageurl: referrer,
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
          toast({
            title: "Submitting donation",
            description:
              "Submitting and validating your information. Please do not close the page.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
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
                  mnp_commitmenttype: 100000000,
                  msnfp_commitment_defaultdesignationid:
                    values.msnfp_designationid,
                  mnp_tributemessage: values.mnp_tributemessage,
                  mnp_inmemoryofname: values.mnp_inmemoryofname,
                  mnp_recipientname: values.mnp_recipientname,
                  mnp_recipientemail: values.mnp_recipientemail,
                  mnp_sourcepageurl: values.mnp_sourcepageurl,
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
                mnp_commitmenttype: 100000001,
                msnfp_commitment_defaultdesignationid:
                  values.msnfp_designationid,
                mnp_tributemessage: values.mnp_tributemessage,
                mnp_inmemoryofname: values.mnp_inmemoryofname,
                mnp_recipientname: values.mnp_recipientname,
                mnp_recipientemail: values.mnp_recipientemail,
                mnp_sourcepageurl: values.mnp_sourcepageurl,
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

              <SelectInput
                label="Designation"
                name="msnfp_designationid"
                id="msnfp_designationid"
                options={designations}
                w="100%"
                py="0.375rem"
                px="1rem"
                disabled={isSubmitting}
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
                mb="2.5rem"
              />

              <Accordion
                display="block"
                py="0.375rem"
                w="100%"
                defaultIndex={[0]}
                allowMultiple
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "tomato", color: "white" }}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                      >
                        RECEIPT INFORMATION
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    w="100%"
                    display="flex"
                    flexWrap="wrap"
                  >
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
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "tomato", color: "white" }}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                      >
                        DEDICATION INFORMATION
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    w="100%"
                    display="flex"
                    flexWrap="wrap"
                  >
                    <TextInput
                      name="mnp_inmemoryofname"
                      id="mnp_inmemoryofname"
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Name"
                      label="Name (In Memory Of)"
                      w="100%"
                      py="0.375rem"
                      px="1rem"
                    />
                    <TextInput
                      name="mnp_recipientname"
                      id="mnp_recipientname"
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Name"
                      label="Recipient Name"
                      w="50%"
                      py="0.375rem"
                      px="1rem"
                    />
                    <TextInput
                      name="mnp_recipientemail"
                      id="mnp_recipientemail"
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Email"
                      label="Recipient Email"
                      w="50%"
                      py="0.375rem"
                      px="1rem"
                    />
                    <TextAreaInput
                      name="mnp_tributemessage"
                      id="mnp_tributemessage"
                      disabled={isSubmitting}
                      placeholder="Message"
                      label="Message"
                      w="100%"
                      py="0.375rem"
                      px="1rem"
                    />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "tomato", color: "white" }}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                      >
                        PAYMENT INFORMATION
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    w="100%"
                    display="flex"
                    flexWrap="wrap"
                  >
                    <Box display="block" w="100%" p="1rem">
                      <PaymentElement
                        id="payment-element"
                        options={paymentElementOptions}
                      />
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

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
