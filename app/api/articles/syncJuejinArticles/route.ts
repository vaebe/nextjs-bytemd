// 导入所需的依赖
import dayjs from 'dayjs'
import { PrismaClient } from '@prisma/client'
import { sendJson } from '@/lib/utils'

// 初始化 Prisma 客户端实例
const prisma = new PrismaClient()

/**
 * 添加或更新文章到数据库
 * @param info 掘金文章信息
 */
async function addArticle(info: any) {
  // 解构文章信息
  const {
    article_id,
    title,
    cover_image,
    brief_content,
    view_count,
    ctime,
    collect_count,
    digg_count
  } = info.article_info

  // 构建文章数据对象
  const data = {
    title: title,
    content: '',          // 文章内容（暂时为空）
    classify: '',         // 文章分类（暂时为空）
    coverImg: cover_image,// 封面图片
    summary: brief_content,// 文章摘要
    status: '',           // 文章状态（暂时为空）
    source: '01',         // 来源标识（01 表示掘金）
    userId: 1,            // 用户ID
    views: view_count,    // 浏览量
    likes: digg_count,    // 点赞数
    favorites: collect_count,// 收藏数
    createdAt: dayjs(ctime * 1000).toDate(),// 创建时间
    updatedAt: dayjs(ctime * 1000).toDate() // 更新时间
  }

  // 使用 upsert 操作：存在则更新，不存在则创建
  await prisma.article.upsert({
    where: { id: article_id },
    update: data,
    create: {
      id: article_id,
      ...data
    }
  })
}

// 用于存储同步的文章标题列表
let syncArticleNameList: string[] = []

/**
 * 递归获取掘金文章列表
 * @param index 分页游标
 */
async function getArticles(index: number) {
  // 调用代理接口获取掘金文章列表
  const res = await fetch(`${process.env.SITE_URL}/api/proxy/juejin/articles?cursor=${index}`).then(
    (res) => res.json()
  )

  // 检查接口返回状态
  if (res?.code !== 0) {
    throw new Error('同步掘金文章失败!')
  }

  const info = res.data

  // 遍历文章列表，添加到数据库
  for (const item of info.data) {
    addArticle(item)
    syncArticleNameList.push(item.article_info.title)
  }

  const nextIndex = index + 10

  // 如果还有更多文章，继续获取下一页
  if (info.has_more) {
    await getArticles(nextIndex)
  }
}

/**
 * GET 请求处理函数
 * 同步掘金文章到数据库
 */
export async function GET(req: Request) {
  // 重置同步文章列表
  syncArticleNameList = []

  // 获取并验证 API 密钥
  const apiKey = req.headers.get('x-api-key')
  const expectedApiKey = process.env.GITHUB_REPOSITORY_API_KEY

  if (!apiKey || apiKey !== expectedApiKey) {
    return sendJson({ code: -1, msg: '无效的 API 密钥' })
  }

  try {
    // 从第一页开始获取文章
    const index = 0
    await getArticles(index)

    console.log(syncArticleNameList)

    // 返回同步成功的文章列表
    return sendJson({ data: syncArticleNameList, msg: '同步掘金文章成功' })
  } catch (error) {
    // 返回错误信息
    return sendJson({ code: -1, msg: `同步掘金文章失败: ${error}` })
  }
}