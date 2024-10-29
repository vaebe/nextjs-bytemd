'use client'

import { useEffect, useState } from 'react'
import '../../components/bytemd/editor.scss'
import '../../components/bytemd/dark-theme.scss'

export default function Component({ params }: { params: { id: string } }) {
  const [details, setDetails] = useState<string>('')

  useEffect(() => {
    async function fetchProxyDetails() {
      const res = await fetch(`/api/proxy/juejin/details?id=${params.id}`).then((res) => res.json())
      if (res.code !== 0) {
        return null
      }
      return res.data
    }

    async function getData() {
      const proxyDetails = await fetchProxyDetails()
        if (proxyDetails) {
          setDetails(proxyDetails)
        }
    }

    getData()
  }, [params.id])

  return (
    <div className="max-w-5xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: details }} />
    </div>
  )
}
