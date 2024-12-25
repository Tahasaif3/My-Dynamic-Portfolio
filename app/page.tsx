'use client'

import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { database, auth } from './providers'
import Header from '@/components/Header'
import Home from '@/components/Home'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Services from '@/components/Services'
import AdminPanel from '@/components/AdminPanel'
import Login from '@/components/Login'
import Loading from '@/components/Loading'

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [showLogin, setShowLogin] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user)
      setShowLogin(false)
    })

    const unsubscribeData = onValue(ref(database, '/'), (snapshot) => {
      const fetchedData = snapshot.val()
      if (fetchedData) {
        setData(fetchedData)
      }
      setLoading(false)
    })

    return () => {
      unsubscribeAuth()
      unsubscribeData()
    }
  }, [])

  const handleAdminClick = () => {
    setShowLogin(true)
  }

  const handleLogout = () => {
    auth.signOut()
    setIsAdmin(false)
  }

  if (loading) {
    return <Loading />
  }

  if (showLogin) {
    return <Login onLoginSuccess={() => setIsAdmin(true)} />
  }

  if (isAdmin) {
    return <AdminPanel data={data} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header onAdminClick={handleAdminClick} />
      <Home data={data.home} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Projects data={data.projects} />
      <Education data={data.education} />
      <Experience data={data.experience} />
      <Services data={data.services}/>
      <Contact data={data.contact} />
      <Footer />
    </div>
  )
}

