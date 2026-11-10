import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookingModal } from './BookingModal'
import {
  Sparkles,
  Phone,
  Clock,
  MapPin,
  ChevronUp,
  ChevronDown,
  Calendar,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  {
    id: 'intro',
    badge: '01 · WELCOME',
    title: 'Precision Dentistry. Personalized Care.',
    sub: 'Your trusted dental sanctuary in Mabolo, Cebu City across SM City Cebu.',
    desc: 'At Armamento Dental Studio, we blend state-of-the-art clinical techniques and gentle, focused attention to give you an unhurried, comfortable dental experience.',
    highlights: ['Specialized Implants & Oral Surgery', 'Laser Teeth Whitening', 'Open Mon–Sat: 9AM – 8PM']
  },
  {
    id: 'team',
    badge: '02 · CLINICAL LEAD',
    title: 'Meet Dr. Aldrine Armamento',
    sub: 'Founder & Principal Dentist with 12+ years of surgical and clinical expertise.',
    desc: 'Dedicated to painless dentistry and clear patient communication. Dr. Aldrine and his team take the time to listen and demystify every treatment before starting.',
    doctorImg: './images/dr-aldrine.jpg'
  },
  {
    id: 'implants',
    badge: '03 · SURGICAL MASTERY',
    title: 'Dental Implants & Oral Surgery',
    sub: 'Permanent titanium teeth replacements, wisdom tooth extractions & bone regeneration.',
    desc: 'Restore original chewing strength and natural smile contours with biocompatible titanium implants designed for lifetime structural integrity.',
    highlights: ['Single & Multi Implants', 'Minimally Invasive Extractions', 'Site Preservation & Grafting']
  },
  {
    id: 'cosmetic',
    badge: '04 · SMILE DESIGN',
    title: 'Porcelain Veneers & Laser Whitening',
    sub: 'Artistic cosmetic makeovers designed to elevate your personal confidence.',
    desc: 'From custom micro-thin E-Max ceramic veneers to in-office laser whitening, we craft naturally radiant smiles tailored to your unique facial geometry.',
    highlights: ['Instant In-Office Laser Whitening', 'Ultra-Thin E-Max Veneers', 'Seamless Aesthetic Bonding']
  },
  {
    id: 'gallery',
    badge: '05 · STUDIO ATMOSPHERE',
    title: 'Inside The Studio Experience',
    sub: 'A peek into our modern, clean, and welcoming clinical environment at APM Centrale.',
    desc: 'See our dedicated dental team in action—providing thoughtful, patient-first care in an atmosphere designed to remove clinic anxiety.',
    gallery: [
      './images/team-group.jpg',
      './images/team-dentists.jpg',
      './images/team-opening.jpg',
      './images/team-care.jpg',
      './images/team-fun.jpg',
      './images/team-care-portrait.jpg'
    ]
  },
  {
    id: 'location',
    badge: '06 · VISIT US',
    title: 'Visit Us at APM Centrale',
    sub: '2nd Floor, APM Centrale, A. Soriano Ave, Mabolo (Directly across SM City Cebu).',
    desc: 'Easily accessible with secure mall parking, direct Grab drop-off, and elevator access. Open Monday to Saturday from 9:00 AM to 8:00 PM.',
    contact: {
      phone: '+63 945 599 7475',
      landline: '(032) 256-0878',
      hours: 'Mon–Sat: 9:00 AM – 8:00 PM'
    }
  }
]

export function VideoScrollytelling({
  videoSrc = './videos/armamento-dental-studio-video.mp4',
  posterSrc = './videos/armamento-dental-studio-poster.jpg'
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentChapter = CHAPTERS[activeChapterIndex]

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
      // 1. Continuous video scrubbing across entire scroll runway
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            video.currentTime = self.progress * video.duration
          }
          // Compute chapter based on scroll progress
          const index = Math.min(
            Math.floor(self.progress * CHAPTERS.length),
            CHAPTERS.length - 1
          )
          setActiveChapterIndex(index)
        }
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

  const scrollToChapter = (index) => {
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight
    const targetScroll = (index / (CHAPTERS.length - 1)) * totalHeight
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="video-scrolly-container">
      {/* 1. Fullscreen Background Video Viewport (100% unobstructed on big screens) */}
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

      {/* 2. Global Top Navbar */}
      <header className="nav-header">
        <a aria-label="Armamento Dental Studio Home" className="logo" href="#intro" onClick={(e) => { e.preventDefault(); scrollToChapter(0) }}>
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
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(idx)}
                className={`nav-pill ${activeChapterIndex === idx ? 'active' : ''}`}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                {ch.title.split('.')[0].replace('Visit Us at ', '').replace('Inside The Studio Experience', 'Studio Tour').replace('Porcelain Veneers & Laser Whitening', 'Cosmetics')}
              </button>
            ))}
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

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <nav className="mobile-links">
            {CHAPTERS.map((ch, idx) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  scrollToChapter(idx)
                }}
              >
                {ch.title}
              </a>
            ))}
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

      {/* 3. Invisible Scroll Runway for GSAP */}
      <div className="scrolly-trigger-runway">
        {CHAPTERS.map((ch) => (
          <div key={ch.id} className="scrolly-trigger-zone" />
        ))}
      </div>

      {/* 4. OPTION 1: Ultra-Thin Floating Glass HUD Dock (Leaves center video 100% open) */}
      <div className="floating-hud-dock-wrapper">
        <div className="floating-hud-dock">
          
          {/* Timeline Bar on top */}
          <div className="hud-progress-indicators">
            {CHAPTERS.map((ch, idx) => (
              <div
                key={ch.id}
                onClick={() => scrollToChapter(idx)}
                className={`hud-progress-bar ${activeChapterIndex === idx ? 'active' : ''}`}
                title={ch.title}
              />
            ))}
          </div>

          {/* Main Low-Profile HUD Row */}
          <div className="hud-dock-main-row">
            <div className="hud-dock-left">
              <span className="hud-chapter-badge">{currentChapter.badge}</span>
              <div className="hud-text-group">
                <h2 className="hud-headline">{currentChapter.title}</h2>
                <p className="hud-subline">{currentChapter.sub}</p>
              </div>
            </div>

            <div className="hud-dock-right">
              <button
                className="hud-toggle-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Toggle details"
              >
                {isExpanded ? (
                  <>Less Details <ChevronDown size={14} /></>
                ) : (
                  <>More Details <ChevronUp size={14} /></>
                )}
              </button>

              <button
                onClick={() => setBookingOpen(true)}
                className="nav-cta-btn"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Optional Expanding Tray (Kept contained within bottom HUD dock) */}
          {isExpanded && (
            <div className="hud-expanded-tray">
              <div>
                <p className="hud-expanded-desc">{currentChapter.desc}</p>
                {currentChapter.highlights && (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                    {currentChapter.highlights.map((h, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#E8D48B' }}>
                        <ShieldCheck size={13} color="#C9A84B" /> {h}
                      </span>
                    ))}
                  </div>
                )}
                {currentChapter.contact && (
                  <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.6rem', flexWrap: 'wrap', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    <span><Phone size={13} color="#C9A84B" style={{ verticalAlign: 'middle', marginRight: '4px' }} />{currentChapter.contact.phone}</span>
                    <span><Clock size={13} color="#C9A84B" style={{ verticalAlign: 'middle', marginRight: '4px' }} />{currentChapter.contact.hours}</span>
                  </div>
                )}
              </div>

              {/* Extra visual element if available in chapter */}
              {currentChapter.doctorImg && (
                <div className="doctor-mini-chip">
                  <img src={currentChapter.doctorImg} alt="Dr. Aldrine" />
                  <div>
                    <div style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}>Dr. Aldrine Armamento</div>
                    <div style={{ color: '#C9A84B', fontSize: '0.72rem' }}>Principal Dental Surgeon</div>
                  </div>
                </div>
              )}

              {currentChapter.gallery && (
                <div className="hud-gallery-strip">
                  {currentChapter.gallery.slice(0, 4).map((img, i) => (
                    <img key={i} src={img} alt="Studio gallery thumbnail" />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  )
}
