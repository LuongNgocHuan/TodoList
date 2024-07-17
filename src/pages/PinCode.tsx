import { useState } from "react";
import { Formik, Form, Field, FieldProps, FormikProps } from "formik";
import * as Yup from "yup";
import { usePinCodeValidation } from "../hooks/usePincode";
import { useNavigate } from "react-router-dom";

type FormValues = {
    pinCode: string[];
}

const PinCode = () => {
    const [isHidden, setIsHidden] = useState(true);

    // su dung hook usePincode
    const pinCode = usePinCodeValidation();

    const navigate = useNavigate();


    // ham hidden code
    const toggleShowHide = () => {
        setIsHidden(!isHidden);
    };


    const validationSchema = Yup.object().shape({
        pinCode: Yup.array()
            .of(
                Yup.string()
                    .matches(/^\d$/, "Only enter numbers")
                    .required("Pin code is required")
            )
            .length(6, "Need to enter 6 numbers"),
    });

    // khoi tao form
    const initialValues = {
        pinCode: Array(6).fill(""),
    };

    const handleSubmit = (values: { pinCode: string[] }) => {
        const enteredPinCode = values.pinCode.join("")
        if (pinCode === enteredPinCode) {
            alert("PIN code matched!")
            // sau khi so sanh (true) back ve todo
            navigate("/", { replace: true });

        } else {
            alert("PIN code does not match!")
            
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
        if (value.length <= 1) {
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
        const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
        // chia chuoi thanh mang va tao mang moi
        const updatedPinCode = [...pasteData.split("")];
        form.setValues({
            pinCode: updatedPinCode.map((char) => char),
        });
        // tu dong chuyen con tro den o cuoi cung
        const lastInput = document.querySelector<HTMLInputElement>(
            `input[name="pinCode.5"]`
        );
        if (lastInput) {
            lastInput.focus();
        }
    };

    // xoa
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
    };

    return (
        <>
            <div className="mt-10 flex flex-col items-center">
                <div className=" bg-white  w-[600px] h-auto pb-8 rounded-2xl shadow-2xl border-2 px-10">
                    <div className="flex flex-col justify-center items-center my-10 ">
                        <img
                            className="size-16"
                            src="/src/img/password.png"
                            alt="pinCodeImg"
                        />
                        <h1 className="uppercase font-bold text-2xl"> Welcome</h1>
                    </div>
                    <p className="flex justify-center items-center mb-4">
                        Please enter your pin code:
                    </p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values }) => (
                            <Form>
                                <div className="flex justify-center items-center gap-4 mb-10 ml-16 ">
                                    {values.pinCode.map((_, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div>
                                                <Field name={`pinCode.${index}`}>
                                                    {({ field, form }: FieldProps) => (
                                                        <input
                                                            {...field}
                                                            className="size-10 border-2 border-gray-500 rounded-lg text-center outline-orange-500"
                                                            type={isHidden ? "text" : "password"}
                                                            maxLength={1}

                                                            onInput={(
                                                                e: React.ChangeEvent<HTMLInputElement>
                                                            ) => handleInput(e, field, form, index)}

                                                            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) =>
                                                                handlePaste(e, form)
                                                            }
                                                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                                                handleKeyDown(e, field, form, index)
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                                {/* <ErrorMessage
                                                    name={`pinCode.${index}`}
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                /> */}
                                            </div>
                                        </div>
                                    ))}

                                    {/* <input
                                        className="size-10 border-2 border-gray-500 rounded-lg text-center focus:outline-none"
                                        type="text"
                                    />
                                    <input
                                        className="size-10 border-2 border-gray-500 rounded-lg text-center focus:outline-none"
                                        type="text"
                                    />
                                    <input
                                        className="size-10 border-2 border-gray-500 rounded-lg text-center focus:outline-none"
                                        type="text"
                                    />
                                    <input
                                        className="size-10 border-2 border-gray-500 rounded-lg text-center focus:outline-none"
                                        type="text"
                                    />
                                    <input
                                        className="size-10 border-2 border-gray-500 rounded-lg text-center focus:outline-none"
                                        type="text"
                                    /> */}

                                    <img
                                        className="size-6 cursor-pointer ml-6"
                                        src={isHidden ? "/src/img/hidden.png" : "/src/img/view.png"}
                                        alt="hiddenImg"
                                        onClick={toggleShowHide}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        className="h-10 w-80 bg-orange-500 rounded-2xl shadow-lg shadow-slate-400 text-white "
                                        type="submit"
                                    >
                                        Submit pin code!
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default PinCode;
