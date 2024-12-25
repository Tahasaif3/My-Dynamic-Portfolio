'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaNpm } from 'react-icons/fa'

interface HomeData {
  name: string;
  profession: string;
  intro: string;
  image: string;
}

export default function Home({ data }: { data: HomeData }) {
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i <= data.profession.length; i++) {
        setTypedText(data.profession.slice(0, i))
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    typeText()
  }, [data.profession])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-20 sm:py-32">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="mb-12 text-center lg:mb-0 lg:w-1/2 lg:text-left">
            <motion.div 
              className="mb-6 inline-block overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h1 
                className="bg-gradient-to-r from-blue-200 via-pink-200 to-purple-200 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Hi, I`m <br />
                <motion.span 
                  className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  {data.name}
                </motion.span>
              </motion.h1>
            </motion.div>
            <motion.h2 
              className="mb-6 text-2xl font-semibold text-pink-200 sm:text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              {typedText}
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
            >
              <Button size="lg" className="group relative overflow-hidden bg-white px-8 py-4 text-indigo-900 transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg hover:shadow-white/20">
                <span className="relative z-10">Explore My Work</span>
                <ArrowRight className="relative z-10 ml-2 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 z-0 scale-x-0 bg-gradient-to-r from-pink-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100"></div>
              </Button>
              <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-4 flex justify-start ml-7 space-x-4"
          >
            <a href="https://github.com/Tahasaif3" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
              <FaGithub size={36} />
            </a>
            <a href="https://linkedin.com/in/taha-saif-842269261/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
              <FaLinkedin size={36} />
            </a>
            <a href="https://www.npmjs.com/~t6ra2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
              <FaNpm size={36} />
            </a>
          </motion.div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:w-1/2"
          >
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-30 blur-3xl"></div>
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px 10px rgba(236, 72, 153, 0.3)", 
                    "0 0 20px 10px rgba(167, 139, 250, 0.3)", 
                    "0 0 20px 10px rgba(99, 102, 241, 0.3)",
                    "0 0 20px 10px rgba(236, 72, 153, 0.3)"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
              ></motion.div>
              <Image
                src={data.image}
                alt={data.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-white/50 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="0.2" d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>
    </section>
  )
}