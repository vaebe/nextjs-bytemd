import { PrismaClient } from '@prisma/client'
import { sendJson } from '@/lib/utils'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return sendJson({ data: articles })
  } catch (error) {
    return sendJson({ code: -1, msg: `获取所有文章失败: ${error}` })
  }
}
