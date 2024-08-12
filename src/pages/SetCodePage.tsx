import { Form, Formik, FormikHelpers } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Avt from "../assets/img/avt.png";
import SetCodeInput from "./SetCode/components/SetCodeInput";
import SetCodeSubmit from "./SetCode/components/SetCodeSubmit";


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
          {({isSubmitting, errors, touched }) => (
            <Form className=" bg-white  w-[600px] h-auto pb-8 rounded-2xl shadow-2xl border-2 px-10 ">
              <div className=" flex flex-col justify-center items-center my-10 ">
                <img className="size-16" src={Avt} alt="userImg" />
                <h1 className="uppercase font-bold text-2xl"> Welcome</h1>
              </div>

              <SetCodeInput initialValues={initialValues} errors={errors} touched={touched} />

              <SetCodeSubmit isSubmitting={isSubmitting}/>

            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SetCodePage;
