import React from "react";
import { Button } from "@material-ui/core";

type SecondaryButtonProps = {
  onClick: () => void;
  label: string;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
  return (
    <Button variant="contained" color="secondary" onClick={props.onClick}>
      {props.label}
    </Button>
  );
};

export default SecondaryButton;