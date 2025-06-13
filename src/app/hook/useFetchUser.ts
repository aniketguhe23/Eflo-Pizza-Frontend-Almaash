// hooks/useFetchUser.ts
'use client';

import { useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import ProjectApiList from '../api/ProjectApiList';
import { useRouter } from 'next/navigation';

export const useFetchUser = () => {

    const { api_getUserProfileData } = ProjectApiList();
    const router = useRouter(); 

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
                if (data.user) {
                    useUserStore.getState().setUser(data.user); // ✅ Set user in Zustand
                    router.refresh()
                }
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };

        fetchUser();
    }, []);
};
