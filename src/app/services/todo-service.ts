
import axios, { AxiosError } from "axios";
import { TodoType } from "./todo-type";
import { ServerError } from "./error-type";
export async function getTodo(id: number): Promise<TodoType | ServerError> {
  try {
    const response = await axios.get(`http://localhost:3000/api/user/${id}`);
    
    return response.data;
    // if (isMatchingType(response.data.TodoType, keysOfProps)) {
    //   return response.data;
    // } else {
    //   throw new AxiosError("Not Match response type.");
    // }
  } catch (error: any | AxiosError) {
    return errorhandler(error);
  }
}


function isMatchingType<T>(data: any, expectedTypeKeys: string[]): data is T {
  const dataKeys = Object.keys(data);
  
  // ตรวจสอบว่ารายการคีย์ของ data ตรงกับ expectedTypeKeys
  return expectedTypeKeys.every((key) => dataKeys.includes(key));
}

const errorhandler = (error:any | AxiosError)  => {
  console.log(error)
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<ServerError>;
    console.log(serverError)
    if (serverError && serverError.response?.data.errorMessage) { //Format Error ถูก
      console.log("1")
      return serverError.response.data;
    }else if (serverError && serverError.response?.data){
      console.log("2")
      return { errorMessage: JSON.stringify(serverError.response?.data) } //Format Error ไม่ถูก
    }else if(serverError.response){
      console.log("3")
      if(serverError.code === "ERR_BAD_RESPONSE"){
        console.log("3.1")
        return { errorMessage: `statusCode:${serverError.response.status}, message: ERR_BAD_RESPONSE` }
      }else{
        console.log("3.2")
        return { errorMessage: `statusCode:${serverError.response.status}, message: __` }
      }
    }else if(serverError.message){
      return { errorMessage: serverError.message }
    }else{
      return { errorMessage: "Something Error..." }

    }
  }
  console.log("100")
  return { errorMessage: "Isn't isAxiosError "+ error };
}