import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export const POST = async (req) => {
  const data = await req.json()
  const posts = await prisma.post.findMany({
    where: {
      authorId: data.userId
    }
  })
  return NextResponse.json({ success: true, data: posts })
}