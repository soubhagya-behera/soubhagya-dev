import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { ProjectDetails } from './pages/ProjectDetails'
import { NotFound } from './pages/NotFound'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, reduced])

  return null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
