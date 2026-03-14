import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] lg:w-[40%] bg-white p-6 rounded shadow">
        <h2 className="text-center text-2xl mb-4">Sign Up</h2>
        <SignUp path="/sign-up" routing="path" />
      </div>
    </div>
  );
};

export default SignUpPage;
