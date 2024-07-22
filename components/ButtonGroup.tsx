import {
  Button,
  ButtonGroup,
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface IButtonGroupInputProps extends ChakraProps {
  name: string;
  id: string;
  label: string;
  options: Array<{ label: string; value: any }>;
}

const ButtonGroupInput: React.FunctionComponent<IButtonGroupInputProps> = ({
  id,
  name,
  label,
  options,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <ButtonGroup gap="4">
        {options.map((o) => (
          <Button
            id={o.label}
            key={o.label}
            colorScheme="teal"
            variant={field.value === o.value ? "solid" : "outline"}
            textTransform="uppercase"
            onClick={() => _helpers.setValue(o.value)}
          >
            {o.label}
          </Button>
        ))}
      </ButtonGroup>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default ButtonGroupInput;
