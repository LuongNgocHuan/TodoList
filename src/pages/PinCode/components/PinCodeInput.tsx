import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  FieldProps,
  FormikProps,
  FormikHelpers,
} from "formik";

import { usePinCodeValidation } from "../../../hooks/usePincode";
import { isValidNumber } from "../../../hooks/isValidNumber";

import Hidden from "../../../assets/img/hidden.png";
import View from "../../../assets/img/view.png";
import PinCodeSubmit from "./PinCodeSubmit";

type FormValues = {
  pinCode: string[];
};

const PinCodeInput = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [hidden, setHidden] = useState(true);

  // su dung hook usePincode
  const pinCode = usePinCodeValidation();

  const navigate = useNavigate();

  // ham hidden code
  const toggleShowHide = () => {
    setHidden(!hidden);
  };

  // khoi tao form
  const initialValues = {
    pinCode: Array(6).fill(""),
  };

  const handleSubmit = (
    values: { pinCode: string[] },
    { setValues }: FormikHelpers<FormValues>
  ) => {
    const enteredPinCode = values.pinCode.join("");

    if (!enteredPinCode) {
      alert("You need to enter the pin code");
      return;
    }

    if (pinCode === enteredPinCode) {
      alert("PIN code matched!");
      // sau khi so sanh (true) back ve todo
      if (onSuccess) {
        onSuccess();
      }
      navigate("/", { replace: true });
    } else {
      alert("PIN code does not match!");
      // sau khi so sanh (false) fill ""
      setValues({ pinCode: Array(6).fill("") });
    }
  };

  // nhap
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: FieldProps["field"],
    form: FormikProps<FormValues>,
    index: number
  ) => {
    // lay value nhap vao
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (isValidNumber(value)) {
      form.setFieldValue(field.name, value);
      // value nhap vao khong phai o cuoi
      if (value.length === 1 && index < 5) {
        // tim o tiep theo
        const nextInput = document.querySelector<HTMLInputElement>(
          `input[name="pinCode.${index + 1}"]`
        );
        if (nextInput) nextInput.focus();
      }
    }
  };

  // paste
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    form: FormikProps<FormValues>
  ) => {
    // bo hanh vi dan mac dinh cua web
    e.preventDefault();
    // get value tu clipboard / chi lay 6 ki tu dau
    let pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
    pasteData = pasteData.replace(/[^0-9]/g, "");

    // chia chuoi pasteData thanh mang rieng
    const pasteNumbers = pasteData.split("");
    // lay chi so o hien tai
    const currentIndex = Number(e.currentTarget.name.split(".")[1]);
    // khoi tao bien kiem duyet qua cac mang
    let pasteNumbersIndex = 0;
    // vong lap gan gia tri tu o input hien tai tro di
    for (
      let index = currentIndex;
      index < 6 && pasteNumbersIndex < pasteNumbers.length;
      index++
    ) {
      // tao ten truong input dua tren index hien tai
      const name = `pinCode.${index}`;
      // gan gia tri tung mang vao input tuong ung
      form.setFieldValue(name, pasteNumbers[pasteNumbersIndex]);
      pasteNumbersIndex++;
    }

    //tinh toan chi so cua o tiep theo ma focus duoc di chuyen den sau khi paste/ ko vuot qua 6
    const nextIndex = Math.min(currentIndex + pasteNumbers.length, 5);
    // tim phan tu trong dom theo name
    const nextInput = document.querySelector<HTMLInputElement>(
      `input[name="pinCode.${nextIndex}"]`
    );
    // forcus vao o tiep theo
    if (nextInput) {
      nextInput.focus();
    }
  };

  // xoa / chan
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: FieldProps["field"],
    form: FormikProps<FormValues>,
    index: number
  ) => {
    // chuyen con tro den o truoc do khi backspace
    if (e.key === "Backspace" && !field.value && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(
        `input[name="pinCode.${index - 1}"]`
      );
      if (prevInput) {
        prevInput.focus();
        form.setFieldValue(`pinCode.${index - 1}`, "");
      }
    }
    // enter
    if (e.key === "Enter") {
      handleSubmit(form.values, form);
    }
  };

  // ham su ly focus input
  // tao ref de giu cac tham chieu den o input
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    // check o nhap lieu dau tien
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <div className="flex justify-center items-center gap-4 mb-10 ml-16 ">
              {values.pinCode.map((_, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <div className="">
                    <Field name={`pinCode.${index}`}>
                      {({ field, form }: FieldProps) => (
                        <input
                          {...field}
                          className="size-10 border-2 border-gray-500 rounded-lg text-center outline-orange-500"
                          type={hidden ? "text" : "password"}
                          maxLength={1}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInput(e, field, form, index)
                          }
                          onPaste={(
                            e: React.ClipboardEvent<HTMLInputElement>
                          ) => handlePaste(e, form)}
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>
                          ) => handleKeyDown(e, field, form, index)}
                          ref={(el) => (inputRefs.current[index] = el)}
                        />
                      )}
                    </Field>
                  </div>
                </div>
              ))}

              <img
                className="size-6 cursor-pointer ml-6"
                src={hidden ? Hidden : View}
                alt="hiddenImg"
                onClick={toggleShowHide}
              />
            </div>

            <PinCodeSubmit values={values} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PinCodeInput;
