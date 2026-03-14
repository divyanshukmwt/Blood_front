import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  // Placeholder: uses Clerk SignIn component when Clerk is configured
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] lg:w-[40%] bg-white p-6 rounded shadow">
        <h2 className="text-center text-2xl mb-4">Sign In</h2>
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
};

export default SignInPage;
