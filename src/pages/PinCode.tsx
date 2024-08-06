import { Form, Field, ErrorMessage, Formik, FormikHelpers } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Avt from "../assets/img/avt.png";
import Code from "../assets/img/code.png";

type FormValues = {
  currentCode: string;
  newCode: string;
  confirmNewCode: string;
  storedCode: string;
};

const SetCodePage = () => {
  const { state } = useLocation(); 

  // khoi tao initialValues formik
  //  returnpath
  const storedCode = localStorage.getItem("code") || "";

  const navigate = useNavigate();

  const initialValues: FormValues = {
    currentCode: "",
    newCode: "",
    confirmNewCode: "",
    storedCode: storedCode,
  };

  // Khai bao validation schema Yup
  const validationSchema = Yup.object().shape({
    currentCode: storedCode
      ? Yup.string().when("storedCode", {
          is: (storedCode: string) => !!storedCode,
          then: () =>
            Yup.string()
              .matches(/^\d{6}$/, "Current code must be exactly 6 digits")
              .required("Current code is required"),
        })
      : Yup.string(),
    newCode: Yup.string()
      .matches(/^\d{6}$/, "New code must be exactly 6 digits")
      .required("New code is required"),
    confirmNewCode: Yup.string()
      .oneOf(
        [Yup.ref("newCode"), undefined],
        "Confirm code must match new code"
      )
      .required("Confirm new code is required"),
  });

  // Xử lý submit form
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    localStorage.setItem("code", values.newCode);
    alert("set-code successfully!");
    setSubmitting(false);
    // chuyen huong ve trang todo khi da them code thanh cong
    if (state?.returnUrl) {
      navigate(state.returnUrl, { replace: true });
    } else {
      navigate("/pin-code", { replace: true });
    }
  };

  return (
    <>
      <div className="mt-10 flex flex-col items-center ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className=" bg-white  w-[600px] h-auto pb-8 rounded-2xl shadow-2xl border-2 px-10 ">
              <div className=" flex flex-col justify-center items-center my-10 ">
                <img className="size-16" src={Avt} alt="userImg" />
                <h1 className="uppercase font-bold text-2xl"> Welcome</h1>
              </div>

              <div className="relative flex flex-col mb-10 gap-8">
                {initialValues.storedCode && (
                  <div className="">
                    <div
                      className={`flex justify-start items-center pl-2 gap-2 border-2 rounded-lg shadow-md ${
                        errors.currentCode && touched.currentCode
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <img className="size-4 " src={Code} alt="password" />
                      <Field
                        className="input-trans focus:outline-none w-full h-12 rounded-lg"
                        type="text"
                        name="currentCode"
                        placeholder=""
                      />
                      <label className="label-inline">Enter current code</label>
                    </div>
                    <ErrorMessage
                      name="currentCode"
                      component="div"
                      className="absolute text-red-500 text-sm mt-1 ml-2"
                    />
                  </div>
                )}

                <div className="">
                  <div
                    className={`flex justify-start items-center pl-2 gap-2 border-2 rounded-lg shadow-md ${
                      errors.newCode && touched.newCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <img className="size-4 " src={Code} alt="name" />

                    <Field
                      className="input-trans focus:outline-none w-full h-12 rounded-lg"
                      type="text"
                      name="newCode"
                      placeholder=""
                    />
                    <label className="label-inline">New code</label>
                  </div>
                  <ErrorMessage
                    name="newCode"
                    component="div"
                    className="absolute text-red-500 text-sm mt-1 ml-2 "
                  />
                </div>

                <div className="">
                  <div
                    className={`flex justify-start items-center pl-2 gap-2 border-2 rounded-lg shadow-md ${
                      errors.confirmNewCode && touched.confirmNewCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <img className="size-4 " src={Code} alt="email" />
                    <Field
                      className="input-trans focus:outline-none  w-full h-12 rounded-lg"
                      type="text"
                      name="confirmNewCode"
                      placeholder=""
                    />
                    <label className="label-inline">Confirm new code</label>
                  </div>
                  <ErrorMessage
                    name="confirmNewCode"
                    component="div"
                    className="absolute text-red-500 text-sm mt-1 ml-2"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="h-10 w-80 bg-green-600 rounded-2xl shadow-lg shadow-slate-400 text-white "
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Enter your code!"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SetCodePage;
