import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";
import { msnfp_Designation } from "../dataverse-types/entities/msnfp_Designation";

interface ISelectInputProps extends ChakraProps {
  options?: msnfp_Designation[];
  id: string;
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
}

const SelectInput: React.FunctionComponent<ISelectInputProps> = ({
  options,
  id,
  name,
  label,
  disabled,
  required,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);
  return (
    <FormControl
      isInvalid={!!(meta.error && meta.touched)}
      isRequired={required}
      {...chakraProps}
    >
      <FormLabel fontWeight="normal" fontSize="0.93rem" htmlFor={id}>
        {label}
      </FormLabel>
      {!options && <Skeleton isLoaded={!!options} w="100%" h="39px"></Skeleton>}
      {options && (
        <Select
          id={id}
          name={name}
          disabled={disabled}
          onChange={field.onChange}
          value={field.value}
          placeholder=""
          background="white"
          boxShadow="0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)"
        >
          <option value="">-- Please Select an Option --</option>
          {options.map((o) => {
            return (
              <option
                key={o.msnfp_designationid}
                value={o.msnfp_designationid as string}
              >
                {o.msnfp_name}
              </option>
            );
          })}
        </Select>
      )}
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectInput;
