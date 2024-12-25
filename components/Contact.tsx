'use client'

import { motion } from "framer-motion";
import { ContactData, FormData } from "@/types/contact";
import { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Phone, Loader2, CheckCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Contact({ data }: { data?: ContactData }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socialIcons: { [key: string]: React.ComponentType<any> } = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(formData);
    setIsSubmitting(false);
    setShowThankYou(true);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <section id="contact" className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-indigo-200 text-xl max-w-2xl mx-auto">
              Let`s connect and bring your ideas to life!
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-0 overflow-hidden shadow-xl shadow-purple-500/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-indigo-200 mb-2">
                        Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border-indigo-300 bg-white/5 text-white placeholder-indigo-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border-indigo-300 bg-white/5 text-white placeholder-indigo-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-indigo-200 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full border-indigo-300 bg-white/5 text-white placeholder-indigo-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300"
                      placeholder="Your message here..."
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-pink-500 to-indigo-500 text-white transition-all duration-300 ease-out hover:shadow-lg hover:shadow-pink-500/50"
                    >
                      <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                      <span className="relative flex items-center justify-center text-lg font-semibold py-3">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <a href="mailto:your.email@example.com" className="flex items-center text-indigo-200 hover:text-pink-300 transition-colors">
              <Mail className="w-6 h-6 mr-2" />
              tahasaif454@gmail.com
            </a>
            <a href="tel:+1234567890" className="flex items-center text-indigo-200 hover:text-pink-300 transition-colors">
              <Phone className="w-6 h-6 mr-2" />
              +92 3163836744
            </a>
          </motion.div>

          {data?.socialLinks && data.socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex justify-center space-x-6"
            >
              {data.socialLinks.map((link, index) => {
                const Icon = socialIcons[link.icon] || (() => null);
                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-200 hover:text-pink-300 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-8 h-8" />
                    <span className="sr-only">{link.name}</span>
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 border-indigo-500/20 backdrop-blur-xl">
          <DialogHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="mx-auto rounded-full bg-green-500/20 p-3 mb-4"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            <DialogTitle className="text-2xl text-center text-white mb-2">
              Thank You for Reaching Out!
            </DialogTitle>
            <DialogDescription className="text-center text-indigo-200">
              I have received your message and will get back to you as soon as possible. Have a great day!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setShowThankYou(false)}
              className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}