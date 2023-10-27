import { TodoType } from "@/app/services/todo-type";
import { NextApiRequest, NextApiResponse } from "next";

// api > hello > route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: { id: string } }
) {
  if(params.params.id === "2"){
    return NextResponse.json(
      { errorMessage: "ไม่พบข้อมูลนี้ในระบบ" },
      { status: 404 }
    );
  }
  if(params.params.id === "3"){
    return NextResponse.json(
      { errorMessage: "Server Error" },
      { status: 500 }
    );
  }
  if(params.params.id === "4"){
    return NextResponse.json(
      { testError: "Server Error" },
      { status: 500 }
    );
  }

  if(params.params.id === "5"){
    return 1
  }

  if(params.params.id === "6"){
    return NextResponse.json({data:null})
  }
  const data: TodoType = {
    userId: +params.params.id,
    id: +params.params.id,
    title: "Hello",
    completed: false,
  };
  if (!data) {
    return NextResponse.json(
      { errorMessage: "ไม่พบข้อมูลนี้ในระบบ" },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}
