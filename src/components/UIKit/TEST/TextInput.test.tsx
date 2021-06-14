import { render } from "@testing-library/react";
import TextInput from "../TextInput";

test("TextInput test", () => {
  const { getByText, getByDisplayValue } = render(
    <TextInput
      fullWidth={true}
      label={"お名前"}
      multiline={false}
      rows={1}
      required={true}
      value={"秋山"}
      type={"text"}
      onChange={() => {}}
    />
  );
  const element = getByText(/お名前/i);
  const input = getByDisplayValue(/秋山/i);
  expect(element).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});
