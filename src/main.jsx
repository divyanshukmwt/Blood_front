import './index.css'
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { UserProvider } from "./context/user.context.jsx";
import { DonarProvider } from './context/donate.context.jsx';
import {AdminProvider} from './context/admin.context.jsx';
import { AllUserProvider } from './context/AllUsers.context.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")).render(
          <AdminProvider>
              <AllUserProvider>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <UserProvider>
                  <DonarProvider>
                    <App />
                  </DonarProvider>
                </UserProvider>
              </GoogleOAuthProvider>
              </AllUserProvider>
          </AdminProvider>
);
