import axios, { AxiosError } from "axios";
import { ServerError } from "./error-type";

function isMatchingType<T>(data: any, keys: (keyof T)[]): data is T {
  return keys.every((key) => key in data);
}

export function checkObject<T>(data: T, type: (keyof T)[]): T {
  if (isMatchingType(data, type)) {
    return data;
  } else {
    throw new AxiosError("Not Match response type.");
  }
}

export function checkArr<T>(data: T[], type: (keyof T)[]): T[] {
  if (Array.isArray(data)) {
    if (data.every((item) => isMatchingType(item, type))) {
      return data;
    } else {
      throw new Error("Not all items match specified type");
    }
  } else {
    throw new Error("Response is not an array");
  }
}

export const errorhandler = (error: any | AxiosError) => {
  console.log(error);
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<ServerError>;
    console.log(serverError);
    if (serverError && serverError.response?.data.errorMessage) {
      //Format Error ถูก
      console.log("1");
      return serverError.response.data;
    } else if (serverError && serverError.response?.data) {
      console.log("2");
      return { errorMessage: JSON.stringify(serverError.response?.data) }; //Format Error ไม่ถูก
    } else if (serverError.response) {
      console.log("3");
      if (serverError.code === "ERR_BAD_RESPONSE") {
        console.log("3.1");
        return {
          errorMessage: `statusCode:${serverError.response.status}, message: ERR_BAD_RESPONSE`,
        };
      } else {
        console.log("3.2");
        return {
          errorMessage: `statusCode:${serverError.response.status}, message: __`,
        };
      }
    } else if (serverError.message) {
      return { errorMessage: serverError.message };
    } else {
      return { errorMessage: "Something Error..." };
    }
  }
  console.log("100");
  return { errorMessage: "Isn't isAxiosError " + error };
};
