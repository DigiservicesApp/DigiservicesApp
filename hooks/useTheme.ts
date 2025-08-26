'use client';
import { useEffect } from 'react';

export default function useTheme() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      const root = document.documentElement;
      const preferDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const applyDark = (d: boolean) => {
        if (d) {
          root.setAttribute('data-theme', 'dark');
          root.classList.add('dark');
        } else {
          root.removeAttribute('data-theme');
          root.classList.remove('dark');
        }
      };

      if (saved === 'dark') {
        applyDark(true);
      } else if (saved === 'light') {
        applyDark(false);
      } else if (preferDark) {
        applyDark(true);
      } else {
        applyDark(false);
      }
    } catch (e) {
      // ignore
    }
  }, []);
}
