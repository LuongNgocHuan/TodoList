// cSpell:ignore todos, uuidv
import { Link, Outlet } from "react-router-dom";

import CreateToDo from "../components/CreateToDo";
import ToDoList from "../components/ToDoList";

import Code from "../assets/img/code.png";
import Hidden from "../assets/img/hidden.png";

function TodoPage() {
  return (
    <>
      <div>
        <CreateToDo />

        <ToDoList />
      </div>
      <div className="flex justify-center mt-10 gap-8 ">
        <Link
          to="/set-code"
          className="flex justify-center items-center px-4 gap-2  p-2 bg-green-600 text-white rounded-xl shadow-lg shadow-slate-400"
        >
          {" "}
          <img className="size-4" src={Code} alt="" /> Click here
          to go set-code
        </Link>
        <Link
          to="/pin-code"
          className="flex justify-center items-center px-4 gap-2  p-2 bg-orange-500 text-white rounded-xl shadow-lg shadow-slate-400"
        >
          {" "}
          <img className="size-4" src={Hidden} alt="" /> Click here
          to go pin-code
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default TodoPage;
