'use client'
import Link from 'next/link'


export default function Home() {

  
  return (
    <div className='space-x-4 space-y-4 p-10'>
      <Link className='p-4 rounded border' href="/md/add">BytemdEditor</Link>
      <Link className='p-4 rounded border' href="/md/view">BytemdView</Link>
    </div>
  );
}
