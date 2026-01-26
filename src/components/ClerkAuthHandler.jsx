import React, { useEffect, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';
import Axios from '../config/Axois';
import { UserContext } from '../context/user.context';

const ClerkAuthHandler = () => {
  const { user } = useUser();
  const { setUser } = useContext(UserContext);


  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;
      console.log('[ClerkAuthHandler] detected clerk user:', user?.id, user?.primaryEmailAddress);
      // Only skip sync if we've already synced AND we have an app token
      const already = sessionStorage.getItem('clerk_synced');
      const hasAppToken = !!localStorage.getItem('token');
      if (already && hasAppToken) {
        console.log('[ClerkAuthHandler] already synced this session and token exists');
        return;
      }
      try {
        const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || user.email;
        const name = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim();
        if (!email) return;
        // proceed to sync with backend
        const res = await Axios.post('/users/clerk-sync', {
          clerkId: user.id,
          email,
          name,
        });
        console.log('[ClerkAuthHandler] clerk-sync response', res?.status, res?.data);
        if (res?.data?.token) {
          localStorage.setItem('token', res.data.token);
        }
        if (res?.data?.user) setUser(res.data.user);
        sessionStorage.setItem('clerk_synced', Date.now().toString());

        // If not on admin routes, navigate to app home after successful sync
        const path = window.location.pathname || '';
        if (!path.startsWith('/admin')) {
          window.location.href = '/';
        }
      } catch {
        // ignore
      }
    };
    syncUser();
  }, [user, setUser]);

  return null;
};

export default ClerkAuthHandler;
