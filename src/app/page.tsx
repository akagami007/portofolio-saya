import Hero3D from "@/components/Hero3D";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      {/* Hero Section */}
      <section id="hero" className="w-full relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        
        <div className="z-10 flex flex-col items-center justify-center h-full text-center px-4 mt-20 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
            Hi, I'm <span className="text-blue-500">Akagami</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl drop-shadow-md">
            Fullstack Developer & Quality Assurance Engineer
          </p>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            I build robust, scalable applications and ensure they run flawlessly through rigorous automated testing.
          </p>
          
          <div className="mt-8 flex gap-4 pointer-events-auto">
            <a href="#case-studies" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition-colors border border-white/10">
              Hire Me
            </a>
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="w-full max-w-6xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              With a unique dual-focus on both Fullstack Development and Quality Assurance, 
              I don't just write code—I engineer resilient systems. My approach combines 
              the creative problem-solving of frontend/backend development with the 
              meticulous, edge-case-hunting mindset of a QA engineer.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Whether working with freelance clients to bring their vision to life, or 
              collaborating in a team to build enterprise software, I prioritize 
              maintainability, performance, and bulletproof reliability.
            </p>
          </div>
          <div id="skills" className="bg-white/5 border border-white/10 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Core Competencies</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-200">Frontend (React, Next.js, 3D)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-200">Backend (Node.js, SQL, APIs)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-200">QA & E2E Testing (Playwright, Cypress)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="w-full bg-black/50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-colors">
              <div className="h-48 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-gray-500 font-mono">&lt;Architecture Diagram /&gt;</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Scalable E-Commerce Backend</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Designed and implemented a microservices architecture handling 10k+ concurrent users. 
                Utilized Next.js for the storefront and Node.js/PostgreSQL for the backend.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">Next.js</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">PostgreSQL</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">Redis</span>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-colors">
              <div className="h-48 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-gray-500 font-mono">&lt;Test Coverage Report /&gt;</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Automated QA Pipeline</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Built a comprehensive End-to-End testing suite using Playwright for a SaaS platform. 
                Reduced manual testing time by 90% and caught critical regression bugs before production.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">Playwright</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">CI/CD</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">TypeScript</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-3xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-400">
            Have a freelance project in mind or looking to hire a Fullstack/QA engineer? 
            Drop me a message below.
          </p>
        </div>
        
        <ContactForm />
      </section>
      
      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Akagami. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Three.js, and Playwright.</p>
      </footer>
    </main>
  );
}
