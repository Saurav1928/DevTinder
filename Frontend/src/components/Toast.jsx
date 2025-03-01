import React from 'react'

const Toast = ({ message }) => {
  const msg = message || "Profile Updated successfully."
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>{msg}</span>
      </div>
    </div>
  )
}

export default Toast
