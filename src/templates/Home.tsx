import React, { FC, useCallback, useMemo } from "react";
import { Container, Typography } from "@material-ui/core";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { PrimaryButton } from "../components/UIKit";
import { useHistory } from "react-router";
import { useAppSelector } from "../app/hooks";
import {
  selectCurrentWeight,
  selectStartWeight,
  selectTargetWeight,
  selectWights,
} from "../features/users/usersSlice";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { IconContainerProps, Rating } from "@material-ui/lab";
import { evaluateStatusByBmi, EvaluateStatus } from "../common/bmiEvaluate";

type GraphData = {
  date: string;
  weight: number;
}[];

const Home: FC = () => {
  const history = useHistory();
  const weights = useAppSelector(selectWights);
  const startWeight = useAppSelector(selectStartWeight);
  const currentWeight = useAppSelector(selectCurrentWeight);
  const targetWeight = useAppSelector(selectTargetWeight);
  const height = 170;
  const data: GraphData = weights.map((weight) => {
    return { date: weight.date, weight: weight.weight };
  });
  const link = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history]
  );
  const Bmi = useMemo(() => {
    if (currentWeight) {
      const bmi: number = Math.floor(currentWeight / (height / 100) ** 2);
      return bmi;
    }
  }, [currentWeight]);

  const status: EvaluateStatus = useMemo(() => {
    if (Bmi) {
      return evaluateStatusByBmi(Bmi);
    } else {
      return { status: 0, message: "" };
    }
  }, [Bmi]);

  const customIcons: {
    [index: string]: { icon: React.ReactElement; label: string };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: "Very Satisfied",
    },
  };
  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  return (
    <Container maxWidth="md" style={{ padding: 20, marginTop: 90 }}>
      <Typography align="center">現在のBMI：{Bmi && Bmi}</Typography>
      <Typography align="center">
        <Rating
          value={status.status}
          getLabelText={(value: number) => customIcons[value].label}
          IconContainerComponent={IconContainer}
        />
      </Typography>
      {status.message && (
        <Typography align="center">{status.message}</Typography>
      )}
      <ResponsiveContainer width="100%" height="40%" minHeight={400}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[40, 90]} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <ReferenceLine
            y={startWeight}
            label="開始体重"
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={targetWeight}
            label="目標体重"
            stroke="blue"
            strokeDasharray="3 3"
          />
          <Brush dataKey="date" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div>
        <PrimaryButton
          label={"記録を追加"}
          onClick={() => link("/input-weight")}
        />
        <PrimaryButton
          label={"履歴画面へ"}
          onClick={() => link("/history")}
        />
      </div>
    </Container>
  );
};

export default Home;
