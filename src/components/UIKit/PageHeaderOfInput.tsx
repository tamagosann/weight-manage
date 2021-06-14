import { FC } from "react";
import { Typography } from "@material-ui/core";

type PageHeaderOfInputProps = {
  header: string
}

const PageHeaderOfInput: FC<PageHeaderOfInputProps> = (props) => {
  return (
    <Typography variant="h5" gutterBottom align="center">
      {props.header}
    </Typography>
  );
};

export default PageHeaderOfInput;
