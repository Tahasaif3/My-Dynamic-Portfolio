'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'

interface EducationItem {
  title: string;
  institution: string;
  period: string;
  description: string;
  location?: string;
}

export default function Education({ data }: { data: EducationItem[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200
      }
    }
  }

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
          className="text-6xl font-bold mb-16 text-center"
        >
          {Array.from("Education").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-teal-400"></div>
          
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative mb-12 ${index % 2 === 0 ? 'lg:ml-auto lg:pr-8 lg:pl-0' : 'lg:mr-auto lg:pl-8 lg:pr-0'} lg:w-1/2`}
            >
              <Card className="bg-white/10 border-gray-700 backdrop-blur-md hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent shadow-lg drop-shadow-md mb-4">
                    {item.title}
                       </h3>
                      <p className="text-lg text-blue-300 font-medium">{item.institution}</p>
                      <div className="flex items-center text-gradient mt-2 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gradient" />
                        <span>{item.period}</span>
                        {item.location && (
                          <>
                            <MapPin className="w-4 h-4 ml-4 mr-2" />
                            <span>{item.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
              <div className={`absolute top-8 ${index % 2 === 0 ? 'left-0 lg:-left-4' : 'right-0 lg:-right-4'} w-8 h-8 bg-blue-500 rounded-full border-4 border-indigo-900 z-10`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}