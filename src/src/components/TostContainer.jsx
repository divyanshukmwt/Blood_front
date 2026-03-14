import React from 'react';
import { ToastContainer } from 'react-toastify';

const TostContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastStyle={{
        fontFamily: "Poppins, sans-serif",
        fontSize: "14px",
        borderRadius: "12px",
      }}
    />
  );
};

export default TostContainer;
