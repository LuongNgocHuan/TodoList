import { ChangeEvent,KeyboardEvent } from "react";

type Props = {
    newToDoString: string;
    onNewToDoChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onAddBtn: () => void;
};

const CreateToDo = ({ newToDoString, onNewToDoChange, onAddBtn }: Props) => {

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddBtn();
        }
    };
    return (
        <>
            <div className="mt-4 mx-4">
                <p className="text-3xl font-bold mb-2">To Do List</p>
                <div className="flex gap-4">

                    <input
                        className=" pl-2 border-gray-500 shadow-md h-10 w-2/3"
                        type="text"
                        placeholder="Enter your to-dos"
                        value={newToDoString}
                        onChange={onNewToDoChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="bg-green-600 text-white px-2  border rounded-md"
                        type="button"
                        onClick={onAddBtn}
                    >
                        Add Task
                    </button>
                </div>
                <hr className="my-4"/>
            </div>
            

        </>
    );
};

export default CreateToDo;
