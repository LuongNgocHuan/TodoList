import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, FieldProps, FormikProps, FormikHelpers } from "formik";
// import * as Yup from "yup";
import { usePinCodeValidation } from "../hooks/usePincode";
import { useNavigate } from "react-router-dom";
import { isValidNumber } from "../hooks/isValidNumber";


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

    // su dung disabled
    // const validationSchema = Yup.object().shape({
    //     pinCode: Yup.array()
    //         .of(
    //             Yup.string()
    //                 .matches(/^\d$/, "Only enter numbers")
    //                 .required("Pin code is required")
    //         )
    //         .length(6, "Need to enter 6 numbers"),
    // });

    // khoi tao form
    const initialValues = {
        pinCode: Array(6).fill(""),
    };

    const handleSubmit = (values: { pinCode: string[] }, { setValues }: FormikHelpers<FormValues>) => {
        const enteredPinCode = values.pinCode.join("")
        // not working
        if (!enteredPinCode) {
            alert("You need to enter the pin code");
            return;
        }


        if (pinCode === enteredPinCode) {
            alert("PIN code matched!")
            // sau khi so sanh (true) back ve todo
            navigate("/", { replace: true });

        } else {
            alert("PIN code does not match!")
            // sau khi so sanh (false) fill ""
            setValues({ pinCode: Array(6).fill("") })
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
        // if (value.length <= 1) {
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
        const pasteNumbers = pasteData.split("")
        // lay chi so o hien tai
        const currentIndex = Number(e.currentTarget.name.split(".")[1])
        // khoi tao bien kiem duyet qua cac mang
        let pasteNumbersIndex = 0
        // vong lap gan gia tri tu o input hien tai tro di
        for (let index = currentIndex; index < 6 && pasteNumbersIndex < pasteNumbers.length; index++) {
            // tao ten truong input dua tren index hien tai
            const name = `pinCode.${index}`
            // gan gia tri tung mang vao input tuong ung
            form.setFieldValue(name, pasteNumbers[pasteNumbersIndex])
            pasteNumbersIndex++
        }

        // chia chuoi thanh mang va tao mang moi / tu dong them ky tu rong khi khong du 6 ky tu
        // const updatedPinCode = [...pasteData.split(""), ...Array(6 - pasteData.length).fill("")];
        // form.setValues({
        //     // pinCode: updatedPinCode.map((char) => char),
        //     pinCode: updatedPinCode.concat(Array(6 - updatedPinCode.length).fill("")),
        // });


        // // tu dong chuyen con tro den o cuoi cung / loi (lan paste thu 2 diem focus se nam tai diem focus lan thu nhat)
        // const lastInputIndex = pasteNumbers.length - 1;
        // const lastInput = document.querySelector<HTMLInputElement>(
        //     // `input[name="pinCode.5"]`
        //     `input[name="pinCode.${lastInputIndex}"]`
        // );
        // if (lastInput) {
        //     lastInput.focus();
        // }



        //tinh toan chi so cua o tiep theo ma focus duoc di chuyen den sau khi paste/ ko vuot qua 6
        const nextIndex = Math.min(currentIndex + pasteNumbers.length, 5); 
        // tim phan tu trong dom theo name
        const nextInput = document.querySelector<HTMLInputElement>(`input[name="pinCode.${nextIndex}"]`);
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


        // chan cac ky tu khong phai la so/ su dung onChange

        // if (!/[0-9\b]|^(Meta|KeyV|Backspace)$/.test(e.key) &&
        //     // cmd + v = false
        //     !(e.metaKey && e.key === "v")) {
        //     e.preventDefault();
        // }

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
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    useEffect(() => {
        // check o nhap lieu dau tien
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

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
                        // validationSchema={validationSchema}/ su dung disabled
                        onSubmit={handleSubmit}
                    >
                        {({ values }) => (
                            <Form>
                                <div className="flex justify-center items-center gap-4 mb-10 ml-16 ">
                                    {values.pinCode.map((_, index) => (
                                        <div key={index} className="relative flex flex-col items-center">
                                            <div className="">
                                                <Field name={`pinCode.${index}`}>
                                                    {({ field, form }: FieldProps) => (
                                                        <input
                                                            {...field}
                                                            className="size-10 border-2 border-gray-500 rounded-lg text-center outline-orange-500"
                                                            type={isHidden ? "text" : "password"}
                                                            maxLength={1}
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>
                                                            ) => handleInput(e, field, form, index)}

                                                            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) =>
                                                                handlePaste(e, form)
                                                            }
                                                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                                                handleKeyDown(e, field, form, index)
                                                            }
                                                            ref={(el) => (inputRefs.current[index] = el)}

                                                        />
                                                    )}
                                                </Field>

                                            </div>

                                        </div>
                                    ))}


                                    <img
                                        className="size-6 cursor-pointer ml-6"
                                        src={isHidden ? "/src/img/hidden.png" : "/src/img/view.png"}
                                        alt="hiddenImg"
                                        onClick={toggleShowHide}
                                    />
                                </div>


                                <div className="flex justify-center">
                                    <button
                                        disabled={values.pinCode?.some(i => !i)}
                                        className="h-10 w-80 bg-orange-500 rounded-2xl shadow-lg shadow-slate-400 text-white disabled:opacity-35"
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
