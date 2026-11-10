import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookingModal } from './BookingModal'
import {
  Sparkles,
  ShieldCheck,
  Phone,
  Clock,
  MapPin,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  Calendar
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
      {/* Fixed Background Video Viewport */}
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
        <div className="video-cinema-overlay" />
      </div>

      {/* Global Navbar with Official Armamento SVG Emblem Logo */}
      <header className="nav-header">
        <a aria-label="Armamento Dental Studio Home" className="logo" href="#intro">
          <svg aria-hidden="true" className="logo-icon" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="navGoldGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#E8D48B" />
                <stop offset="45%" stopColor="#C9A84B" />
                <stop offset="100%" stopColor="#A88B2E" />
              </linearGradient>
            </defs>
            <path d="M50 6 L90 50 L50 94 L10 50 Z" fill="none" stroke="url(#navGoldGrad)" strokeLinejoin="round" strokeWidth="5.5" />
            <path d="M50 26 L70 70 H58.5 L54 58 H46 L41.5 70 H30 L50 26 Z" fill="url(#navGoldGrad)" />
            <path d="M46 50 H54 L50 39 Z" fill="#0B1426" />
          </svg>
          <div className="logo-text">
            <span className="brand">ARMAMENTO</span>
            <span className="sub">Dental Studio</span>
          </div>
        </a>

        <div className="nav-center-group">
          <nav className="nav-links">
            <a href="#intro" className="nav-pill">Home</a>
            <a href="#team" className="nav-pill">About</a>
            <a href="#implants" className="nav-pill">Services</a>
            <a href="#gallery" className="nav-pill">Inside The Studio</a>
            <a href="#location" className="nav-pill">Contact</a>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', pointerEvents: 'auto' }}>
          <button
            onClick={() => setBookingOpen(true)}
            className="nav-cta-btn"
          >
            <Calendar size={15} /> Book Appointment
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
            <a href="#intro" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#team" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#implants" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Inside The Studio</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              setBookingOpen(true)
            }}
            className="nav-cta-btn"
            style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
          >
            <Calendar size={16} /> Book Appointment
          </button>
        </div>
      </div>

      {/* Synchronized Scrollytelling Story Chapters */}
      <div className="scrolly-chapters">
        
        {/* CHAPTER 1: Welcome & Studio Overview */}
        <section className="story-step step-left" id="intro">
          <div className="story-card">
            <span className="step-tag">01 &middot; Precision Dentistry &amp; Care</span>
            <h2>Precision Dentistry. Personalized Care.</h2>
            <p>
              Your trusted dental home in Mabolo, Cebu City. At <strong>Armamento Dental Studio</strong>, we blend modern techniques and gentle, focused attention to give you a truly calm dental experience.
            </p>
            <div className="feature-list" style={{ margin: '1.25rem 0' }}>
              <div className="feature-item">
                <div className="feature-bullet"><ShieldCheck size={14} color="#C9A84B" /></div>
                <span>Specialized Dental Implants &amp; Oral Surgery</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#C9A84B" /></div>
                <span>Aesthetic Veneers &amp; In-Office Laser Whitening</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Clock size={14} color="#C9A84B" /></div>
                <span>Mon–Sat: 9:00 AM – 8:00 PM (Across SM City Cebu)</span>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => setBookingOpen(true)} className="nav-cta-btn">
                Schedule Consultation <ChevronRight size={16} />
              </button>
              <a href="tel:09455997475" className="glass-pill" style={{ color: '#fff', textDecoration: 'none', padding: '0.65rem 1.25rem', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Phone size={14} color="#C9A84B" /> (032) 256-0878
              </a>
            </div>
          </div>
        </section>

        {/* CHAPTER 2: Meet Dr. Aldrine Armamento */}
        <section className="story-step step-right" id="team">
          <div className="story-card">
            <span className="step-tag">02 &middot; Meet Your Doctor</span>
            <div className="doctor-profile-card">
              <img
                src="./images/dr-aldrine.jpg"
                alt="Dr. Aldrine Armamento"
                className="doctor-avatar"
              />
              <div>
                <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>
                  Dr. Aldrine Armamento
                </h3>
                <div style={{ color: '#C9A84B', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                  Founder &amp; Principal Dentist
                </div>
                <p style={{ color: '#A8B0C0', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  Dedicated to meticulous clinical care, clear patient education, and painless treatment.
                </p>
              </div>
            </div>
            <p>
              "We designed our studio so you never feel rushed or anxious. From routine prophylaxis to complex surgeries, we walk you through every option with total transparency."
            </p>
            <div style={{ marginTop: '1.35rem' }}>
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
            <h2>Dental Implants &amp; Oral Surgery</h2>
            <p>
              Permanent tooth replacement engineered for strength, biocompatibility, and natural aesthetic harmony.
            </p>
            <div className="services-grid">
              <div className="service-card-mini">
                <div style={{ color: '#C9A84B', fontWeight: 600, fontSize: '0.9rem', marginBottom: '3px' }}>
                  Dental Implants
                </div>
                <p style={{ color: '#A8B0C0', fontSize: '0.8rem' }}>
                  Titanium fixtures that integrate with bone to replace missing teeth permanently.
                </p>
              </div>
              <div className="service-card-mini">
                <div style={{ color: '#C9A84B', fontWeight: 600, fontSize: '0.9rem', marginBottom: '3px' }}>
                  Wisdom Tooth Removal
                </div>
                <p style={{ color: '#A8B0C0', fontSize: '0.8rem' }}>
                  Safe, gentle extractions of impacted molars with minimal post-op swelling.
                </p>
              </div>
              <div className="service-card-mini">
                <div style={{ color: '#C9A84B', fontWeight: 600, fontSize: '0.9rem', marginBottom: '3px' }}>
                  Bone Grafting
                </div>
                <p style={{ color: '#A8B0C0', fontSize: '0.8rem' }}>
                  Site preservation to support solid, long-lasting implant placement.
                </p>
              </div>
              <div className="service-card-mini">
                <div style={{ color: '#C9A84B', fontWeight: 600, fontSize: '0.9rem', marginBottom: '3px' }}>
                  Tooth Extractions
                </div>
                <p style={{ color: '#A8B0C0', fontSize: '0.8rem' }}>
                  Careful, trauma-controlled removal when teeth cannot be preserved.
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
            <span className="step-tag">04 &middot; Cosmetic Smile Design</span>
            <h2>Veneers &amp; Teeth Whitening</h2>
            <p>
              Transform your smile with artistic precision. We craft individual smile makeovers that bring out your natural beauty.
            </p>
            <div className="feature-list" style={{ margin: '1.25rem 0' }}>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#C9A84B" /></div>
                <span><strong>In-Office Laser Whitening:</strong> Lift deep staining caused by coffee, tea, and age in just one sitting.</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#C9A84B" /></div>
                <span><strong>Custom Porcelain Veneers:</strong> Micro-thin ceramic shells crafted to fix gaps, chips, and shape.</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"><Sparkles size={14} color="#C9A84B" /></div>
                <span><strong>Composite Dental Fillings:</strong> Color-matched composite restorations that blend seamlessly.</span>
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
            <span className="step-tag">05 &middot; Clinic Atmosphere</span>
            <h2>Inside Our Dental Sanctuary</h2>
            <p>
              Step inside our calm studio environment at APM Centrale. Meet our team dedicated to making every visit comfortable.
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
            <span className="step-tag">06 &middot; Studio Location</span>
            <h2>Visit Us at APM Centrale</h2>
            <p>
              Conveniently located directly across SM City Cebu with secure mall parking and taxi/Grab accessibility.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(26, 42, 69, 0.4)', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-glass)', margin: '1.25rem 0' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="#C9A84B" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>Address</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                    2nd Floor, APM Centrale, A. Soriano Ave, Mabolo, Cebu City
                  </div>
                  <div style={{ color: '#A8B0C0', fontSize: '0.74rem' }}>(Directly opposite SM City Cebu)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Clock size={18} color="#C9A84B" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>Clinic Hours</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>Monday – Saturday: 9:00 AM – 8:00 PM (Closed Sundays)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="#C9A84B" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>Contact</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                    <a href="tel:09455997475" style={{ color: '#C9A84B', textDecoration: 'none' }}>+63 945 599 7475</a> • (032) 256-0878
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
