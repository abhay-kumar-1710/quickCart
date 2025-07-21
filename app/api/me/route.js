import { authConfig } from "@/authConfig";
import { connectDB } from "@/database/db";
import { getUserByEmail } from "@/query/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(params) {
    const session = await getServerSession(authConfig)

    if(!session?.user) {
        redirect('/login')
    }

    await connectDB()

    try {
       const user = await getUserByEmail(session?.user?.email) 
       return new NextResponse(JSON.stringify(user), {
        status : 200
       })
    } catch (error) {
        return new NextResponse(error.message, {
            status : 500
        })
    }

}