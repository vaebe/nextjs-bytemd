'use client'

import { useEffect, useState } from 'react';
import { BytemdViewer } from '../components/bytemd/viewer'
import {ThemeSwitch} from '../components/theme-switch'

export default function Home() {
  const [content, setContent] = useState('')
  
  useEffect(() => {
    fetch('/api/md').then((res) => res.json()).then(res => {
      console.log(res)
      setContent(res.content)
    })
  }, [])

  return (
    <div className='dark:bg-black'>
      <ThemeSwitch></ThemeSwitch>

      <div className='max-w-5xl mx-auto'>
        <BytemdViewer content={content} ></BytemdViewer>
      </div>
    </div>
  );
}
