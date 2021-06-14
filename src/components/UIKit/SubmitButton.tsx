import React from "react";
import { Button } from "@material-ui/core";

type SubmitButtonProps = {
  onClick?: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      onClick={props.onClick}
    >
      送信
    </Button>
  );
};

export default SubmitButton;
