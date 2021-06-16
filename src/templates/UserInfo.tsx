import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Inner from "../components/inner/Inner";
import {
  PageHeaderOfInput,
  PrimaryButton,
  SubmitButton,
  TextInput,
} from "../components/UIKit";
import {
  selectUid,
  createUserInfo,
  selectStartWeight,
  selectTargetWeight,
  selectHeight,
} from "../features/users/usersSlice";

type UserInputs = {
  height: string;
  startWeight: string;
  targetWeight: string;
};
export type SubmitInputs = {
  height: number;
  startWeight: number;
  targetWeight: number;
};

const UserInfo: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const startWeight = useAppSelector(selectStartWeight);
  const targetWeight = useAppSelector(selectTargetWeight);
  const height = useAppSelector(selectHeight);
  const uid = useAppSelector(selectUid);
  const { register, handleSubmit, reset } = useForm();

  const handleRegister = (data: UserInputs) => {
    if (uid) {
      const submitData: SubmitInputs = {
        height: Number(data.height),
        startWeight: Number(data.startWeight),
        targetWeight: Number(data.targetWeight),
      };
      dispatch(createUserInfo(submitData));
      history.push("/");
      reset();
    }
  };

  useEffect(() => {
    if (startWeight && targetWeight && height) {
      reset({
        height,
        startWeight,
        targetWeight,
      });
    }
  }, [startWeight, targetWeight, height]);

  return (
    <Inner>
      <PageHeaderOfInput header={"ユーザー情報入力画面"} />
      <form onSubmit={handleSubmit(handleRegister)}>
        <TextInput
          fullWidth={true}
          label={"身長(cm)"}
          multiline={false}
          required={true}
          type={"number"}
          inputRef={register}
          rows={1}
          name={"height"}
        />
        <TextInput
          fullWidth={true}
          label={"開始体重"}
          multiline={false}
          required={true}
          type={"number"}
          inputRef={register}
          rows={1}
          name={"startWeight"}
        />
        <TextInput
          fullWidth={true}
          label={"目標体重"}
          multiline={false}
          required={true}
          type={"number"}
          inputRef={register}
          rows={1}
          name={"targetWeight"}
        />
        <SubmitButton />
        <PrimaryButton label={"ホームへ"} onClick={() => history.push("/")} />
      </form>
    </Inner>
  );
};

export default UserInfo;
