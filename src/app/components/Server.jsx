import { TodoButtons } from "./Clients";

export const TodoItem = ({ title, desc, level, noteId }) => {
  let cardbg = "bg-slate-200";
  if (level == "medium") {
    cardbg = "bg-yellow-200";
  }
  if (level == "high") {
    cardbg = "bg-red-200";
  }
  return (
    <div className={`grid-item ${cardbg} p-2 flex flex-col gap-1 rounded `}>
      <h3 className="font-bold capitalize text-[20px]">{title}</h3>
      <p>{desc}</p>
      <div className="flex justify-center items-center gap-2">
        <span className="py-1 px-2 text-white font-bold text-[12px] uppercase bg-blue-700">
          {level}
        </span>
        <TodoButtons id={noteId} title={title} desc={desc} level={level} />
      </div>
    </div>
  );
};
