"use client";

import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

// Lazy-load heavy 3D components to avoid blocking the initial HTML payload (improves Web Vitals LCP/FCP)
const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });
const ProjectCarousel3D = dynamic(() => import("@/components/ProjectCarousel3D"), { ssr: false });
const SocialLinks3D = dynamic(() => import("@/components/SocialLinks3D"), { ssr: false });

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      {/* Hero Section */}
      <section id="hero" className="w-full relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        
        <div className="z-10 flex flex-col items-center justify-center h-full text-center px-4 mt-20 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg text-gray-900 dark:text-white transition-colors">
            {t.hero.greeting} <span className="text-blue-600 dark:text-blue-500">{t.hero.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl drop-shadow-md transition-colors">
            {t.hero.role}
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto transition-colors">
            {t.hero.description}
          </p>
          
          <div className="mt-8 flex gap-4 pointer-events-auto">
            <a href="#case-studies" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md">
              {t.hero.viewWork}
            </a>
            <a href="#contact" className="px-6 py-3 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-gray-900 dark:text-white font-medium rounded-lg backdrop-blur-sm transition-colors border border-gray-300 dark:border-white/10 shadow-sm">
              {t.hero.hireMe}
            </a>
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="w-full max-w-6xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">{t.about.title}</h2>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4 transition-colors">
              {t.about.p1}
            </p>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed transition-colors">
              {t.about.p2}
            </p>
          </div>
          <div id="skills" className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 rounded-2xl shadow-sm dark:shadow-none transition-colors">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">{t.about.coreCompetencies}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{t.about.frontend}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{t.about.backend}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{t.about.qa}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="w-full bg-gray-100 dark:bg-black/50 py-24 overflow-hidden transition-colors border-y border-gray-200 dark:border-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white transition-colors">{t.projects.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12 transition-colors">
            {t.projects.description}
          </p>
          
          {/* 3D Carousel Display */}
          <div className="w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-black/30 shadow-md dark:shadow-none backdrop-blur-sm transition-colors">
            <ProjectCarousel3D />
          </div>

        </div>
      </section>

      {/* Social Links 3D Section */}
      <section id="socials" className="w-full py-16 bg-gray-50 dark:bg-black/40 border-t border-gray-200 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">{t.socials.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              {t.socials.description}
            </p>
          </div>
          <SocialLinks3D />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-3xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">{t.contact.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">
            {t.contact.description}
          </p>
        </div>
        
        <ContactForm />
      </section>
      
      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-white/10 py-8 text-center text-gray-500 text-sm bg-white dark:bg-transparent transition-colors">
        <p>&copy; {new Date().getFullYear()} Stefan Cornelius. {t.footer.rights}</p>
        <p className="mt-2">{t.footer.builtWith}</p>
      </footer>
    </main>
  );
}
