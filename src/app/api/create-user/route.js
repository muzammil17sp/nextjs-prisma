import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(req) {
    try {

        const { authData: { email, name } } = await req.json()
        const newUser = await prisma.user.create({
            data: {
                email,
                name
            },
        });

        return NextResponse.json({ success: true, newUser })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}