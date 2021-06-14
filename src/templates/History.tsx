import Inner from "../components/inner/Inner";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  PageHeaderOfInput,
  PrimaryButton,
  SecondaryButton,
} from "../components/UIKit";
import { useAppSelector } from "../app/hooks";
import { selectWights } from "../features/users/usersSlice";
import { FC, useCallback } from "react";
import styles from "./History.module.scss";
import { useHistory } from "react-router";

const History: FC = () => {
  const weights = useAppSelector(selectWights);
  const history = useHistory();

  const getWeightDiffsFromPrivWeight = useCallback(
    (index: number): number => {
      if (weights.length <= 1) {
        return 0;
      } else {
        if (index === 0) {
          return 0;
        } else {
          return weights[index].weight - weights[index - 1].weight;
        }
      }
    },
    [weights]
  );

  return (
    <Inner>
      <PageHeaderOfInput header={"体重遍歴"} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell align="right">体重</TableCell>
              <TableCell align="right">前回からの変化</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weights.length > 0 &&
              weights.map((weight, index: number) => (
                <TableRow
                  key={weight.weightId}
                  onClick={() =>
                    history.push(`/input-weight/${weight.weightId}`)
                  }
                >
                  <TableCell component="th" scope="row">
                    {weight.date}
                  </TableCell>
                  <TableCell align="right">{weight.weight}</TableCell>
                  <TableCell
                    align="right"
                    className={
                      getWeightDiffsFromPrivWeight(index) > 0
                        ? styles.historyPlus
                        : styles.historyMinus
                    }
                  >
                    {getWeightDiffsFromPrivWeight(index)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <PrimaryButton
          label={"体重を入力！"}
          onClick={() => history.push("/input-weight")}
        />
        <SecondaryButton label={"ホームへ"} onClick={() => history.push("/")} />
      </div>
    </Inner>
  );
};

export default History;
