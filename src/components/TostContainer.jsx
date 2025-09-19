import React from 'react'
import { ToastContainer } from 'react-toastify' 
const TostContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}

export default TostContainer