'use client'

import './editor.scss' // 编辑器样式
import plugins from './plugins' // 引入统一导出的插件
import { Editor } from '@bytemd/react'
import zh_Hans from 'bytemd/locales/zh_Hans.json' // 中文语言包

interface UploadImage {
  url: string,
  alt: string,
  title: string
}

// 上传图片
async function uploadImages(files: File[]) {
  const resultData:UploadImage[] = []

  for (const item of files) {
    const formData = new FormData()
    formData.append('file', item)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()

    if (data?.code === 0) {
      // 上传成功后安装指定格式返回
      // 'https://picsum.photos/200/300'
      resultData.push({
        url: data?.data,
        alt: item.name,
        title: item.name
      })
    }
  }
  return resultData
}

interface BytemdEditorProps {
  content: string
  setContent: (content: string) => void
}

export function BytemdEditor({ content, setContent }: BytemdEditorProps) {
  return (
    <Editor
      value={content}
      locale={zh_Hans}
      plugins={plugins}
      onChange={(v) => {
        setContent(v)
      }}
      uploadImages={uploadImages}
    />
  )
}
