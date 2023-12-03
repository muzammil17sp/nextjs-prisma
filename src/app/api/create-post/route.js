import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(req) {
  try {

    const data = await req.json()
    const newPost = await prisma.post.create({
      data: {
        ...data,
      }
    });
    console.log(newPost)

    return NextResponse.json({ success: true, newPost })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error }, { status: 500 })
  }
}