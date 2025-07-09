'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '../store/useUserStore';
import ProjectApiList from '../api/ProjectApiList';

export const useFetchUser = () => {
  const { api_getUserProfileData } = ProjectApiList();
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const logout = useUserStore((state) => state.logout); // ✅ logout from Zustand

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(api_getUserProfileData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.error === 'Invalid or expired token') {
          setIsSessionExpired(true);
          logout(); // ✅ clear localStorage and Zustand user
          return;
        }

        if (data.user) {
          useUserStore.getState().setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, [api_getUserProfileData, logout]);

  return { isSessionExpired };
};
