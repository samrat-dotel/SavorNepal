'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OauthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = urlParams.get('user');

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);

      // Redirect to homepage
      router.push('/');
    } else {
      console.error('Missing token or user in callback URL');
      router.push('/login');
    }
  }, [router]);

  return <p>Logging you in...</p>;
};

export default OauthCallback;
