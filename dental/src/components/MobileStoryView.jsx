import React, { useEffect, useRef, useState } from 'react'
import {
  Sparkles,
  Phone,
  Clock,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X,
  Menu
} from 'lucide-react'
import { BookingModal } from './BookingModal'

export function MobileStoryView({
  chapters,
  videoSrc = './videos/armamento-dental-studio-video.mp4',
  posterSrc = './videos/armamento-dental-studio-poster.jpg'
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const videoRef = useRef(null)
  const touchStartX = useRef(null)

  const current = chapters[activeIndex]

  // Time segment markers for each chapter inside the video
  const chapterTimecodes = [
    { start: 0.0, end: 3.5 },   // Chapter 1: Overview
    { start: 3.5, end: 7.2 },   // Chapter 2: Dr. Aldrine
    { start: 7.2, end: 11.5 },  // Chapter 3: Implants
    { start: 11.5, end: 15.5 }, // Chapter 4: Cosmetics
    { start: 15.5, end: 19.5 }, // Chapter 5: Gallery
    { start: 19.5, end: 23.0 }  // Chapter 6: Location
  ]

  // When chapter changes, jump video to that segment and play
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')

    const targetTime = chapterTimecodes[activeIndex]?.start || 0
    try {
      video.currentTime = targetTime
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }
    } catch (e) {}
  }, [activeIndex])

  // Loop current segment smoothly or progress
  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    const seg = chapterTimecodes[activeIndex]
    if (seg && video.currentTime >= seg.end) {
      video.currentTime = seg.start
      video.play().catch(() => {})
    }
  }

  const goNext = () => {
    setIsExpanded(false)
    setActiveIndex((prev) => (prev < chapters.length - 1 ? prev + 1 : 0))
  }

  const goPrev = () => {
    setIsExpanded(false)
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : chapters.length - 1))
  }

  // Swipe detection
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (diff > 45) {
      goNext() // Swiped left -> next story
    } else if (diff < -45) {
      goPrev() // Swiped right -> prev story
    }
    touchStartX.current = null
  }

  return (
    <div
      className="mobile-story-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Fullscreen Autoplaying Background Video Loop */}
      <div className="mobile-video-screen">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          playsInline
          loop={false}
          onTimeUpdate={handleTimeUpdate}
          className="mobile-story-video"
        />
        <div className="mobile-story-overlay" />
      </div>

      {/* 2. Instagram/TikTok Story Progress Bars at Top */}
      <div className="mobile-story-header">
        <div className="story-bars-row">
          {chapters.map((ch, idx) => (
            <div
              key={ch.id}
              className={`story-bar-segment ${idx === activeIndex ? 'active' : ''} ${idx < activeIndex ? 'completed' : ''}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>

        {/* Minimal Nav Row */}
        <div className="mobile-top-bar">
          <div className="logo-text">
            <span className="brand" style={{ fontSize: '1rem', letterSpacing: '1px' }}>ARMAMENTO</span>
            <span className="sub" style={{ fontSize: '0.6rem', letterSpacing: '1.5px' }}>Dental Studio</span>
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} color="#E8D48B" />
          </button>
        </div>
      </div>

      {/* 3. Left/Right Tap Target Zones for Quick Tapping */}
      <div className="story-tap-zone tap-left" onClick={goPrev} />
      <div className="story-tap-zone tap-right" onClick={goNext} />

      {/* 4. Bottom Story Card HUD */}
      <div className="mobile-story-card-container">
        <div className={`mobile-story-card ${isExpanded ? 'expanded' : ''}`}>
          
          <div className="mobile-story-card-main">
            <span className="hud-chapter-badge" style={{ alignSelf: 'flex-start' }}>
              {current.badge}
            </span>

            <h2 className="mobile-story-title">{current.title}</h2>
            <p className="mobile-story-sub">{current.sub}</p>

            <div className="mobile-card-actions">
              <button
                className="hud-toggle-btn"
                onClick={() => setIsExpanded(!isExpanded)}
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

          {/* Expanded Tray Details on Mobile */}
          {isExpanded && (
            <div className="mobile-story-tray">
              <p className="mobile-story-desc">{current.desc}</p>

              {current.highlights && (
                <div className="mobile-highlights-list">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="mobile-highlight-item">
                      <ShieldCheck size={14} color="#C9A84B" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {current.doctorImg && (
                <div className="doctor-mini-chip" style={{ marginTop: '0.75rem' }}>
                  <img src={current.doctorImg} alt="Dr. Aldrine" />
                  <div>
                    <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>Dr. Aldrine Armamento</div>
                    <div style={{ color: '#C9A84B', fontSize: '0.74rem' }}>Principal Dental Surgeon</div>
                  </div>
                </div>
              )}

              {current.gallery && (
                <div className="hud-gallery-strip" style={{ marginTop: '0.75rem' }}>
                  {current.gallery.slice(0, 4).map((img, i) => (
                    <img key={i} src={img} alt="Studio gallery thumbnail" />
                  ))}
                </div>
              )}

              {current.contact && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <div><Phone size={13} color="#C9A84B" style={{ verticalAlign: 'middle', marginRight: '6px' }} />{current.contact.phone}</div>
                  <div><Clock size={13} color="#C9A84B" style={{ verticalAlign: 'middle', marginRight: '6px' }} />{current.contact.hours}</div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Navigation arrows hint */}
      <div className="story-nav-hints">
        <button className="story-arrow-btn" onClick={goPrev} aria-label="Previous story">
          <ChevronLeft size={16} color="#E8D48B" />
        </button>
        <div className="story-swipe-hint">Swipe or tap to explore</div>
        <button className="story-arrow-btn" onClick={goNext} aria-label="Next story">
          <ChevronRight size={16} color="#E8D48B" />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <nav className="mobile-links">
            {chapters.map((ch, idx) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveIndex(idx)
                  setMobileMenuOpen(false)
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

          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#A8B0C0', marginTop: '1rem', cursor: 'pointer' }}
          >
            Close Menu
          </button>
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
