"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, Variants } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="experience" className="w-full max-w-6xl mx-auto py-24 px-4 border-t border-gray-200 dark:border-white/10 transition-colors">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4 text-gray-900 dark:text-white transition-colors"
        >
          {t.experience.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-gray-600 dark:text-gray-400 transition-colors"
        >
          {t.experience.description}
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative border-l-2 border-blue-500/30 dark:border-blue-500/20 ml-4 md:ml-8 max-w-4xl mx-auto"
      >
        {t.experience.items.map((item) => (
          <motion.div 
            key={item.id} 
            variants={itemVariants}
            className="mb-12 ml-8 relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[43px] bg-white dark:bg-[#050505] p-1.5 rounded-full border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10 transition-colors">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            {/* Experience Card */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-[0_4px_30px_rgba(59,130,246,0.1)] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    {item.company}
                  </p>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full w-fit transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  {item.period}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
