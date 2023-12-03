import React, { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const AuthForm = ({ setIsUserCreated }) => {

  const [authData, setAuthData] = useState({
    email: '',
    name: "",
  })
  const router = useRouter()
  const onChangeHandler = ({ target }) => {
    setAuthData({
      ...authData,
      [target.name]: target.value
    })
  }

  const userCreateHandler = async () => {
    if (!authData.email.trim() || !authData.name.trim()) {
      alert('Please enter details first')
      return
    }
    try {
      const { data } = await axios.post("/api/create-user", { authData })
      localStorage.setItem("user", JSON.stringify(data.newUser))
      toast.success('Account created sucessfully')
      router.push("/posts")
    } catch (error) {
      const serverError = error.response.data.error
      if (serverError.code === 'P2002' && serverError.meta?.target?.includes('_email')) {
        toast.error("Email already Exist")
      }
    }
  }
  return (
    <div className='flex items-center justify-center py-20'>

      <div className='w-full md:w-4/12 bg-white p-2 rounded-md'>
        <h1 className='text-black  text-2xl mb-3 font-medium'>Enter your Detail</h1>
        <div className='space-y-6 mt-10'>

          <Input
            type="email"
            onChange={onChangeHandler}
            value={authData.email}
            label='Email'
            name="email"
            id='email'
            placeholder="you@example.com"
          />
          <Input type="text"
            id='name'
            onChange={onChangeHandler}
            value={authData.name}
            label='username'
            name="name"
            placeholder="xyz"
          />
          <Button onClick={userCreateHandler} text={'Submit'} />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AuthForm