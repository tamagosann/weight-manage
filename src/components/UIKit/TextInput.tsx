import React, { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";

type TextInputProps = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.Ref<any>;
  name: string;
  defaultValue?: string;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      type={props.type}
      onChange={props.onChange}
      inputRef={props.inputRef}
      name={props.name}
      defaultValue={props.defaultValue}
    />
  );
};

export default TextInput;
