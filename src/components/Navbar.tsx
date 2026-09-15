"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from 'next-themes';
import { Globe, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { lang, t, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-gray-900 dark:text-white font-bold text-xl tracking-tighter">
              Ste<span className="text-blue-600 dark:text-blue-500">fan</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-baseline space-x-8">
              <Link href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.about}</Link>
              <Link href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.skills}</Link>
              <Link href="#case-studies" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.caseStudies}</Link>
              <Link href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">{t.nav.contact}</Link>
            </div>
            
            <div className="flex items-center gap-3 border-l border-gray-300 dark:border-white/20 pl-6 ml-2">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300"
                aria-label="Toggle language"
              >
                <Globe size={18} />
                <span className="text-xs font-bold uppercase">{lang}</span>
              </button>
              
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
