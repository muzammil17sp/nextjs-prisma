'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"))
    if (localStorageUser) {
      router.push("/posts")
    } else {
      router.push("/auth")
    }
    setLoaded(true)

  }, [])
  if (!loaded) return <></>
  return (
    <div className='bg-white min-h-screen'>

    </div>
  )
}
