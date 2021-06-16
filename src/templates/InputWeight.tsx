import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Inner from "../components/inner/Inner";
import {
  PageHeaderOfInput,
  SecondaryButton,
  SubmitButton,
  TextInput,
} from "../components/UIKit";
import {
  createWeight,
  selectWights,
  updateUserWeights,
  Weight,
} from "../features/users/usersSlice";

type Params = {
  weightId: string | undefined;
};

type UserInputs = {
  date: string;
  weight: string;
  breakfast: string;
  lunch: string;
  dinner: string;
};

//後でomitに描き直す
export interface SubmitInputs {
  date: string;
  weight: number;
  breakfast: string;
  lunch: string;
  dinner: string;
}

interface EditSubmitInputs extends SubmitInputs {
  weightId: string;
}

const getSubmitData: (data: UserInputs) => SubmitInputs = (data) => {
  const submitData: SubmitInputs = {
    ...data,
    weight: Number(data.weight),
  };
  return submitData;
};

const InputWeight: FC = () => {
  const dispatch = useAppDispatch();
  const { weightId } = useParams<Params>();
  const history = useHistory();
  const weights = useAppSelector(selectWights);
  const [editingWeight, setEditingWeight] = useState<Weight | null>(null);
  const { register, handleSubmit, reset } = useForm();
  
  const handleCreate = (data: UserInputs): void => {
    const submitData = getSubmitData(data);
    dispatch(createWeight(submitData));
    reset();
    history.push("/");
  };
  const handleEdit = (data: UserInputs): void => {
    if (weightId) {
      const submitData: EditSubmitInputs = { ...getSubmitData(data), weightId };
      dispatch(updateUserWeights(submitData));
      history.push("/history");
    }
  };

  const today: string = useMemo(() => {
    const date: Date = new Date();
    const today: string =
      date.getFullYear().toString() +
      "-" +
      ("00" + (date.getMonth() + 1).toString()).slice(-2) +
      "-" +
      ("00" + date.getDate().toString()).slice(-2);
    return today;
  }, []);

  useEffect(() => {
    if (weightId) {
      const index = weights.findIndex((weight) => {
        return weight.weightId === weightId;
      });
      const newEditingWeight = weights[index];
      if (newEditingWeight) {
        setEditingWeight(newEditingWeight);
        const setInputs: UserInputs = {
          date: newEditingWeight.date,
          weight: newEditingWeight.weight.toString(),
          breakfast: newEditingWeight.breakfast,
          lunch: newEditingWeight.lunch,
          dinner: newEditingWeight.dinner,
        };
        reset(setInputs);
      }
    }
  }, [weightId, weights, reset]);

  return (
    <Inner>
      <PageHeaderOfInput header={"今日の情報入力画面"} />
      <form
        onSubmit={
          weightId ? handleSubmit(handleEdit) : handleSubmit(handleCreate)
        }
      >
        <TextInput
          fullWidth={true}
          label={"日付"}
          multiline={false}
          required={true}
          type={"date"}
          inputRef={register}
          rows={1}
          name={"date"}
          defaultValue={today}
        />
        <TextInput
          fullWidth={true}
          label={"体重"}
          multiline={false}
          required={true}
          type={"number"}
          inputRef={register}
          rows={1}
          name={"weight"}
          defaultValue={
            editingWeight ? editingWeight.weight.toString() : undefined
          }
        />
        <TextInput
          fullWidth={true}
          label={"朝ご飯"}
          multiline={false}
          required={false}
          type={"text"}
          inputRef={register}
          rows={1}
          name={"breakfast"}
          defaultValue={editingWeight ? editingWeight.breakfast : undefined}
        />
        <TextInput
          fullWidth={true}
          label={"昼ご飯"}
          multiline={false}
          required={false}
          type={"text"}
          inputRef={register}
          rows={1}
          name={"lunch"}
          defaultValue={editingWeight ? editingWeight.lunch : undefined}
        />
        <TextInput
          fullWidth={true}
          label={"夜ご飯"}
          multiline={false}
          required={false}
          type={"text"}
          inputRef={register}
          rows={1}
          name={"dinner"}
          defaultValue={editingWeight ? editingWeight.dinner : undefined}
        />
        <SubmitButton />
        <SecondaryButton label={"ホームへ"} onClick={() => history.push("/")} />
        {weightId && (
          <SecondaryButton
            label={"ヒストリーへ"}
            onClick={() => history.push("/history")}
          />
        )}
      </form>
    </Inner>
  );
};

export default InputWeight;
