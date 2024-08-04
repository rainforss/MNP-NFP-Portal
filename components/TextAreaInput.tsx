import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ITextAreaInputProps extends ChakraProps {
  id: string;
  name: string;
  label?: string;
  autoComplete?: string;
  disabled?: boolean;
  placeholder?: string;
}

const TextAreaInput: React.FunctionComponent<ITextAreaInputProps> = ({
  id,
  name,
  label,
  autoComplete,
  disabled,
  placeholder,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);

  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      {label && (
        <FormLabel htmlFor={id} fontWeight="normal" fontSize="0.93rem">
          {label}
        </FormLabel>
      )}
      <Textarea
        {...field}
        id={id}
        name={name}
        value={field.value}
        autoComplete={autoComplete || "off"}
        disabled={disabled}
        placeholder={placeholder}
        background="white"
        boxShadow="0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)"
      />
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextAreaInput;