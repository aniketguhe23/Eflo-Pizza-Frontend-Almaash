"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthSuccess() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token as string);
      router.push('/dashboard');
    }
  }, [token]);

  return <p>Redirecting...</p>;
}
