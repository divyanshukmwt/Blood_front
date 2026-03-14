Clerk Integration Quick Notes

1. Create a Clerk account at https://clerk.com and add a new application.
2. Copy the Publishable Key and Secret Key.

Frontend (.env):

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Backend (.env):

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_FRONTEND_API=your_clerk_frontend_api

Install frontend SDK:

cd Blood_hub_Frontend
npm install @clerk/clerk-react @clerk/clerk-sdk-browser

Usage:
- `src/main.jsx` already wraps the app with `ClerkProvider`.
- Create routes `/sign-in` and `/sign-up` and use Clerk `SignIn`/`SignUp` components or use Clerk hosted pages via redirect.

See https://clerk.com/docs for full integration steps.
