import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookingModal } from './BookingModal'
import {
  Sparkles,
  ShieldCheck,
  Award,
  Phone,
  Clock,
  MapPin,
  ArrowUpRight,
  Menu,
  X,
  Heart,
  Users,
  ChevronRight,
  Calendar,
  Layers,
  Activity
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function VideoScrollytelling({
  videoSrc = './videos/armamento-dental-studio-video.mp4',
  posterSrc = './videos/armamento-dental-studio-poster.jpg'
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', 'true')

    // Mobile priming for iOS Safari & Chrome
    let primed = false
    const prime = () => {
      if (primed) return
      const p = video.play()
      if (p && typeof p.then === 'function') {
        p.then(() => {
          video.pause()
          primed = true
          removePrimeListeners()
        }).catch(() => {})
      } else {
        video.pause()
        primed = true
        removePrimeListeners()
      }
    }
    const primeEvents = ['touchstart', 'touchend', 'pointerdown', 'scroll', 'click']
    const removePrimeListeners = () =>
      primeEvents.forEach(e => window.removeEventListener(e, prime))
    primeEvents.forEach(e => window.addEventListener(e, prime, { passive: true }))
    video.load()
    prime()
    video.addEventListener('loadeddata', prime, { once: true })

    const setupScroller = () => {
      // Direct scroll timeline to scrub the video smoothly from beginning to end
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            video.currentTime = self.progress * video.duration
          }
        }
      })

      // Card entrance and exit transitions
      const cards = container.querySelectorAll('.story-card')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 45, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'bottom 18%',
              toggleActions: 'play reverse play reverse'
            }
          }
        )
      })

      ScrollTrigger.refresh()
    }

    if (video.readyState >= 1) {
      setupScroller()
    } else {
      video.addEventListener('loadedmetadata', setupScroller, { once: true })
    }

    return () => {
      removePrimeListeners()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [videoSrc])

  return (
    <div ref={containerRef} className="video-scrolly-container">
      {/* Fixed Fullscreen Background Video Viewport */}
      <div className="fixed-video-viewport">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          disableRemotePlayback
          muted
          autoPlay={false}
          preload="auto"
          className="scrolly-video-element"
        />
        {/* Ambient Cinema Vignette Overlay */}
        <div className="video-cinema-overlay" />
      </div>

      {/* Global Navbar */}
      <header className="nav-header">
        <a href="#intro" className="brand-badge">
          <div className="brand-icon-box">
            <Sparkles size={22} color="#021226" />
          </div>
          <div>
            <div className="brand-title">ARMAMENTO</div>
            <div className="brand-sub">Dental Studio • APM Centrale</div>
          </div>
        </a>

        <div className="nav-center-group">
          <nav className="nav-links">
            <a href="#intro" className="nav-pill">Overview</a>
            <a href="#team" className="nav-pill">Dr. Aldrine & Team</a>
            <a href="#implants" className="nav-pill">Implants & Surgery</a>
            <a href="#cosmetic" className="nav-pill">Smile Makeover</a>
            <a href="#gallery" className="nav-pill">Inside The Studio</a>
            <a href="#location" className="nav-pill">Visit Us</a>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', pointerEvents: 'auto' }}>
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
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <nav className="mobile-links">
            <a href="#intro" onClick={() => setMobileMenuOpen(false)}>Overview</a>
            <a href="#team" onClick={() => setMobileMenuOpen(false)}>Dr. Aldrine & Team</a>
            <a href="#implants" onClick={() => setMobileMenuOpen(false)}>Implants & Surgery</a>
            <a href="#cosmetic" onClick={() => setMobileMenuOpen(false)}>Smile Makeover</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Inside The Studio</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)}>Visit Us</a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              setBookingOpen(true)
            }}
            className="nav-cta-btn"
            style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
          >
            <Calendar size={18} /> Book Appointment
          </button>
        </div>
      </div>

      {/* Synchronized Scrollytelling Story Chapters */}
      <div className="scrolly-chapters">
        
        {/* CHAPTER 1: Welcome & Studio Overview */}
        <section className="story-step step-left" id="intro">
          <div className="story-card">
            <span className="step-tag">01 &middot; Precision Dental Studio</span>
            <h2>Sculpting Healthy, Confident Smiles in Cebu</h2>
            <p>
              Welcome to <strong>Armamento Dental Studio</strong> at APM Centrale, Mabolo, Cebu City. Experience patient-centric dentistry blending advanced clinical engineering with personalized care.
            </p>
            <div className="feature-list" style={{ margin: '1.25rem 0' }}>
              <div className="feature-item">
                <div className="feature-bullet"><ShieldCheck size={14} color="#00d2ff" /></div>
                <span>Titanium Dental Implants & Oral Surgery</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span>Cosmetic Smile Design & Laser Whitening</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Clock size={14} color="#00d2ff" /></div>
                <span>Mon–Sat: 9:00 AM – 8:00 PM</span>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => setBookingOpen(true)} className="nav-cta-btn">
                Schedule Consultation <ChevronRight size={16} />
              </button>
              <a href="tel:09455997475" className="glass-pill" style={{ color: '#fff', textDecoration: 'none', padding: '0.65rem 1.25rem', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Phone size={14} color="#00d2ff" /> (032) 256-0878
              </a>
            </div>
          </div>
        </section>

        {/* CHAPTER 2: Meet Dr. Aldrine Armamento */}
        <section className="story-step step-right" id="team">
          <div className="story-card">
            <span className="step-tag">02 &middot; Clinical Leadership</span>
            <div className="doctor-profile-card">
              <img
                src="./images/dr-aldrine.jpg"
                alt="Dr. Aldrine Armamento"
                className="doctor-avatar"
              />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                  Dr. Aldrine Armamento
                </h3>
                <div style={{ color: '#00d2ff', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                  Founder & Principal Dentist
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.45 }}>
                  Committed to pain-free, meticulous dental care tailored to your unique smile.
                </p>
              </div>
            </div>
            <p>
              Dentistry should never feel intimidating. We take the time to listen, explain every step with clarity, and ensure every appointment feels calm and reassuring.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <button onClick={() => setBookingOpen(true)} className="nav-cta-btn">
                Book with Dr. Aldrine
              </button>
            </div>
          </div>
        </section>

        {/* CHAPTER 3: Implants & Oral Surgery */}
        <section className="story-step step-left" id="implants">
          <div className="story-card">
            <span className="step-tag">03 &middot; Restorative Surgery</span>
            <h2>Titanium Implants & Bone-Integrated Teeth</h2>
            <p>
              Replace missing teeth with natural-looking, permanent dental implants. Enjoy biting into your favorite food again with complete confidence.
            </p>
            <div className="services-grid">
              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '3px' }}>
                  Single & Multi Implants
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Permanent titanium roots with custom porcelain crowns.
                </p>
              </div>
              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '3px' }}>
                  Wisdom Tooth Removal
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Minimally traumatic impactions with rapid healing.
                </p>
              </div>
              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '3px' }}>
                  Bone Grafting
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Foundational regeneration for lifetime implant anchorage.
                </p>
              </div>
              <div className="service-card-mini">
                <div style={{ color: '#00d2ff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '3px' }}>
                  Full Arch Restorations
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Fixed hybrid bridge solutions for complete smile restoration.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <button onClick={() => setBookingOpen(true)} className="nav-cta-btn">
                Inquire About Implants
              </button>
            </div>
          </div>
        </section>

        {/* CHAPTER 4: Cosmetic Dentistry & Veneers */}
        <section className="story-step step-right" id="cosmetic">
          <div className="story-card">
            <span className="step-tag">04 &middot; Cosmetic & Aesthetic Artistry</span>
            <h2>Porcelain Veneers & Laser Whitening</h2>
            <p>
              Elevate your confidence. Whether fixing tooth discoloration, closing gaps, or reshaping chipped edges, our cosmetic treatments create naturally luminous smiles.
            </p>
            <div className="feature-list" style={{ margin: '1.25rem 0' }}>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>Laser In-Office Whitening:</strong> Immediate shade lift safely administered in a single visit.</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>E-Max Porcelain Veneers:</strong> Micro-thin, lifelike porcelain shells with unmatched durability.</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#00d2ff" /></div>
                <span><strong>Composite Dental Bonding:</strong> Seamless repair for small chips and gaps.</span>
              </div>
            </div>
            <button onClick={() => setBookingOpen(true)} className="nav-cta-btn">
              Consult Smile Makeover
            </button>
          </div>
        </section>

        {/* CHAPTER 5: Inside The Studio Photo Gallery */}
        <section className="story-step step-left" id="gallery">
          <div className="story-card" style={{ maxWidth: '560px' }}>
            <span className="step-tag">05 &middot; Clinic Culture & Space</span>
            <h2>Inside Our Studio Sanctuary</h2>
            <p>
              Take a look at our clinical team, opening celebration, and welcoming environment at APM Centrale, Mabolo.
            </p>
            <div className="photo-gallery-grid">
              <div className="photo-gallery-item">
                <img src="./images/team-group.jpg" alt="Team Group" loading="lazy" />
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
            <button onClick={() => setBookingOpen(true)} className="nav-cta-btn">
              Experience the Studio
            </button>
          </div>
        </section>

        {/* CHAPTER 6: Visit Us & Booking */}
        <section className="story-step step-right" id="location">
          <div className="story-card">
            <span className="step-tag">06 &middot; Prime Location</span>
            <h2>Visit Us at APM Centrale</h2>
            <p>
              Conveniently located directly across SM City Cebu with hassle-free parking and straightforward transit access.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(255,255,255,0.03)', padding: '1.15rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', margin: '1.25rem 0' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="#00d2ff" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Address</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                    2nd Floor, APM Centrale, A. Soriano Ave, Mabolo, Cebu City
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.74rem' }}>(Directly opposite SM City Cebu)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Clock size={18} color="#00d2ff" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Operating Hours</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>Mon–Sat: 9:00 AM – 8:00 PM (Closed Sun)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="#00d2ff" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Direct Line</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                    <a href="tel:09455997475" style={{ color: '#00d2ff', textDecoration: 'none' }}>+63 945 599 7475</a> • (032) 256-0878
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => setBookingOpen(true)} className="nav-cta-btn">
                Reserve Appointment Now
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=APM+Centrale+Mabolo+Cebu+City"
                target="_blank"
                rel="noreferrer"
                className="glass-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.85rem'
                }}
              >
                Google Maps <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  )
}
