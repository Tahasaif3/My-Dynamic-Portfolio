"use client"

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer 
            className="bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-900 text-white py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <motion.div 
                        className="w-full md:w-auto mb-4 md:mb-0"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-bold">Taha Saif</h2>
                        <p className="text-sm text-gray-400">Frontend Developer</p>
                    </motion.div>
                    <motion.div 
                        className="w-full md:w-auto flex justify-center md:justify-end space-x-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {[
                            { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=100055915432701", color: "hover:text-blue-400" },
                            { icon: FaLinkedinIn, href: "https://linkedin.com/in/taha-saif-842269261/", color: "hover:text-blue-600" },
                            { icon: FaInstagram, href: "https://www.instagram.com/taha_saif44/?hl=en", color: "hover:text-pink-400" },
                            { icon: FaGithub, href: "https://github.com/Tahasaif3", color: "hover:text-gray-400" },
                            { icon: FaEnvelope, href: "mailto:tahasaif454@gmail.com", color: "hover:text-red-400" },
                        ].map((item, index) => (
                            <motion.a 
                                key={index}
                                href={item.href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`transition duration-300 ${item.color}`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <item.icon size={20} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
                <motion.div 
                    className="border-t border-gray-800 mt-4 pt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Taha Saif. All Rights Reserved.
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    )
}