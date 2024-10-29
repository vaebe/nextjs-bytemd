import { NextResponse } from 'next/server'

interface SendJson {
  code?: number
  data?: any
  msg?: string
}
export function sendJson(opts: SendJson) {
  return NextResponse.json({ code: 0, msg: '', ...opts }, { status: 200 })
}

