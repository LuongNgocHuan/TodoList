
import { Form, Field, ErrorMessage, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

type FormValues = {
  currentCode: string;
  newCode: string;
  confirmNewCode: string;
  storedCode: string;
};
const setCode = () => {

  // khoi tao gia tri ban dau

  const storedCode = localStorage.getItem("code") || ""

  const initialValues: FormValues = {
    currentCode: "",
    newCode: "",
    confirmNewCode: "",
    storedCode: storedCode,
  };

  // Khai báo validation schema với Yup
  const validationSchema = Yup.object().shape({
    currentCode: Yup.string().when("storedCode", {
      is: (storedCode: string) => !!storedCode,
      then: () => Yup.string()
        .matches(/^\d{6}$/, "Current code must be exactly 6 digits")
        .required("Current code is required"),
    }),
    newCode: Yup.string()
      .matches(/^\d{6}$/, "New code must be exactly 6 digits")
      .required("New code is required"),
    confirmNewCode: Yup.string()
      .oneOf([Yup.ref("newCode"), undefined], "Confirm code must match new code")
      .required("Confirm new code is required"),
  });

  // Xử lý submit form
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    localStorage.setItem("code", values.newCode);
    alert("set-code successfully!");
    setSubmitting(false);
  };

  return (
    <>
      <div className="mt-10 flex flex-col items-center ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className=" bg-white h-[400px] w-[600px] rounded-2xl shadow-2xl border-2 px-10 ">
              <div className=" flex flex-col justify-center items-center my-10 ">
                <img
                  className="size-16"
                  src="/public/img/avt.png"
                  alt="userImg"
                />
                <h1 className="uppercase font-bold text-2xl"> Welcome</h1>
              </div>

              <div className="flex flex-col mb-10 gap-4">
                {initialValues.storedCode && (
                  <div className="flex justify-center items-center gap-1 border-b-2">
                    <img
                      className="size-4 "
                      src="/public/img/code.png"
                      alt="password"
                    />
                    <Field
                      className="focus:outline-none w-72"
                      type="text"
                      name="currentCode"
                      placeholder="Enter current code"
                    />
                    <ErrorMessage
                      name="currentCode"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                )}


                <div className="flex justify-center items-center gap-1 border-b-2 ">
                  <img
                    className="size-4 "
                    src="/public/img/code.png"
                    alt="name"
                  />

                  <Field
                    className="focus:outline-none w-72"
                    type="text"
                    name="newCode"
                    placeholder="New code"
                  />
                  <ErrorMessage
                    name="newCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex justify-center items-center gap-1 border-b-2 ">
                  <img
                    className="size-4 "
                    src="/public/img/code.png"
                    alt="email"
                  />
                  <Field
                    className="focus:outline-none w-72"
                    type="text"
                    name="confirmNewCode"
                    placeholder="Confirm new code"
                  />
                  <ErrorMessage
                    name="confirmNewCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />

                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="h-10 w-80 bg-green-600 rounded-2xl shadow-lg text-white "
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

export default setCode;
