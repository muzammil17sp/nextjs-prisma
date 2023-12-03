'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../components/page-partial/Header'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/outline'


const MyPosts = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})

  const router = useRouter()

  const getMyPosts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      const { data: { data } } = await axios.post('/api/get-user-posts', { userId: user.id })
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/delete-post?postId=${id}`)
      setPosts(posts.filter((post) => post.id !== id))
      toast.success('Post Deleted Successfully')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      getMyPosts()
      setUser(user)
    } else {
      router.push("/auth")
    }
  }, [])

  return (
    <div>

      <Header fetchPosts={getMyPosts}/>
      <h1 className='my-2 text-xl'>My Posts</h1>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-6 lg:gap-x-8">
        {posts.map((post) => (
          <div className='border border-gray-400 rounded-md p-3'>
            <div><img src={post.image} /></div>
            <div>
              <h1 className='text-2xl font-semibold'>{post.title}</h1>
              <p className='text-sm text-gray-500 mt-4'>{post.body}</p>
            </div>
            {post.authorId === user.id && <div className='flex justify-end'>
              <TrashIcon className='text-red-500 h-5 w-5' onClick={() => deletePost(post.id)} />
            </div>}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default MyPosts