import React from 'react'

const Input = ({
  label,
  id,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...rest}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  outline-0 px-1 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  )
}

export default Input