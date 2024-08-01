import { ChangeEvent, KeyboardEvent } from "react";
import { AddTD, LoadingAM } from "./SVG/SVG";

type Props = {
  newToDoString: string;
  onNewToDoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddBtn: () => void;
  loading: boolean
};

const CreateToDo = ({ newToDoString, onNewToDoChange, onAddBtn, loading }: Props) => {
  // enter on keyboard
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAddBtn();
    }
  };

  return (
    <>
      <div className=" mt-4 mx-4 ">
        <div className="flex flex-col justify-center items-center my-10">
          <img className="size-16" src="../assets/img/list.png" alt="" />
          <p className="flex justify-center text-3xl font-bold mb-2">
            Create Your Todo-list
          </p>
        </div>
        <div className="flex justify-center gap-2">
          <input
            className="focus:outline-none pl-2 border-gray-500 border-2 border-opacity-20 rounded-lg shadow-md h-10 w-1/3"
            type="text"
            placeholder="Enter your to-dos"
            value={newToDoString}
            onChange={onNewToDoChange}
            onKeyPress={handleKeyPress}
          />

          <button
            className="bg-green-600 text-white px-2 rounded-lg"
            type="button"
            onClick={onAddBtn}
            disabled={loading}
          >
            {loading ? (LoadingAM
            ) : (AddTD)}

          </button>
        </div>
        <div className="flex justify-center">
          <hr className=" my-4 w-1/2 text-center" />
        </div>
      </div>
    </>
  );
};

export default CreateToDo;
