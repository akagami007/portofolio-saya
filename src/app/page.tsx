import Hero3D from "@/components/Hero3D";
import ContactForm from "@/components/ContactForm";
import ProjectCarousel3D from "@/components/ProjectCarousel3D";
import SocialLinks3D from "@/components/SocialLinks3D";

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
            Hi, I'm <span className="text-blue-500">Stefan Cornelius</span>
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
      <section id="case-studies" className="w-full bg-black/50 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Project Gallery</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            A showcase of my recent work across Fullstack Development and Quality Assurance. 
            Swipe or drag to explore the projects in 3D space.
          </p>
          
          {/* 3D Carousel Display */}
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm">
            <ProjectCarousel3D />
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
      
      {/* Social Links 3D Section */}
      <section id="socials" className="w-full py-16 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Connect With Me</h2>
            <p className="text-gray-400">
              Find me on my social media or reach out directly.
            </p>
          </div>
          <SocialLinks3D />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Akagami. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Three.js, and Playwright.</p>
      </footer>
    </main>
  );
}
