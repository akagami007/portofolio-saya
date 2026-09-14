"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en, Dictionary } from "@/locales/en";
import { id } from "@/locales/id";

type Language = "en" | "id";

interface LanguageContextType {
  lang: Language;
  t: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang === "en" || savedLang === "id") {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "id" : "en";
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = lang === "en" ? en : id;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
