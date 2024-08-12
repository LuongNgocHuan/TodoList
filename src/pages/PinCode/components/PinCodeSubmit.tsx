
import { FormikValues } from 'formik';

type PinCodeSubmitProps = {
  values: FormikValues;
};
const PinCodeSubmit = ({ values }: PinCodeSubmitProps) => {
  return (
    <>
      <div className="flex justify-center">
        <button
          disabled={values.pinCode?.some((i: string) => !i)}
          className="h-10 w-80 bg-orange-500 rounded-2xl shadow-lg shadow-slate-400 text-white disabled:opacity-35"
          type="submit"
        >
          Submit pin code!
        </button>
      </div>
    </>
  );
};

export default PinCodeSubmit;
