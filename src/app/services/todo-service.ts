
import axios, { AxiosError } from "axios";
import { TodoType } from "./todo-type";
import { ServerError } from "./error-type";
import { checkArr, checkObject, errorhandler } from "./type";

export async function getTodo(id: number): Promise<TodoType | ServerError> {
  try {
    const response = await axios.get<TodoType>(`http://localhost:3000/api/user/${id}`);

    const todoKeys: (keyof TodoType)[] = ['id', 'completed', 'userId','title'];
    return checkObject(response.data,todoKeys)
  } catch (error: any | AxiosError) {
    return errorhandler(error);
  }
}

export async function getTodoList(): Promise<TodoType[] | ServerError> {
  try {
    const response = await axios.get<TodoType[]>(`http://localhost:3000/api/user/all`);
    
    const todoKeys: (keyof TodoType)[] = ['id', 'completed','title'];//['id', 'completed', 'userId','title'];
    return checkArr(response.data,todoKeys)
  } catch (error: any | AxiosError) {
    return errorhandler(error);
  }
}