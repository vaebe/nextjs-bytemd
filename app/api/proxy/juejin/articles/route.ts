import { sendJson } from '@/lib/utils'

// GET 是接口的请求类型 
// 可以是 `GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD`和`OPTIONS` 。
// https://nextjs.org/docs/app/api-reference/file-conventions/route
export async function GET(req: Request) {
  try {
    // 从 URL 获取查询参数
    const { searchParams } = new URL(req.url)
    const cursor = parseInt(searchParams.get('cursor') || '0')

    const res = await fetch('https://api.juejin.cn/content_api/v1/article/query_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: process.env.JUEJIN_USER_ID, // 掘金的 uid 这里在 env 文件中获取
        sort_type: 2,
        cursor: `${cursor}` // 根据传递的参数获取数据
      })
    })

    const data = await res.json()
    
    // 返回数据
    return sendJson({ data })
  } catch (error) {
    return sendJson({ code: -1, msg: `${error}` })
  }
}