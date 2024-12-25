'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import * as SiIcons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'

type IconType = React.ComponentType<{ className?: string }>;

interface Skill {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

const iconLibraries = {
  ...SiIcons,
  ...FaIcons,
  ...AiIcons,
}

export default function Skills({ data }: { data: Skill[] }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  if (!data || data.length === 0) {
    return <div>No skills data available.</div>;
  }

  const getIcon = (iconName: string): IconType => {
    const IconComponent = iconLibraries[iconName as keyof typeof iconLibraries];
    return IconComponent || SiIcons.SiJavascript; // Fallback to JavaScript icon if not found
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="flex overflow-hidden">
            <motion.div
              className="flex space-x-8"
              animate={{ x: [0, -1920] }}
              transition={{ 
                x: { repeat: Infinity, duration: 60, ease: "linear" },
              }}
            >
              {[...data, ...data].map((skill, index) => {
                const Icon = getIcon(skill.icon);
                const colorClass = skill.color ? skill.color.split(' ')[0] : '';
                return (
                  <Card 
                    key={index} 
                    className={`flex-shrink-0 w-64 h-64 bg-gradient-to-r from-indigo-500 via-purple-800 to-pink-200  border-red-700 backdrop-blur-sm hover:border-blue-500 transition-all duration-300 hover:shadow-lg ${colorClass ? `hover:shadow-${colorClass}-800/20` : ''}`}
                  >
                    <CardContent className="flex flex-col items-center justify-center h-full p-6 relative overflow-hidden group">
                      <motion.div
                        className={`absolute inset-0 ${skill.bgColor || ''} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                      <motion.div
                        className="relative z-10 flex flex-col items-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Icon className={`text-8xl mb-4 ${skill.color || ''} transition-all duration-300 group-hover:drop-shadow-lg`} />
                        <p className="text-xl font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center">{skill.name}</p>
                      </motion.div>
                      <motion.div
                        className="absolute bottom-2 left-2 right-2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </CardContent>
                  </Card>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  )
}



