import { TodoType } from "@/app/services/todo-type";
import { NextApiRequest, NextApiResponse } from "next";

// api > hello > route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: { id: string } }
) {
  //http://localhost:3000/api/user/all
  if(params.params.id === "all"){
    return NextResponse.json([
      {
        userId: "1",
        id: "1",
        title: "Hello",
        completed: false,
      },
      {
        id: "2",
        title: "Hello",
        completed: false,
      },
    ],
      { status: 200 }
    );
  }

   //http://localhost:3000/api/user/2
  if(params.params.id === "2"){
    return NextResponse.json(
      { errorMessage: "ไม่พบข้อมูลนี้ในระบบ" },
      { status: 404 }
    );
  }
   //http://localhost:3000/api/user/3
  if(params.params.id === "3"){
    return NextResponse.json(
      { errorMessage: "Server Error" },
      { status: 500 }
    );
  }

   //http://localhost:3000/api/user/4
  if(params.params.id === "4"){
    return NextResponse.json(
      { testError: "Server Error" },
      { status: 500 }
    );
  }

   //http://localhost:3000/api/user/5
  if(params.params.id === "5"){
    return 1
  }

   //http://localhost:3000/api/user/6
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
