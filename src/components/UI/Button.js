import React from 'react'

const Button = ({ text, className, ...props }) => {
  return (
    <button
      {...props}
      className={`${"rounded-md w-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"} ${className}`}
    >
      {text}
    </button>
  )
}

export default Button