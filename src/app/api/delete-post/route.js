import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    await prisma.post.delete({
      where: {
        id: +postId
      }
    });

    return NextResponse.json({ success: true, })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}