'use client'

import { useState } from 'react';
import { BytemdEditor } from './components/bytemd/editor'

export default function Home() {

  const [content, setContent] = useState('')
  
  return (
    <BytemdEditor content={content} setContent={setContent}></BytemdEditor>
  );
}
