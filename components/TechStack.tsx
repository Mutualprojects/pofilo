"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const techStack = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Strapi", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACiUlEQVR4AaVXQW4TQRAcPgEPytgMZ5DyBiIsRcrBEkASHgBIAG8APmAJXuIDfoIlH/fianrTE2V2S5XNKiNVFI/X3dXVPTvd6XadnNizFwtbOzaOrWPv6BxHBxw2C9lQ4rfdja1s27CN9XJpT1O7lie28C8PbAjGhu/+L+3nGSgLHHqf4dzZ9M7JaYYVaQSaHDmrz2d67vC8V6K4JNqAMjgfpQfbX6fIi8ojRztfeibeKLLpCWy1AuCcE1hqHQxhm2q1G0MrMlULRTll7J0AunkEWA1ylGvOBbGGdJfinEtHioQAJqLHmMyxJwCSUeDi3Ozj5TSur8xOXykCaAkgjZkp9qszs93OYsFGizacyFQ6A4kdM4E37vzHtyBAbhFodxEEIiVC3TIgkHUKVuG8EoCphbECV8PAmAgpoJ0HQAqQV5kCnd7Em+S8UUA4JV4gAgpNCjA4KqcvGZ8/mf36CYfd4Lfj7x+tQKGXFeiSSxx9KEL7GfbhLaviRGKBCcjXd1N3aXBb8XFsjQSBr+H4e0Ngugb0MU8Tb6oWUoE2eEgFIGuA2BXxPnj/DioFtK4vRzbJOaegbuqrefU6VGjxxQvz385sN8LF+f3Hr5ACAuqajajgp4PTsjpr6+q+KxpWLyPFFpP14QRqQUaBhvMHA3fXcRYkJFAJgCLngpM9xTH5n24cVZmRElegcQ4ro8tmIp0dtWR0/qld5xSw7EIB+h77FBPLdPTauO6MStZNSYnjvuW2/JG9vzrC4vlNr8B62BNgftR5HvFGmfXtUHqgbkg6Ekc0T80NYjR7UofT4huFo9DR5kd10XU4jdUOqTGeZ9s69g4az4vsIek2hStTx3Psq82+3gbj+X9LeqPtxkiTtwAAAABJRU5ErkJggg==" },
  { name: "Directus", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAANlBMVEVHcExmRP9mRP9mRP9mRP9mRP9lRP9kQf94Xf9WK/9fOf+nl//////n4/+7r//Mw/+RfP/18/8G/nl/AAAAB3RSTlMABZ7w/50F5+TACAAAAMtJREFUeAF80EcCwjAMRFFDBCON5Xb/y4IVOkn+9rkqpdN5kY2Wy/Vusts1nffxkpZ9XJIc9I0AdhGiYkZsIbPfK1UM34jA6lETfiKVIuhjyuTOT/RqRjNV0GeZb8S8rNVuZtkjvJHd11rzWNf5QrD5R82IjzttfGJc+ERYnNqe2NT4ROhYD5PqXjyqRCDY4gkmIGu8aAwvXBE+5DlR0rTr/FDmRBZXykdzHSV2Mo9O+esxBBpuwxvZ5EjiT2CseJIm/kTNwMaKMzsAAFPPExb1zgVJAAAAAElFTkSuQmCC" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
]

const allTech = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Strapi", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACiUlEQVR4AaVXQW4TQRAcPgEPytgMZ5DyBiIsRcrBEkASHgBIAG8APmAJXuIDfoIlH/fianrTE2V2S5XNKiNVFI/X3dXVPTvd6XadnNizFwtbOzaOrWPv6BxHBxw2C9lQ4rfdja1s27CN9XJpT1O7lie28C8PbAjGhu/+L+3nGSgLHHqf4dzZ9M7JaYYVaQSaHDmrz2d67vC8V6K4JNqAMjgfpQfbX6fIi8ojRztfeibeKLLpCWy1AuCcE1hqHQxhm2q1G0MrMlULRTll7J0AunkEWA1ylGvOBbGGdJfinEtHioQAJqLHmMyxJwCSUeDi3Ozj5TSur8xOXykCaAkgjZkp9qszs93OYsFGizacyFQ6A4kdM4E37vzHtyBAbhFodxEEIiVC3TIgkHUKVuG8EoCphbECV8PAmAgpoJ0HQAqQV5kCnd7Em+S8UUA4JV4gAgpNCjA4KqcvGZ8/mf36CYfd4Lfj7x+tQKGXFeiSSxx9KEL7GfbhLaviRGKBCcjXd1N3aXBb8XFsjQSBr+H4e0Ngugb0MU8Tb6oWUoE2eEgFIGuA2BXxPnj/DioFtK4vRzbJOaegbuqrefU6VGjxxQvz385sN8LF+f3Hr5ACAuqajajgp4PTsjpr6+q+KxpWLyPFFpP14QRqQUaBhvMHA3fXcRYkJFAJgCLngpM9xTH5n24cVZmRElegcQ4ro8tmIp0dtWR0/qld5xSw7EIB+h77FBPLdPTauO6MStZNSYnjvuW2/JG9vzrC4vlNr8B62BNgftR5HvFGmfXtUHqgbkg6Ekc0T80NYjR7UofT4huFo9DR5kd10XU4jdUOqTGeZ9s69g4az4vsIek2hStTx3Psq82+3gbj+X9LeqPtxkiTtwAAAABJRU5ErkJggg==" },
  { name: "Directus", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAANlBMVEVHcExmRP9mRP9mRP9mRP9mRP9lRP9kQf94Xf9WK/9fOf+nl//////n4/+7r//Mw/+RfP/18/8G/nl/AAAAB3RSTlMABZ7w/50F5+TACAAAAMtJREFUeAF80EcCwjAMRFFDBCON5Xb/y4IVOkn+9rkqpdN5kY2Wy/Vusts1nffxkpZ9XJIc9I0AdhGiYkZsIbPfK1UM34jA6lETfiKVIuhjyuTOT/RqRjNV0GeZb8S8rNVuZtkjvJHd11rzWNf5QrD5R82IjzttfGJc+ERYnNqe2NT4ROhYD5PqXjyqRCDY4gkmIGu8aAwvXBE+5DlR0rTr/FDmRBZXykdzHSV2Mo9O+esxBBpuwxvZ5EjiT2CseJIm/kTNwMaKMzsAAFPPExb1zgVJAAAAAElFTkSuQmCC" },
  { name: "Keycloak", icon: "https://www.keycloak.org/resources/images/logo.svg" },
  { name: "Payload", icon: "https://payloadcms.com/images/favicon.svg" },
  { name: "Supabase", icon: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" },
  { name: "Pinecone", icon: "https://www.pinecone.io/images/pinecone-logo.svg" },
  { name: "OpenAI", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAABEElEQVR4AbTJIWyDQACG0d+rWsxENQ6Jwi0YFLIWRTKFxecc6pIzJzF4QTKDT23lSby5BPUt6ZJe2i1ze/aJP/x/+ly5/z2PU7ne1rIYm4/tR9YDsNeaFqP3l9wFx6AJgPLylLN6rrpEcBaiQko6dR/YDq4659po55SL8D1ujI0MLGpbl/K84nr8SWbSCBj5lNrvWewQCy1wU0gZsDV+ABi603nHtI9sJ0KW9d/paCxBjwy6wawyQiwdg2VPiZeBY5S10j3XjJRNoxWMqn20DB4tKeeWTUWhDfqJsX9rSRl0gLUQe20McpCSSwWAUxdBgaek0rQ6lQEwFS/JZ1cNebWFrVaElInLlNmv0TNpYgIAMy6KDbFgKo8AAAAASUVORK5CYII=" },
  { name: "SEO Opt.", icon: "https://www.vectorlogo.zone/logos/google_search_console/google_search_console-icon.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
]

function TechCard({ tech, index, scrollYProgress, isExtended = false }: { tech: any, index: number, scrollYProgress: any, isExtended?: boolean }) {
  const [imgError, setImgError] = useState(false)
  const angle = (index * Math.PI * 2) / techStack.length

  const x = useTransform(scrollYProgress, [0.1, 0.4], [0, 320 * Math.cos(angle)])
  const y = useTransform(scrollYProgress, [0.1, 0.4], [0, 320 * Math.sin(angle)])
  const opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1])
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.5, 1])

  if (isExtended) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.05 }}
        className="group relative"
      >
        <div className="bg-[#f5f1e8]/50 dark:bg-zinc-900/40 border-4 border-[#f5f1e8] dark:border-zinc-800 p-8 rounded-[2.5rem] flex flex-col items-center gap-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group-hover:-translate-y-2 backdrop-blur-sm">
          <div className="w-12 h-12 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-orange-500/5 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
            {!imgError ? (
              <img 
                src={tech.icon} 
                alt={tech.name} 
                onError={() => setImgError(true)}
                className="w-full h-full object-contain transition-all duration-500 relative z-10" 
              />
            ) : (
              <div className="text-[10px] font-black text-orange-500 text-center leading-tight">
                {tech.name}
              </div>
            )}
          </div>
          <span className="text-[10px] font-black text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-orange-400 uppercase tracking-[0.2em] transition-colors">{tech.name}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="absolute z-30"
      style={{ x, y, opacity, scale }}
    >
      <div className="relative group">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-[#f5f1e8] dark:bg-zinc-900 border-4 border-[#f5f1e8] dark:border-zinc-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-2xl overflow-hidden flex items-center justify-center p-4 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 backdrop-blur-sm">
          {!imgError ? (
            <img
              src={tech.icon}
              alt={tech.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-xs md:text-sm font-black text-orange-500 text-center uppercase tracking-tighter">
              {tech.name}
            </div>
          )}
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="bg-zinc-900 dark:bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
            {tech.name}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])
  const scale = useTransform(scrollYProgress, [0.1, 0.35], [0.85, 1])
  const rotation = useTransform(scrollYProgress, [0.1, 0.5], [0, 15])

  return (
    <div ref={containerRef} id="skills" className="min-h-[180vh] bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500 relative overflow-hidden">

      <div className="h-screen flex items-center justify-center p-4 sticky top-0">
        <div className="relative w-full max-w-4xl flex items-center justify-center scale-75 md:scale-100">

          <div className="absolute w-[600px] h-[600px] rounded-full border-2 border-zinc-900/5 dark:border-zinc-800 flex items-center justify-center transition-all duration-500" />
          <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-orange-50/50 dark:border-orange-900/20 flex items-center justify-center transition-all duration-500" />

          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#c2410c] via-orange-500 to-amber-500 dark:from-orange-600 dark:via-yellow-600 dark:to-red-600 p-0.5 flex items-center justify-center relative shadow-2xl shadow-orange-500/10">
            <div className="w-full h-full rounded-full bg-[#f5f1e8] dark:bg-[#0c0c0c] flex items-center justify-center relative overflow-hidden">
              <motion.div
                style={{ opacity, scale }}
                className="flex flex-col items-center justify-center relative z-20 max-w-xs p-8"
              >
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-[#f5f1e8] text-center leading-[1.1] tracking-tighter mb-4">
                  Empowering <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2410c] to-orange-500 dark:from-orange-500 dark:to-yellow-500">Every User</span>
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-center text-sm md:text-base font-medium leading-relaxed">
                  From robust backends to intelligent AI, I build modern tools that simplify work and drive impact.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div style={{ rotate: rotation }} className="absolute inset-0 flex items-center justify-center">
            {techStack.map((tech, index) => (
              <TechCard key={tech.name} tech={tech} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-48 pt-20 relative z-40">
        <div className="flex flex-col items-center mb-16">
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#c2410c] to-orange-500 rounded-full mb-8" />
          <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.4em] text-center">Extended Toolkit</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {allTech.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} scrollYProgress={scrollYProgress} isExtended />
          ))}
        </div>
      </div>
    </div>
  )
}
