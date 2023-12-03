import React from 'react'
import PostForm from './PostForm'

const Posts = ({user}) => {
  return (
    <div><PostForm user={user} /></div>
  )
}

export default Posts