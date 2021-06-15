import React, { FC } from "react";
import { useHistory } from "react-router";
import Inner from "../components/inner/Inner";
import { PrimaryButton } from "../components/UIKit";
import Calendar, { CalendarTileProperties } from "react-calendar";
import { useAppSelector } from "../app/hooks";
import { selectWights } from "../features/users/usersSlice";
import styles from "./Calender.module.scss";

const getDayFromDate = (date: Date): string => {
  const today: string =
    date.getFullYear().toString() +
    "-" +
    ("00" + (date.getMonth() + 1).toString()).slice(-2) +
    "-" +
    ("00" + date.getDate().toString()).slice(-2);
  return today;
};

const Calender: FC = () => {
  const history = useHistory();
  const weights = useAppSelector(selectWights);
  const getTileContent = (props: CalendarTileProperties) => {
    if (props.view !== "month") {
      return null;
    } else {
      const dateInString = getDayFromDate(props.date);
      const index = weights.findIndex((weight) => {
        return weight.date === dateInString;
      });
      if (index >= 0) {
        const weightToShow = weights[index].weight;
        return <p className={styles.weightToShow}>{weightToShow}</p>;
      }
      return <p>未入力</p>;
    }
  };
  return (
    <Inner>
      <Calendar
        locale={"ja-JP"}
        value={new Date()}
        tileContent={getTileContent}
        calendarType={"US"}
        prev2Label={null}
        next2Label={null}
        onClickDay={(value) => history.push("/input-weight")}
      />
      <PrimaryButton label={"ホームへ"} onClick={() => history.push("/")} />
    </Inner>
  );
};

export default Calender;
