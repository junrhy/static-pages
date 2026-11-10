import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SceneCanvas } from './components/SceneCanvas'
import { VideoBackground } from './components/VideoBackground'
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
  Calendar,
  Layers,
  ArrowUpRight,
  Menu,
  X,
  Heart,
  Users
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
      cards.forEach((card) => {
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
      {/* 1. Cinematic Background Video Scrubbed by Scroll */}
      <VideoBackground
        videoSrc="./videos/armamento-dental-studio-video.mp4"
        poster="./videos/armamento-dental-studio-poster.jpg"
      />

      {/* 2. Interactive 3D Three.js Overlay Canvas */}
      <SceneCanvas
        mode={modelMode}
        wireframe={wireframe}
        theme={theme}
        isMobile={isMobile}
      />

      {/* 3. Global Glass Nav Header */}
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
            <a href="#team" className="nav-pill">Dr. Aldrine & Team</a>
            <a href="#implants" className="nav-pill">Implants & Surgery</a>
            <a href="#cosmetic" className="nav-pill">Smile Makeover</a>
            <a href="#gallery" className="nav-pill">Inside The Studio</a>
            <a href="#location" className="nav-pill">Visit Us</a>
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

      {/* Scrollytelling Story Layers */}
      <main className="story-layer">
        
        {/* Section 1: Hero Studio Introduction */}
        <section className="story-section" id="hero">
          <div className="glass-panel story-card">
            <span className="story-tag">
              <Sparkles size={14} /> Modern Precision Dentistry
            </span>
            <h1 className="story-heading">
              Sculpting Healthy, Confident Smiles in Cebu.
            </h1>
            <p className="story-desc">
              Step into a warm, gentle, and technologically advanced dental experience located at <strong>APM Centrale, Mabolo, Cebu City</strong> (directly opposite SM City Cebu).
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-bullet"><ShieldCheck size={14} color="#00d2ff" /></div>
                <span>Guided Dental Implants & Comprehensive Oral Surgery</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Activity size={14} color="#00d2ff" /></div>
                <span>Aesthetic Porcelain Veneers & In-Office Laser Whitening</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Clock size={14} color="#00d2ff" /></div>
                <span>Convenient Schedule: Mon–Sat, 9:00 AM – 8:00 PM</span>
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

        {/* Section 2: Meet Dr. Aldrine Armamento */}
        <section className="story-section" id="team">
          <div className="glass-panel story-card">
            <span className="story-tag">
              <Users size={14} /> Clinical Leadership
            </span>
            <h2 className="story-heading">
              Meet Dr. Aldrine Armamento & Team.
            </h2>
            
            {/* Real Doctor Portrait & Info */}
            <div className="doctor-profile-card">
              <img
                src="./images/dr-aldrine.jpg"
                alt="Dr. Aldrine Armamento"
                className="doctor-avatar"
              />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                  Dr. Aldrine Armamento
                </h3>
                <div style={{ color: '#00d2ff', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Founder & Principal Dental Surgeon
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  Dedicated to pain-free, meticulous dental procedures with a warm and empathetic touch.
                </p>
              </div>
            </div>

            <p className="story-desc">
              Every smile is crafted with personalized attention. We believe in educating our patients, demystifying treatments, and creating an inviting sanctuary away from the anxiety of conventional clinics.
            </p>

            <button
              onClick={() => setBookingOpen(true)}
              className="nav-cta-btn"
            >
              Meet the Doctor <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Section 3: Dental Implants & Surgery */}
        <section className="story-section" id="implants">
          <div className="glass-panel story-card">
            <span className="story-tag">
              <Award size={14} /> Surgical Excellence
            </span>
            <h2 className="story-heading">
              Titanium Implants & Bone-Integrated Restorations.
            </h2>
            <p className="story-desc">
              Restore your smile's original chewing strength and aesthetics. Our dental implants fuse with the bone for permanent stability and natural function.
            </p>

            <div className="services-grid">
              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Single & Multi Implants
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Titanium root fixtures with custom porcelain anatomy.
                </p>
              </div>

              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Wisdom Tooth Removal
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Gentle, minimally invasive surgical impactions.
                </p>
              </div>

              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Bone Grafting & Augmentation
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Strong bio-compatible foundation for lifetime support.
                </p>
              </div>

              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Full-Arch Restorations
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Fixed bridges giving you the confidence to bite freely.
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

        {/* Section 4: Cosmetic Dentistry & Smile Design */}
        <section className="story-section" id="cosmetic">
          <div className="glass-panel story-card">
            <span className="story-tag">
              <Sparkles size={14} /> Aesthetic Smile Artistry
            </span>
            <h2 className="story-heading">
              Porcelain Veneers & Laser Teeth Whitening.
            </h2>
            <p className="story-desc">
              Your dream smile is a consultation away. Whether correcting tooth shape, closing diastemas, or brightening enamel, we provide tailored aesthetic transformations.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>In-Office Laser Teeth Whitening:</strong> Immediate shade enhancement in a safe, monitored setting.</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>E-Max Porcelain Veneers:</strong> Natural translucency designed for long-lasting brilliance.</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>Composite Dental Bonding:</strong> Fast, direct restoration for chips and minor irregularities.</span>
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

        {/* Section 5: Studio Gallery & Team Moments */}
        <section className="story-section" id="gallery">
          <div className="glass-panel story-card" style={{ maxWidth: '620px' }}>
            <span className="story-tag">
              <Heart size={14} /> Inside the Studio
            </span>
            <h2 className="story-heading">
              A Warm, Caring Atmosphere.
            </h2>
            <p className="story-desc">
              See the genuine smiles and clinical passion of our team at our grand opening and daily care routines in APM Centrale.
            </p>

            {/* Photo Gallery Grid */}
            <div className="photo-gallery-grid">
              <div className="photo-gallery-item">
                <img src="./images/team-group.jpg" alt="Armamento Dental Studio Team" loading="lazy" />
              </div>
              <div className="photo-gallery-item">
                <img src="./images/team-dentists.jpg" alt="Dentists in White Coats" loading="lazy" />
              </div>
              <div className="photo-gallery-item">
                <img src="./images/team-opening.jpg" alt="Clinic Entrance Opening" loading="lazy" />
              </div>
              <div className="photo-gallery-item">
                <img src="./images/team-care.jpg" alt="Care Team in Scrubs" loading="lazy" />
              </div>
              <div className="photo-gallery-item">
                <img src="./images/team-fun.jpg" alt="Fun Team Moments" loading="lazy" />
              </div>
              <div className="photo-gallery-item">
                <img src="./images/team-care-portrait.jpg" alt="Dr. Aldrine and Team" loading="lazy" />
              </div>
            </div>

            <button
              onClick={() => setBookingOpen(true)}
              className="nav-cta-btn"
            >
              Experience the Studio Firsthand
            </button>
          </div>
        </section>

        {/* Section 6: Location & Visit Information */}
        <section className="story-section" id="location">
          <div className="glass-panel story-card" style={{ maxWidth: '600px' }}>
            <span className="story-tag">
              <MapPin size={14} /> Convenient Location
            </span>
            <h2 className="story-heading">
              Visit Us at APM Centrale, Cebu City.
            </h2>
            <p className="story-desc">
              Located right across SM City Cebu with ample parking, easy Grab access, and seamless transit links.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={20} color="#00d2ff" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>Address</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                    2nd Floor, APM Centrale, A. Soriano Ave, Mabolo, Cebu City, 6000 Philippines
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>(Across SM City Cebu)</div>
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
