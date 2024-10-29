'use client'

import { useState, useEffect, useCallback } from 'react'
import { Article } from '@prisma/client'
import Link from 'next/link'

// 类型定义
type GroupedArticles = Record<string, Article[]>
type FetchStatus = 'idle' | 'loading' | 'error' | 'success'

// 动画配置
const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

// 常量
const LOADING_YEARS = 2
const ARTICLES_PER_YEAR = 3
const API_ENDPOINT = '/api/articles/all'






const ArticleInfo = ({ info }: { info: Article }) => {
  const date = new Date(info.createdAt).toLocaleDateString()

  return (
    <Link
      href={`/article/${info.id}`}
      target="_blank"
      className="block hover:bg-accent rounded-lg transition-colors duration-200 p-4"
    >
      <h3 className="text-lg font-medium mb-2">{info.title}</h3>
      <div className="flex items-center text-sm text-muted-foreground">
        <time dateTime={info.createdAt.toString()}>{date}</time>
        <span className="ml-4 flex items-center">
          <span>{info.views}</span>
        </span>
      </div>
    </Link>
  )
}

const ArticleList = ({ articleInfo }: { articleInfo: GroupedArticles }) => (
  <>
    {Object.entries(articleInfo)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, articles]) => (
        <div>
          <h2 className="text-3xl font-bold mb-6">{year}</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleInfo info={article} />
            ))}
          </div>
        </div>
      ))}
  </>
)

export default function ArticlesPage() {
  const [articles, setArticles] = useState<GroupedArticles>({})

  const groupArticlesByYear = (articles: Article[]): GroupedArticles => {
    return articles.reduce((acc: GroupedArticles, article: Article) => {
      const year = new Date(article.createdAt).getFullYear().toString()
      acc[year] = [...(acc[year] || []), article]
      return acc
    }, {})
  }

  const fetchArticles = useCallback(async () => {

    try {
      const res = await fetch(API_ENDPOINT)
      if (!res.ok) throw new Error('Network response was not ok')

      const data = await res.json()
      if (data.code !== 0) throw new Error(data.message || '获取全部文章失败!')

      setArticles(groupArticlesByYear(data.data ?? []))
    } catch (err) {
      console.error('Failed to fetch articles:', err)
    }
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  
  return (
    <div className="max-w-5xl mx-auto px-2">
        <ArticleList articleInfo={articles} />
    </div>
  )
}
