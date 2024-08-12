
import { ErrorMessage, Field } from "formik"
import Code from "../../../assets/img/code.png"


const SetCodeInput = ({initialValues, errors, touched}: any) => {
  return (
    <>
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
    </>
  )
}

export default SetCodeInput