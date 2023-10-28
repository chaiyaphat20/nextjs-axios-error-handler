"use client";

import { useEffect, useState } from "react";
import { getTodo, getTodoList } from "./services/todo-service";
import { AxiosError } from "axios";
import { TodoType } from "./services/todo-type";
export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TodoType | null>(null);

  const [dataList, setDataList] = useState<TodoType[]>([]);
  const [errorList, setErrorList] = useState<string | null>(null);

  const [id, setId] = useState(0);

  const getTodoData = async (id: number) => {
    const data = await getTodo(id);
    if ("errorMessage" in data) {
      setError(data.errorMessage);
      setData(null);
    } else if (data instanceof AxiosError) {
      setError("5555");
      setData(null);
    } else {
      setError(null);
      setData(data);
    }
  };

  const getTodoDataList = async () => {
    const data = await getTodoList();
    if ("errorMessage" in data) {
      setErrorList(data.errorMessage);
      setData(null);
    } else if (data instanceof AxiosError) {
      setDataList([]);
    } else {
      setErrorList(null);
      setDataList(data);
    }
  };
  useEffect(() => {
    getTodoData(id);
    getTodoDataList();
  }, [id]);
  return (
    <div className="flex-row flex -md:flex-col">
      <div className="bg-pink-200 w-1/2 -md:w-full -md:bg-slate-500">
        <h1 className="text-red-500 -2xl:text-yellow-500 -xl:text-green-500 -lg:text-blue-600 -md:text-stone-600 -sm:text-fuchsia-900">
          Error : {error}
        </h1>
        <div className="-sm:invisible">data : {JSON.stringify(data)}</div>
      </div>

      <div className="w-10 h-10 -md:h-2"></div>

      <div className="bg-yellow-200 w-1/2 -md:w-full ">
        <div className="-sm:invisible">dataList : {JSON.stringify(dataList)}</div>
        <div>ErrorList : {errorList}</div>

        <div>ID : {id}</div>
        <div>
          <button
            onClick={() => setId((id) => id + 1)}
            className="-xl:invisible -lg:visible"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
