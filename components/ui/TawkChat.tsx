'use client';
import { useEffect } from 'react';

const TawkChat = () => {
  useEffect(() => {
    // Avoid duplicate script injection
    if (document.getElementById('tawk-script')) return;

    const s1 = document.createElement('script');
    s1.id = 'tawk-script';
    s1.async = true;
    s1.src = 'https://embed.tawk.to/68b026245344dc1921047b37/1j3o1a04r';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    const s0 = document.getElementsByTagName('script')[0];
    s0.parentNode.insertBefore(s1, s0);

    return () => {
      // Cleanup script if component unmounts
      s1.remove();
    };
  }, []);

  return null; // No UI component, script only
};

export default TawkChat;
