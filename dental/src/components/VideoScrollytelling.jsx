import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookingModal } from './BookingModal'
import {
  Phone,
  Clock,
  ChevronUp,
  ChevronDown,
  Calendar,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function VideoScrollytelling({
  chapters,
  videoSrc = './videos/armamento-dental-studio-video.mp4',
  posterSrc = './videos/armamento-dental-studio-poster.jpg'
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentChapter = chapters[activeChapterIndex]

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')

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
          const index = Math.min(
            Math.floor(self.progress * chapters.length),
            chapters.length - 1
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
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [videoSrc, chapters])

  const scrollToChapter = (index) => {
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight
    const targetScroll = (index / (chapters.length - 1)) * totalHeight
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="video-scrolly-container">
      {/* 1. Fullscreen Background Video Viewport (Desktop) */}
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
            {chapters.map((ch, idx) => (
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
        </div>
      </header>

      {/* 3. Invisible Scroll Runway for GSAP */}
      <div className="scrolly-trigger-runway">
        {chapters.map((ch) => (
          <div key={ch.id} className="scrolly-trigger-zone" />
        ))}
      </div>

      {/* 4. Desktop Low-Profile Glass HUD Dock */}
      <div className="floating-hud-dock-wrapper">
        <div className="floating-hud-dock">
          
          <div className="hud-progress-indicators">
            {chapters.map((ch, idx) => (
              <div
                key={ch.id}
                onClick={() => scrollToChapter(idx)}
                className={`hud-progress-bar ${activeChapterIndex === idx ? 'active' : ''}`}
                title={ch.title}
              />
            ))}
          </div>

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

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  )
}
