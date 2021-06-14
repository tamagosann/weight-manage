import { Container, Paper } from "@material-ui/core";
import { FC } from "react";


const Inner: FC = ({children}) => {
  return (
    <Container maxWidth="sm">
      <Paper
        variant="outlined"
        component="div"
        style={{ padding: 20, marginTop: 90 }}
      >
        {children} 
      </Paper>
    </Container>
  );
};

export default Inner;
