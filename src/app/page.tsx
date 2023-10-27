"use client"

import { useEffect, useState } from "react"
import { getTodo } from "./services/todo-service"
import { AxiosError } from "axios"
import {TodoType} from './services/todo-type'
export default function Home() {
  const [error,setError] = useState<string | null>(null)
  const [data,setData] = useState<TodoType | null>(null)

  const [id,setId] = useState(0)


  const getTodoData = async(id:number) =>{
    const data =  await getTodo(id)
    if ('errorMessage' in data) {
      setError(data.errorMessage)
      setData(null)
    } else if(data instanceof AxiosError) {
      setError("5555")
      setData(null)
    }else{
      setError(null)
      setData(data)
    }
  }
  useEffect(()=>{
    getTodoData(id)
  },[id])
  return (
    <div>
      <div>Error : {error}</div>
      <div>data : {JSON.stringify(data)}</div>
      <div>ID : {id}</div>
      <div>
        <button onClick={()=>setId((id)=>(id+1))}>Add</button>
      </div>
    </div>
  )
}
