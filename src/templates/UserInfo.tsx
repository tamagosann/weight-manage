import React, { FC } from "react";
import { useForm } from "react-hook-form";
import Inner from "../components/inner/Inner";
import { PageHeaderOfInput, SubmitButton, TextInput } from "../components/UIKit";

type UserInputs = {
  nickname: string,
  age: string,
  height: string,
  weight: string,
  targetWeight: string,
}
type SubmitInputs = {
  nickname: string,
  age: number,
  height: number,
  weight: number,
  targetWeight: number,
}

const UserInfo: FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const handleRegister = (data: UserInputs) => {
    const submitData: SubmitInputs = {
      nickname: data.nickname,
      age: Number(data.age),
      height: Number(data.height),
      weight: Number(data.weight),
      targetWeight: Number(data.targetWeight),
    }
    console.log(submitData)
  };
  return (
    <Inner>
      <PageHeaderOfInput header={"ユーザー情報入力画面"} />
      <form onSubmit={handleSubmit(handleRegister)}>
        <TextInput
          fullWidth={true}
          label={"ニックネーム"}
          multiline={false}
          required={true}
          type={'text'}
          inputRef={register}
          rows={1}
          name={'nickname'}
        />
        <TextInput
          fullWidth={true}
          label={"年齢"}
          multiline={false}
          required={true}
          type={'number'}
          inputRef={register}
          rows={1}
          name={'age'}
        />
        <TextInput
          fullWidth={true}
          label={"身長(cm)"}
          multiline={false}
          required={true}
          type={'number'}
          inputRef={register}
          rows={1}
          name={'height'}
        />
        <TextInput
          fullWidth={true}
          label={"体重"}
          multiline={false}
          required={true}
          type={'number'}
          inputRef={register}
          rows={1}
          name={'weight'}
        />
        <TextInput
          fullWidth={true}
          label={"目標体重"}
          multiline={false}
          required={true}
          type={'number'}
          inputRef={register}
          rows={1}
          name={'targetWeight'}
        />
        <SubmitButton />
      </form>
    </Inner>
  );
};

export default UserInfo;
