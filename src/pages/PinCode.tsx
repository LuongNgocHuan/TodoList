import Password from "../assets/img/password.png";
import PinCodeInput from "./PinCode/components/PinCodeInput";

const PinCode = ({ onSuccess }: { onSuccess?: () => void }) => {
  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <div className=" bg-white  w-[600px] h-auto pb-8 rounded-2xl shadow-2xl border-2 px-10">
          <div className="flex flex-col justify-center items-center my-10 ">
            <img className="size-16" src={Password} alt="pinCodeImg" />
            <h1 className="uppercase font-bold text-2xl"> Welcome</h1>
          </div>
          <p className="flex justify-center items-center mb-4">
            Please enter your pin code:
          </p>
          <PinCodeInput onSuccess={onSuccess} />
        </div>
      </div>
    </>
  );
};

export default PinCode;
