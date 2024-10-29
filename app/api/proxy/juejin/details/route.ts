import { sendJson } from '@/lib/utils'
import * as cheerio from 'cheerio' // 引入 cheerio 用于解析 HTML

/**
 * 处理掘金文章详情页的 GET 请求
 * @param req Request 对象
 * @returns 返回处理后的文章内容
 */
export async function GET(req: Request) {
  try {
    // 解析请求 URL
    const url = new URL(req.url)
    const id = url.searchParams.get('id') // 从查询参数中获取文章 id

    // 请求掘金原始文章内容
    const res = await fetch(`https://juejin.cn/post/${id}`, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    })

    // 获取响应的 HTML 文本内容
    const htmlContent = await res.text()

    // 使用 cheerio 加载 HTML 内容，用于后续解析
    const $ = cheerio.load(htmlContent)

    // 移除文章中的 style 标签，清理样式
    $('#article-root style').remove()

    // TODO: 获取 read-time 元素中的阅读时间返回

    // 返回处理后的文章 HTML 内容
    return sendJson({ data: $('#article-root').html() })
  } catch (error) {
    // 发生错误时返回错误信息
    return sendJson({ code: -1, msg: `${error}` })
  }
}