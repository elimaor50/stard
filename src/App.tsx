import { useEffect, useState, useRef } from 'react'
import './App.css'

interface ServiceModal {
  id: string
  title: string
  headline: string
  image: string
  intro: string
  sections: { heading: string; content: string; items?: string[] }[]
}

const serviceModals: ServiceModal[] = [
  {
    id: 'powertrain',
    title: 'EV Powertrain Development',
    headline: 'High-Performance Electric Propulsion Systems',
    image: import.meta.env.BASE_URL + '502600528_1288053829474907_1085984098804425308_n.jpg',
    intro: 'STARD specializes in bespoke radial-flux and axial-flux motor integration. We develop multi-motor architectures -- Dual, Triple, and Quad-motor setups -- capable of delivering up to 1,500kW+ of peak power.',
    sections: [
      {
        heading: 'Key Achievement',
        content: 'Developed the powertrain for the Ford SuperVan 4.2, optimized for the extreme thin-air conditions and torque demands of the Pikes Peak International Hill Climb.',
      },
      {
        heading: 'Engineering Focus',
        content: 'Our powertrain division concentrates on three critical pillars:',
        items: [
          'Power density -- maximizing output per kilogram of motor mass',
          'Thermal management efficiency -- sustaining peak power through advanced liquid cooling circuits',
          'Weight reduction -- through advanced composite motor housing and lightweight integration',
        ],
      },
    ],
  },
  {
    id: 'battery',
    title: 'Advanced Battery Systems',
    headline: 'FIA-Certified Energy Storage Solutions',
    image: import.meta.env.BASE_URL + '2022_FORD_E-TRANSIT_SUPERVAN_23.webp',
    intro: 'Our proprietary STARD REVO Battery Systems feature immersion cooling technology, allowing for continuous high-discharge rates without thermal throttling -- even under the most extreme racing conditions.',
    sections: [
      {
        heading: 'Technical Specifications',
        content: 'The REVO platform is built around the following core technologies:',
        items: [
          'Chemistry -- High-performance Li-ion cells optimized for power-to-weight ratio',
          'Charging -- Ultra-fast 0-80% in under 20 minutes, designed for Rallycross turnaround',
          'Safety -- Fully FIA 8865-2015 compliant crash-proof casing with integrated fire suppression',
        ],
      },
      {
        heading: 'Applications',
        content: 'REVO systems are deployed across the FIA World Rallycross Championship (World RX), specialized OEM prototypes, and high-performance demonstration vehicles including the Ford SuperVan program.',
      },
    ],
  },
  {
    id: 'vcu',
    title: 'Vehicle Control Systems (VCU)',
    headline: 'The Intelligent Brain of the EV',
    image: import.meta.env.BASE_URL + '483994457_1220762459537378_4467373113225619581_n.jpg',
    intro: 'We develop in-house control software that manages the complex interaction between multiple motors, battery management, and driver inputs -- all in real-time with sub-millisecond response.',
    sections: [
      {
        heading: 'Core Capabilities',
        content: 'Our VCU platform delivers:',
        items: [
          'Torque Vectoring -- millisecond-level distribution of torque to each individual wheel for superior cornering grip and stability',
          'Regenerative Braking Optimization -- maximizing energy recovery while maintaining natural brake feel and vehicle stability',
          'Custom Drive Modes -- seamless switching between "Eco-Transport", "Track Attack", and "Drift" modes',
        ],
      },
      {
        heading: 'Telemetry & Reliability',
        content: 'Every VCU integrates real-time data logging and telemetry systems, enabling track-side engineering teams to monitor, tune, and optimize vehicle performance live during competition sessions.',
      },
    ],
  },
  {
    id: 'vehicle',
    title: 'Complete Vehicle Engineering',
    headline: 'From Concept to FIA Homologation',
    image: import.meta.env.BASE_URL + '109965277_3000882840037309_3005027767678789798_n.jpg',
    intro: 'STARD provides a full "Turnkey" solution. We take a production vehicle -- like the Ford Mustang Mach-E or F-150 -- and re-engineer it from the ground up for international competition.',
    sections: [
      {
        heading: 'Services Included',
        content: 'Our complete vehicle engineering pipeline covers:',
        items: [
          'Full CAD/CAE Design and Simulation -- from initial concept through structural analysis',
          'Composite Bodywork -- lightweight carbon fiber panels and aerodynamic optimization',
          'Suspension Geometry Redesign -- purpose-built for high-torque EV applications',
          'FIA Homologation Processing -- formal certification for international racing series',
        ],
      },
      {
        heading: 'Track-Ready Delivery',
        content: 'Every build is delivered race-ready with full documentation, driver briefing, and optional trackside engineering support for the entire competition season.',
      },
    ],
  },
]

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('home')
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Update indicator position when active section changes
    const activeLink = navRefs.current[activeSection]
    if (activeLink && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeLink
      indicatorRef.current.style.left = `${offsetLeft}px`
      indicatorRef.current.style.width = `${offsetWidth}px`
    }
  }, [activeSection])

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a') as HTMLAnchorElement | null
      if (!anchor) return
      
      const href = anchor.getAttribute('href')
      // Only prevent default for internal hash links
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const id = href.slice(1)
        const section = document.getElementById(id)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact']
      const root = document.getElementById('root')
      if (!root) return
      
      const scrollPosition = root.scrollTop + 150

      // Find which section we're in
      let currentSection = 'home'
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop - 200) {
            currentSection = section
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    const root = document.getElementById('root')
    if (root) {
      root.addEventListener('scroll', handleScroll)
      handleScroll() // Call once on mount
      return () => root.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden'
      const root = document.getElementById('root')
      if (root) root.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      const root = document.getElementById('root')
      if (root) root.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      const root = document.getElementById('root')
      if (root) root.style.overflow = ''
    }
  }, [activeModal])

  const openModal = (id: string) => {
    setActiveModal(id)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const currentModal = serviceModals.find((m) => m.id === activeModal)

  return (
    <div className="app">
      <header className="header">
        <a href="#about" className="logo-link">
          <img src={`${import.meta.env.BASE_URL}stard-logo.png`} alt="STARD Logo" className="logo-img" />
        </a>
        <nav className="nav">
          <div className="nav-indicator" ref={indicatorRef}></div>
          <a href="#home" ref={el => { navRefs.current['home'] = el }} className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" ref={el => { navRefs.current['about'] = el }} className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#services" ref={el => { navRefs.current['services'] = el }} className={activeSection === 'services' ? 'active' : ''}>Services</a>
          <a href="#contact" ref={el => { navRefs.current['contact'] = el }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </nav>
      </header>
      <main>
        <section id="home" className="hero">
          <h1>The Future of High-Performance Electrification</h1>
          <p>Pioneering EV technology for Global Motorsport and Automotive Manufacturers.</p>
          <div className="hero-showcase">
              <a href="#services" className="showcase-card showcase-card-logo" style={{backgroundImage: `url(${import.meta.env.BASE_URL}119-1191347_ford-racing-logo-png-transparent-ford-performance-racing-logo.png)`}}>
                <div className="showcase-img-container">
                  <img src={`${import.meta.env.BASE_URL}119-1191347_ford-racing-logo-png-transparent-ford-performance-racing-logo.png`} alt="Ford Performance" className="showcase-img" />
                </div>
                <div className="showcase-info">
                  <span className="showcase-tag">Partnership</span>
                  <h3 className="showcase-title">Official Ford Performance</h3>
                  <p className="showcase-subtitle">Technical Partner</p>
                </div>
              </a>
              <a href="#services" className="showcase-card" style={{backgroundImage: `url(${import.meta.env.BASE_URL}STARD-Ford-Fiesta-ERX2-1.webp)`}}>
                <div className="showcase-img-container">
                  <img src={`${import.meta.env.BASE_URL}STARD-Ford-Fiesta-ERX2-1.webp`} alt="Electric Rallycross" className="showcase-img" />
                </div>
                <div className="showcase-info">
                  <span className="showcase-tag">Achievement</span>
                  <h3 className="showcase-title">World's First</h3>
                  <p className="showcase-subtitle">All-Electric Rallycross Car</p>
                </div>
              </a>
          </div>
          <a href="#about" className="cta">Learn More About Us</a>
        </section>

        <section id="about" className="about">
          <h2>Story of STARD</h2>
          <hr className="section-line" />
          <p>STARD -- Stohl Advanced Research and Development -- is part of the Stohl Group, founded by WRC legend Manfred Stohl. Based in Gross-Enzersdorf near Vienna, Austria, STARD bridges decades of traditional World Rally Championship experience with the new era of electric mobility.</p>
          <p>We don't just build cars -- we develop in-house battery systems (STARD REVO), proprietary VCU software, and complete high-voltage powertrains that comply with the strictest FIA safety standards. As official technical partners of Ford Performance, we engineered the Ford SuperVan 4.2, the F-150 Switchgear, and the legendary Mach-E 1400.</p>
          <p className="about-mission">"To push the boundaries of electric propulsion in the most extreme racing environments on Earth."</p>
          <a href="#services" className="cta">View Our Services</a>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <hr className="section-line" />
          <div className="service-list">
            <div className="service">
              <div className="service-img-wrapper">
                <img src={`${import.meta.env.BASE_URL}502600528_1288053829474907_1085984098804425308_n.jpg`} alt="EV Powertrain Development" className="service-img" />
                <button className="cta" onClick={() => openModal('powertrain')}>Learn More</button>
              </div>
              <div className="service-content">
                <h3>EV Powertrain Development</h3>
                <p>Custom high-performance electric motors and advanced inverter integration, engineered for the extreme demands of professional motorsport and OEM applications.</p>
              </div>
            </div>
            <div className="service">
              <div className="service-img-wrapper">
                <img src={`${import.meta.env.BASE_URL}2022_FORD_E-TRANSIT_SUPERVAN_23.webp`} alt="Advanced Battery Systems" className="service-img" />
                <button className="cta" onClick={() => openModal('battery')}>Learn More</button>
              </div>
              <div className="service-content">
                <h3>Advanced Battery Systems</h3>
                <p>FIA-certified, high-discharge STARD REVO battery packs with sub-20 minute charging capabilities -- designed for safety, power density, and endurance.</p>
              </div>
            </div>
            <div className="service">
              <div className="service-img-wrapper">
                <img src={`${import.meta.env.BASE_URL}483994457_1220762459537378_4467373113225619581_n.jpg`} alt="Vehicle Control Systems" className="service-img" />
                <button className="cta" onClick={() => openModal('vcu')}>Learn More</button>
              </div>
              <div className="service-content">
                <h3>Vehicle Control Systems</h3>
                <p>Proprietary VCU software for advanced Torque Vectoring, traction control, and intelligent energy management -- the brain behind every STARD powertrain.</p>
              </div>
            </div>
            <div className="service">
              <div className="service-img-wrapper">
                <img src={`${import.meta.env.BASE_URL}109965277_3000882840037309_3005027767678789798_n.jpg`} alt="Complete Vehicle Engineering" className="service-img" />
                <button className="cta" onClick={() => openModal('vehicle')}>Learn More</button>
              </div>
              <div className="service-content">
                <h3>Complete Vehicle Engineering</h3>
                <p>Full-cycle development from concept and CAD design through prototyping, FIA homologation, track testing, and race-day technical support.</p>
              </div>
            </div>
          </div>
          <a href="#contact" className="cta" style={{marginTop: '6px'}}>Get In Touch</a>
        </section>

        <section id="contact" className="contact">
          <h2>Partner With Us</h2>
          <hr className="section-line" />
          <p>Partner with us for your next high-performance EV project. Whether you're an automotive OEM, professional race team, or specialized tech innovator -- let's build the future together.</p>
          <p className="contact-address">Stohl Strasse 1, 2301 Gross-Enzersdorf, Austria</p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="contact-detail-icon">Tel</span>
              <span>+43 2249 28050</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon">Fax</span>
              <span>+43 2249 28903</span>
            </div>
          </div>
          <div className="contact-social">
            <a href="https://facebook.com/stard.austria" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/stard.austria/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="mailto:office@stard.at" className="social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Company / Organization" />
            <textarea placeholder="Tell us about your project"></textarea>
            <button type="submit">Get In Touch</button>
          </form>
        </section>
      </main>

      {/* Service Detail Modal */}
      {currentModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>X</button>
            <div className="modal-hero">
              <img src={currentModal.image} alt={currentModal.title} className="modal-hero-img" />
              <div className="modal-hero-overlay">
                <h2 className="modal-title">{currentModal.title}</h2>
                <p className="modal-headline">{currentModal.headline}</p>
              </div>
            </div>
            <div className="modal-body">
              <p className="modal-intro">{currentModal.intro}</p>
              {currentModal.sections.map((section, i) => (
                <div key={i} className="modal-section">
                  <h3 className="modal-section-heading">
                    <span className="modal-accent-line"></span>
                    {section.heading}
                  </h3>
                  <p className="modal-section-text">{section.content}</p>
                  {section.items && (
                    <ul className="modal-spec-list">
                      {section.items.map((item, j) => (
                        <li key={j} className="modal-spec-item">
                          <span className="modal-spec-dot"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="modal-actions">
                <a href="#contact" className="cta" onClick={closeModal}>Start a Project</a>
                <button className="modal-back-btn" onClick={closeModal}>Back to Services</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2026 STARD -- Stohl Advanced Research and Development. All rights reserved.</p>
        <p className="footer-address">Stohl Strasse 1, 2301 Gross-Enzersdorf, Austria</p>
      </footer>
    </div>
  )
}

export default App
