import {
  Button,
  ButtonGroup,
  ChakraProps,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ICheckboxInputProps extends ChakraProps {
  id: string;
  name: string;
  label?: string;
}

const CheckboxInput: React.FunctionComponent<ICheckboxInputProps> = ({
  id,
  name,
  label,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      <Checkbox
        {...field}
        id={id}
        name={name}
        value={field.value}
        colorScheme="teal"
        size="md"
      >
        {label}
      </Checkbox>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default CheckboxInput;
