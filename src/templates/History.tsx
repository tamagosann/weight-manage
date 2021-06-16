import Inner from "../components/inner/Inner";
import {
  IconButton,
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
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectWights, deleteUserWeight } from "../features/users/usersSlice";
import { FC, useCallback } from "react";
import styles from "./History.module.scss";
import { useHistory } from "react-router";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const History: FC = () => {
  const weights = useAppSelector(selectWights);
  const history = useHistory();
  const dispatch = useAppDispatch();

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

  const deleteWeight = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      weightId: string
    ): void => {
      e.stopPropagation();
      if (!window.confirm("本当に消しますか？")) {
        return;
      }
      dispatch(deleteUserWeight(weightId));
    },
    [dispatch]
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
              <TableCell align="right">消去</TableCell>
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
                  <TableCell>
                    <IconButton
                      color="inherit"
                      onClick={(e) => deleteWeight(e, weight.weightId)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
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
