import React from "react";
import { Button } from "@material-ui/core";

type PrimaryButtonProps = {
  label: string;
  onClick?: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
