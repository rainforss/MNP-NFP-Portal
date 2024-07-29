import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(1, "Please enter your official first name")
    .required("First name is required."),
  lastName: Yup.string()
    .trim()
    .min(1, "Please enter your official last name")
    .required("Last name is required."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  username: Yup.string()
    .trim()
    .min(6, "Username must contain at least 6 characters")
    .max(12, "Username cannot contain more than 12 characters")
    .matches(/^[A-Za-z0-9 ]+$/, "No special characters allowed")
    .required("Username is required."),
  password: Yup.string()
    .trim()
    .min(6, "Password must contain at least 6 characters")
    .matches(
      /^(?=.{10,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
      "Password must contain at least one uppercase character, one lowercase character and one special character."
    )
    .required("Password is required."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const donationSchema = Yup.object().shape({
  firstname: Yup.string()
    .trim()
    .min(1, "Please enter your official first name")
    .required("First name is required."),
  lastname: Yup.string()
    .trim()
    .min(1, "Please enter your official last name")
    .required("Last name is required."),
  emailaddress1: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  amount: Yup.number()
    .min(1, "We do not accept donation under 1 CAD.")
    .required("You must enter a donation amount"),
  address1_line1: Yup.string()
    .trim()
    .min(1, "Please enter your address")
    .required("Address is required."),
  address1_city: Yup.string()
    .trim()
    .min(1, "Please enter a city")
    .required("City is required."),
  address1_stateorprovince: Yup.string()
    .trim()
    .min(1, "Please enter a province")
    .required("Province is required."),
  address1_country: Yup.string()
    .trim()
    .min(1, "Please enter a country")
    .required("Country is required."),
  address1_postalcode: Yup.string()
    .trim()
    .min(1, "Please enter your postal code")
    .required("Postal code is required."),
  msnfp_designationid: Yup.string()
    .trim()
    .min(1, "Please select a designation")
    .required("Please select a designation"),
});
