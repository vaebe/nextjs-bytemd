'use client'
import Link from 'next/link'


export default function Home() {

  
  return (
    <div className='space-x-4 space-y-4 p-10'>
      <Link className='p-4 rounded border' href="/md/add">md 编辑器新增</Link>
      <Link className='p-4 rounded border' href="/md/view">md 编辑器查看</Link>
      <Link className='p-4 rounded border' href="/article/list">文章列表</Link>
    </div>
  );
}
