import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SceneCanvas } from './components/SceneCanvas'
import { BookingModal } from './components/BookingModal'
import {
  Sparkles,
  ShieldCheck,
  Activity,
  Award,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  Eye,
  Maximize2,
  Calendar,
  Layers,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [wireframe, setWireframe] = useState(false)
  const [theme, setTheme] = useState('cyan')
  const [modelMode, setModelMode] = useState('implant')
  const [bookingOpen, setBookingOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const containerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll('.story-card')
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="interactive-viewport" ref={containerRef}>
      {/* 3D WebGL Three.js Scene Background */}
      <SceneCanvas
        mode={modelMode}
        wireframe={wireframe}
        theme={theme}
        isMobile={isMobile}
      />

      {/* Global Glass Nav Header */}
      <header className="nav-header">
        <a href="#hero" className="brand-badge">
          <div className="brand-icon-box">
            <Sparkles size={22} color="#021226" />
          </div>
          <div>
            <div className="brand-title">ARMAMENTO</div>
            <div className="brand-sub">Dental Studio • APM Centrale</div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="nav-center-group">
          <nav className="nav-links">
            <a href="#hero" className="nav-pill">Overview</a>
            <a href="#implants" className="nav-pill">Implants & Surgery</a>
            <a href="#cosmetic" className="nav-pill">Smile Makeover</a>
            <a href="#technology" className="nav-pill">3D Precision</a>
            <a href="#location" className="nav-pill">Visit Studio</a>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setBookingOpen(true)}
            className="nav-cta-btn"
          >
            <Calendar size={16} /> Book Appointment
          </button>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Interactive 3D Model HUD Controls */}
      <div className="hud-controls">
        <div className="hud-hint">Interactive 3D Inspector • Drag to rotate</div>
        <div className="hud-pill-group">
          <button
            className={`hud-btn ${!wireframe ? 'active' : ''}`}
            onClick={() => setWireframe(false)}
          >
            <Eye size={14} /> Solid
          </button>
          <button
            className={`hud-btn ${wireframe ? 'active' : ''}`}
            onClick={() => setWireframe(true)}
          >
            <Layers size={14} /> CAD Wireframe
          </button>
          <button
            className={`hud-btn ${theme === 'cyan' ? 'active' : ''}`}
            onClick={() => setTheme(theme === 'cyan' ? 'gold' : 'cyan')}
          >
            <Sparkles size={14} /> {theme === 'cyan' ? 'Studio Mode' : 'Warm Mode'}
          </button>
        </div>
      </div>

      {/* Storytelling Scrolly Layers */}
      <main className="story-layer">
        
        {/* Section 1: Hero Studio Introduction */}
        <section className="story-section" id="hero">
          <div className="glass-panel story-card">
            <span className="story-tag">
              <Sparkles size={14} /> Architectural Dental Precision
            </span>
            <h1 className="story-heading">
              Sculpting Healthy, Confident Smiles in Cebu.
            </h1>
            <p className="story-desc">
              Led by <strong>Dr. Aldrine Armamento</strong>, Armamento Dental Studio blends bio-compatible engineering, surgical precision, and restorative artistry at <strong>APM Centrale, Mabolo, Cebu City</strong>.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-bullet"><ShieldCheck size={14} color="#00d2ff" /></div>
                <span>Specialized in Advanced Implantology & Oral Surgery</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Activity size={14} color="#00d2ff" /></div>
                <span>Guided CAD/CAM Precision & High-Strength Zirconia</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Clock size={14} color="#00d2ff" /></div>
                <span>Open Mon-Sat: 9:00 AM – 8:00 PM for Your Convenience</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setBookingOpen(true)}
                className="nav-cta-btn"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
              >
                Schedule Consultation <ChevronRight size={18} />
              </button>
              <a
                href="tel:09455997475"
                className="glass-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0.85rem 1.4rem',
                  fontSize: '0.9rem'
                }}
              >
                <Phone size={16} color="#00d2ff" /> Call (032) 256-0878
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Dental Implants & Surgery */}
        <section className="story-section" id="implants">
          <div className="glass-panel story-card">
            <span className="story-tag">
              <Award size={14} /> Restorative & Surgical Mastery
            </span>
            <h2 className="story-heading">
              Titanium Implants & Bone-Integrated Restorations.
            </h2>
            <p className="story-desc">
              Say goodbye to loose dentures or gaps. Our dental implant systems integrate seamlessly into the jawbone, preserving natural facial structure with permanent, lifetime strength.
            </p>

            <div className="services-grid">
              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Single & Multi Implants
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Engineered screw roots with custom-milled anatomical crowns.
                </p>
              </div>

              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Wisdom Tooth Surgery
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Minimally traumatic impaction removal under gentle local anesthesia.
                </p>
              </div>

              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Bone Grafting & Sinus Lift
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Regenerative foundation prep for solid, secure implant seating.
                </p>
              </div>

              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Fixed Hybrid Bridges
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Full-arch transformations that look and chew like natural teeth.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => setBookingOpen(true)}
                className="nav-cta-btn"
              >
                Inquire About Implants
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Cosmetic Dentistry & Smile Design */}
        <section className="story-section" id="cosmetic">
          <div className="glass-panel story-card">
            <span className="story-tag">
              <Sparkles size={14} /> Cosmetic & Aesthetic Craft
            </span>
            <h2 className="story-heading">
              Smile Design, Veneers & Laser Whitening.
            </h2>
            <p className="story-desc">
              A vibrant smile opens every door. We combine shade-matching spectrophotometry with ultra-thin porcelain veneers and professional in-office whitening to deliver natural, radiant beauty.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>In-Office Laser Teeth Whitening:</strong> Lift stubborn coffee, tea, and age stains safely in one session.</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>E-Max & Porcelain Veneers:</strong> Correct chipped, misaligned, or discolored teeth with micro-thin shells.</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>Composite Aesthetic Fillings:</strong> Seamless tooth-colored restorations that blend invisibly.</span>
              </div>
            </div>

            <button
              onClick={() => setBookingOpen(true)}
              className="nav-cta-btn"
            >
              Consult Smile Makeover
            </button>
          </div>
        </section>

        {/* Section 4: General Preventive Care & Cleanings */}
        <section className="story-section" id="technology">
          <div className="glass-panel story-card">
            <span className="story-tag">
              <Activity size={14} /> Preventative & Oral Wellness
            </span>
            <h2 className="story-heading">
              Gentle Care for the Entire Family.
            </h2>
            <p className="story-desc">
              Healthy foundations prevent complex problems. Experience gentle ultrasonic prophylaxis, thorough oral cancer screenings, and comprehensive dental health roadmaps.
            </p>

            <div className="services-grid" style={{ marginBottom: '1.5rem' }}>
              <div className="service-card-mini">
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Comprehensive Exam</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Intraoral photography & diagnostic assessments.</div>
              </div>
              <div className="service-card-mini">
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Ultrasonic Cleaning</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Pain-free plaque & tartar removal for fresh breath.</div>
              </div>
            </div>

            <button
              onClick={() => setBookingOpen(true)}
              className="nav-cta-btn"
            >
              Book General Cleaning
            </button>
          </div>
        </section>

        {/* Section 5: Location, Contact & Directions */}
        <section className="story-section" id="location">
          <div className="glass-panel story-card" style={{ maxWidth: '600px' }}>
            <span className="story-tag">
              <MapPin size={14} /> Prime Studio Location
            </span>
            <h2 className="story-heading">
              Visit Us at APM Centrale, Cebu City.
            </h2>
            <p className="story-desc">
              Conveniently situated right across SM City Cebu with ample secure parking and accessible transit links.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={20} color="#00d2ff" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>Address</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                    2nd Floor, APM Centrale, A. Soriano Ave, Mabolo, Cebu City, 6000 Philippines
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>(Directly opposite SM City Cebu)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Clock size={20} color="#00d2ff" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>Clinic Schedule</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>Monday to Saturday: 9:00 AM – 8:00 PM (Closed Sundays)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={20} color="#00d2ff" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>Direct Inquiries</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                    Mobile / WhatsApp: <a href="tel:09455997475" style={{ color: '#00d2ff', textDecoration: 'none' }}>+63 945 599 7475</a>
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                    Landline: <a href="tel:0322560878" style={{ color: '#00d2ff', textDecoration: 'none' }}>(032) 256-0878</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setBookingOpen(true)}
                className="nav-cta-btn"
                style={{ padding: '0.85rem 1.6rem' }}
              >
                Reserve Your Appointment Now
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=APM+Centrale+Mabolo+Cebu+City"
                target="_blank"
                rel="noreferrer"
                className="glass-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0.85rem 1.4rem',
                  fontSize: '0.9rem'
                }}
              >
                Open in Google Maps <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  )
}

