import { TodoButtons } from "./Clients";

export const TodoItem = ({title,desc}) => {
    return (
      <div className="grid-item bg-slate-200 p-2 flex flex-col gap-1 rounded">
        <h3 className="font-bold lowercase capitalize text-[20px]">
          {title}
        </h3>
        <p>{desc}</p>
        <div className="flex gap-2">
         <TodoButtons id={"noteId"} />
        </div>
      </div>
    );
  };