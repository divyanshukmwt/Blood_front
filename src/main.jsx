import './index.css'
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from "./context/user.context.jsx";
import { DonarProvider } from './context/donate.context.jsx';
import {AdminProvider} from './context/admin.context.jsx';
import { AllUserProvider } from './context/AllUsers.context.jsx';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <AllUserProvider>
          <UserProvider>
            <DonarProvider>
              <App />
            </DonarProvider>
          </UserProvider>
      </AllUserProvider>
    </AdminProvider>
  </StrictMode>
);
