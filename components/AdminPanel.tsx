'use client'

import { useState, useEffect } from 'react'
import { database } from '../app/providers'
import { ref, set, get } from 'firebase/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Plus } from 'lucide-react'
import * as SiIcons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  home: {
    name: string;
    profession: string;
    intro: string;
    image: string;
  };
  about: {
    fullText: string;
    subtitle: string;
    image: string;
    description1: string;
    description2: string;
    skills: Array<{ text: string; color: string }>;
  };
  skills: Array<{
    name: string;
    icon: string;
    color: string;
    bgColor: string;
  }>;
  projects: Array<{
    name: string;
    path: string;
    image: string;
    description: string;
  }>;
  education: Array<{
    title: string;
    institution: string;
    period: string;
  }>;
  experience: Array<{
    position: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }>;
  services: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
}

interface AdminPanelProps {
  onLogout: () => void;
}

const iconOptions = [
  ...Object.keys(SiIcons).filter(key => key.startsWith('Si')),
  ...Object.keys(FaIcons).filter(key => key.startsWith('Fa')),
  ...Object.keys(AiIcons).filter(key => key.startsWith('Ai')),
];

const defaultData: FormData = {
  home: { name: '', profession: '', intro: '', image: '' },
  about: { 
    fullText: '', 
    subtitle: '', 
    image: '', 
    description1: '', 
    description2: '', 
    skills: []
  },
  skills: [],
  projects: [],
  education: [],
  experience: [],
  services: []
};

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [formData, setFormData] = useState<FormData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(database, '/'));
        if (snapshot.exists()) {
          setFormData(snapshot.val());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: keyof FormData, index: number | null = null) => {
    const { name, value } = e.target
    setFormData(prev => {
      if (index !== null && Array.isArray(prev[section])) {
        const sectionArray = [...prev[section]];
        sectionArray[index] = { ...sectionArray[index], [name]: value };
        return { ...prev, [section]: sectionArray };
      } else if (typeof prev[section] === 'object' && prev[section] !== null) {
        return { 
          ...prev, 
          [section]: { 
            ...prev[section], 
            [name]: value 
          } 
        };
      }
      return prev;
    });
  }

  const handleArrayChange = (section: keyof FormData, index: number, key: string, value: string | string[]) => {
    setFormData(prev => {
      if (Array.isArray(prev[section])) {
        const sectionArray = [...prev[section]];
        sectionArray[index] = { ...sectionArray[index], [key]: value };
        return { ...prev, [section]: sectionArray };
      }
      return prev;
    });
  }

  
  const handleAddItem = (section: keyof FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newItem: any;
    switch (section) {
      case 'skills':
        newItem = { name: '', icon: '', color: '', bgColor: '' };
        break;
      case 'projects':
        newItem = { name: '', path: '', image: '', description: '' };
        break;
      case 'education':
        newItem = { title: '', institution: '', period: '' };
        break;
      case 'experience':
        newItem = { position: '', company: '', duration: '', responsibilities: [''] };
        break;
      case 'services':
        newItem = { title: '', icon: 'code', description: '' };
        break;
      default:
        return;
    }
    setFormData(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section]) ? [...prev[section], newItem] : [newItem]
    }));
  }

  const handleDeleteItem = (section: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section]) 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? prev[section].filter((_: any, i: number) => i !== index)
        : prev[section]
    }));
  }

  const handleAddResponsibility = (index: number) => {
    setFormData(prev => {
      const updatedExperience = [...prev.experience];
      if (updatedExperience[index]) {
        updatedExperience[index] = {
          ...updatedExperience[index],
          responsibilities: [...updatedExperience[index].responsibilities, '']
        };
      }
      return { ...prev, experience: updatedExperience };
    });
  }

  const handleDeleteResponsibility = (expIndex: number, respIndex: number) => {
    setFormData(prev => {
      const updatedExperience = [...prev.experience];
      if (updatedExperience[expIndex]) {
        updatedExperience[expIndex] = {
          ...updatedExperience[expIndex],
          responsibilities: updatedExperience[expIndex].responsibilities.filter((_, i) => i !== respIndex)
        };
      }
      return { ...prev, experience: updatedExperience };
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await set(ref(database, '/'), formData)
      toast({
        title: "Data updated successfully!",
        description: "Your changes have been saved.",
      })
    } catch (error) {
      console.error('Error updating data:', error)
      toast({
        title: "Error",
        description: "Failed to update data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderForm = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
    }

    const commonInputClasses = "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500";

    switch (activeSection) {
      case 'home':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={formData.home?.name || ''}
              onChange={(e) => handleChange(e, 'home')}
              placeholder="Name"
              className={commonInputClasses}
            />
            <Input
              name="profession"
              value={formData.home?.profession || ''}
              onChange={(e) => handleChange(e, 'home')}
              placeholder="Profession"
              className={commonInputClasses}
            />
            <Textarea
              name="intro"
              value={formData.home?.intro || ''}
              onChange={(e) => handleChange(e, 'home')}
              placeholder="Intro"
              className={commonInputClasses}
            />
            <Input
              name="image"
              value={formData.home?.image || ''}
              onChange={(e) => handleChange(e, 'home')}
              placeholder="Image URL"
              className={commonInputClasses}
            />
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )
      case 'about':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="fullText"
              value={formData.about?.fullText || ''}
              onChange={(e) => handleChange(e, 'about')}
              placeholder="Full Text (for typing animation)"
              className={commonInputClasses}
            />
            <Input
              name="subtitle"
              value={formData.about?.subtitle || ''}
              onChange={(e) => handleChange(e, 'about')}
              placeholder="Subtitle"
              className={commonInputClasses}
            />
            <Input
              name="image"
              value={formData.about?.image || ''}
              onChange={(e) => handleChange(e, 'about')}
              placeholder="Image URL"
              className={commonInputClasses}
            />
            <Textarea
              name="description1"
              value={formData.about?.description1 || ''}
              onChange={(e) => handleChange(e, 'about')}
              placeholder="First paragraph of description"
              className={commonInputClasses}
            />
            <Textarea
              name="description2"
              value={formData.about?.description2 || ''}
              onChange={(e) => handleChange(e, 'about')}
              placeholder="Second paragraph of description"
              className={commonInputClasses}
            />
            {(formData.about?.skills || []).map((skill: {text: string, color: string}, index: number) => (
              <div key={index} className="space-y-2">
                <Input
                  value={skill.text || ''}
                  onChange={(e) => handleArrayChange('about', index, 'text', e.target.value)}
                  placeholder={`Skill ${index + 1} text`}
                  className={commonInputClasses}
                />
                <Input
                  value={skill.color || ''}
                  onChange={(e) => handleArrayChange('about', index, 'color', e.target.value)}
                  placeholder={`Skill ${index + 1} color`}
                  className={commonInputClasses}
                />
              </div>
            ))}
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )
      case 'skills':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {(formData.skills || []).map((skill: {name: string, icon: string, color: string, bgColor: string}, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 p-4 border border-gray-600 rounded-md relative bg-gray-700"
                >
                  <Input
                    value={skill.name || ''}
                    onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                    placeholder="Skill name"
                    className={commonInputClasses}
                  />
                  <select
                    value={skill.icon || ''}
                    onChange={(e) => handleArrayChange('skills', index, 'icon', e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <Input
                    value={skill.color || ''}
                    onChange={(e) => handleArrayChange('skills', index, 'color', e.target.value)}
                    placeholder="Text color (e.g., text-yellow-400)"
                    className={commonInputClasses}
                  />
                  <Input
                    value={skill.bgColor || ''}
                    onChange={(e) => handleArrayChange('skills', index, 'bgColor', e.target.value)}
                    placeholder="Background color (e.g., bg-yellow-400/10)"
                    className={commonInputClasses}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeleteItem('skills', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button type="button" onClick={() => handleAddItem('skills')} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )
      case 'projects':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {(formData.projects || []).map((project: {name: string, path: string, image: string, description: string}, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 p-4 border border-gray-600 rounded-md relative bg-gray-700"
                >
                  <Input
                    value={project.name || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                    placeholder="Project name"
                    className={commonInputClasses}
                  />
                  <Input
                    value={project.path || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'path', e.target.value)}
                    placeholder="Project URL"
                    className={commonInputClasses}
                  />
                  <Input
                    value={project.image || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'image', e.target.value)}
                    placeholder="Project image URL"
                    className={commonInputClasses}
                  />
                  <Textarea
                    value={project.description || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                    placeholder="Project description"
                    className={commonInputClasses}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeleteItem('projects', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button type="button" onClick={() => handleAddItem('projects')} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )
      case 'education':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {(formData.education || []).map((edu: {title: string, institution: string, period: string}, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 p-4 border border-gray-600 rounded-md relative bg-gray-700"
                >
                  <Input
                    value={edu.title || ''}
                    onChange={(e) => handleArrayChange('education', index, 'title', e.target.value)}
                    placeholder="Degree/Course Title"
                    className={commonInputClasses}
                  />
                  <Input
                    value={edu.institution || ''}
                    onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                    placeholder="Institution"
                    className={commonInputClasses}
                  />
                  <Input
                    value={edu.period || ''}
                    onChange={(e) => handleArrayChange('education', index, 'period', e.target.value)}
                    placeholder="Period (e.g., 2020 - 2024)"
                    className={commonInputClasses}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeleteItem('education', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button type="button" onClick={() => handleAddItem('education')} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )
      case 'experience':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {(formData.experience || []).map((exp: {position: string, company: string, duration: string, responsibilities: string[]}, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 p-4 border border-gray-600 rounded-md relative bg-gray-700"
                >
                  <Input
                    value={exp.position || ''}
                    onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                    placeholder="Position"
                    className={commonInputClasses}
                  />
                  <Input
                    value={exp.company || ''}
                    onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                    placeholder="Company"
                    className={commonInputClasses}
                  />
                  <Input
                    value={exp.duration || ''}
                    onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
                    placeholder="Duration"
                    className={commonInputClasses}
                  />
                  {(exp.responsibilities || []).map((resp: string, respIndex: number) => (
                    <div key={respIndex} className="flex items-center space-x-2">
                      <Input
                        value={resp || ''}
                        onChange={(e) => {
                          const newResponsibilities = [...(exp.responsibilities || [])];
                          newResponsibilities[respIndex] = e.target.value;
                          handleArrayChange('experience', index, 'responsibilities', newResponsibilities);
                        }}
                        placeholder={`Responsibility ${respIndex + 1}`}
                        className={commonInputClasses}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteResponsibility(index, respIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddResponsibility(index)}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Responsibility
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeleteItem('experience', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button type="button" onClick={() => handleAddItem('experience')} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )
      case 'services':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {(formData.services || []).map((service: {title: string, icon: string, description: string}, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 p-4 border border-gray-600 rounded-md relative bg-gray-700"
                >
                  <Input
                    value={service.title || ''}
                    onChange={(e) => handleArrayChange('services', index, 'title', e.target.value)}
                    placeholder="Service Title"
                    className={commonInputClasses}
                  />
                  <Input
                    value={service.icon || ''}
                    onChange={(e) => handleArrayChange('services', index, 'icon', e.target.value)}
                    placeholder="Icon (code, layout, or database)"
                    className={commonInputClasses}
                  />
                  <Textarea
                    value={service.description || ''}
                    onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)}
                    placeholder="Service Description"
                    className={commonInputClasses}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeleteItem('services', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button type="button" onClick={() => handleAddItem('services')} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white">Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <nav>
                <ul className="space-y-2">
                  {Object.keys(formData).map((section) => (
                    <li key={section}>
                      <Button
                        variant={activeSection === section ? "secondary" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => setActiveSection(section)}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button onClick={onLogout} className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
                Logout
              </Button>
            </div>
            <div className="w-full md:w-3/4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white">
                    {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderForm()}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
