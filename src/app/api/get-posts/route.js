import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export const GET = async (req) => {
  const posts = await prisma.post.findMany({})
  return NextResponse.json({ success: true, data: posts })
}