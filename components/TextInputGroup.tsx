import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ITextInputGroupProps extends ChakraProps {
  type: React.HTMLInputTypeAttribute;
  id: string;
  name: string;
  label?: string;
  autoComplete?: string;
  disabled?: boolean;
}

const TextInputGroup: React.FunctionComponent<ITextInputGroupProps> = ({
  type,
  id,
  name,
  label,
  autoComplete,
  disabled,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);

  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <InputGroup>
        <InputLeftAddon fontWeight="bold">$</InputLeftAddon>
        <Input
          {...field}
          id={id}
          name={name}
          type={type}
          value={field.value}
          autoComplete={autoComplete || "off"}
          disabled={disabled}
          background="white"
        />
      </InputGroup>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextInputGroup;
