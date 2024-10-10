import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/test.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return NextResponse.json({ content: fileContent }, { status: 200 })
}
