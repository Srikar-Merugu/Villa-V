"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { hr } from "../locales/hr";
import { en } from "../locales/en";

type Language = "hr" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hr");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("villa_language") as Language;
    if (savedLanguage === "hr" || savedLanguage === "en") {
      setLanguageState(savedLanguage);
    } else {
      setLanguageState("hr"); // Default is Croatian (HR)
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("villa_language", lang);
  }, []);

  // Central dictionary select
  const dictionary = useMemo(() => {
    return language === "hr" ? hr : en;
  }, [language]);

  // Nested key resolver helper (e.g., t("contact.form.submit"))
  const t = useCallback((key: string): any => {
    const parts = key.split(".");
    let current: any = dictionary;

    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        // Fallback to English dictionary lookup on key failure
        let fallback: any = en;
        for (const fPart of parts) {
          if (fallback && fallback[fPart] !== undefined) {
            fallback = fallback[fPart];
          } else {
            return key; // return key string if lookup fails entirely
          }
        }
        return fallback;
      }
    }
    return current;
  }, [dictionary]);

  // Handle live SEO Metadata adjustments client-side
  useEffect(() => {
    if (!isInitialized) return;

    // 1. Update HTML lang tag
    document.documentElement.lang = language;

    // 2. Update dynamic document title
    document.title = t("seo.title");

    // 3. Update metadata tags in head
    const updateMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      let meta = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attributeName, attributeValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", contentValue);
    };

    updateMetaTag("name", "description", t("seo.description"));
    updateMetaTag("property", "og:title", t("seo.ogTitle"));
    updateMetaTag("property", "og:description", t("seo.ogDescription"));
  }, [language, isInitialized, t]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t]);

  // Render children normally to prevent initial hydration blink while loading preference
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
