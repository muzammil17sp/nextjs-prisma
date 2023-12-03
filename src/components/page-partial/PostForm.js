import React, { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { ToastContainer, toast } from 'react-toastify'
import Header from './Header'
import axios from 'axios'

const PostForm = ({ setOpen, fetchPosts }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: "",
    img: ""
  })

  const postCreateHandler = async () => {
    const { title, body } = formData
    const user = JSON.parse(localStorage.getItem("user"))
    if (!title.trim() || !body.trim()) {
      toast.error('Please enter all fields')
      return
    }
    try {
      const createdPosts = await axios.post("/api/create-post", {
        title,
        body,
        authorId: user.id
      })
      toast.success('Post created successfully')
      setFormData({
        title: '',
        body: "",
        img: ""
      })
      setOpen(false)
      fetchPosts()
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }

  return (
    <>
      <div className='  '>

        <div className=''>
          <h1 className='text-black  text-2xl mb-3 font-medium'>Create Your Posts</h1>
          <div className='space-y-6 mt-10'>

            <Input
              type="text"
              onChange={onChangeHandler}
              value={formData.title}
              label='Title'
              name="title"
              id='title'
              placeholder="Beautiful Scenery"
            />
            <Input
              type="text"
              id='body'
              onChange={onChangeHandler}
              value={formData.body}
              label='Body'
              name="body"
              placeholder="Beautiful location"
            />
            <div className='flex items-center justify-between gap-10'>

              <Button onClick={() => setOpen(false)} text={'Close'} className='!bg-white !text-black border' />
              <Button onClick={postCreateHandler} text={'Submit'} />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>

  )
}

export default PostForm