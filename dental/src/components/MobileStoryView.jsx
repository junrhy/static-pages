import React, { useEffect, useRef, useState } from 'react'
import {
  Sparkles,
  Phone,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Award,
  Menu
} from 'lucide-react'
import { BookingModal } from './BookingModal'
import { ServicesModal } from './ServicesModal'

import { HoloToothHero } from './HoloToothHero'

export function MobileStoryView({
  chapters,
  videoSrc = './videos/armamento-dental-studio-video.mp4',
  posterSrc = './videos/armamento-dental-studio-poster.jpg'
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedGalleryImg, setSelectedGalleryImg] = useState('./images/team-group.jpg')
  const [isExpanded, setIsExpanded] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesModalOpen, setServicesModalOpen] = useState(false)
  const [servicesModalTab, setServicesModalTab] = useState('services')
  const videoRef = useRef(null)
  const touchStartX = useRef(null)

  const current = chapters[activeIndex]

  // Reset selected gallery image whenever chapter changes
  useEffect(() => {
    if (current.id === 'gallery') {
      setSelectedGalleryImg(current.gallery?.[0] || './images/team-group.jpg')
    }
  }, [activeIndex])

  const chapterTimecodes = [
    { start: 0.0, end: 3.5 },
    { start: 3.5, end: 7.2 },
    { start: 7.2, end: 11.5 },
    { start: 11.5, end: 15.5 },
    { start: 15.5, end: 19.5 },
    { start: 19.5, end: 23.0 },
    { start: 23.0, end: 27.0 },
    { start: 27.0, end: 31.0 }
  ]

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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (diff > 45) {
      goNext()
    } else if (diff < -45) {
      goPrev()
    }
    touchStartX.current = null
  }

  return (
    <div
      className="mobile-story-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Fullscreen Background Media Screen */}
      <div className="mobile-video-screen">
        {current.id === 'intro' ? (
          <div className="mobile-hero-branding-screen">
            <HoloToothHero />
          </div>
        ) : current.id === 'team' ? (
          <div className="mobile-pan-container">
            <img
              src="./images/dr-aldrine.jpg"
              alt="Dr. Aldrine Armamento"
              className="mobile-story-image-portrait"
            />
          </div>
        ) : current.id === 'gallery' ? (
          <div className="mobile-pan-container" key={selectedGalleryImg}>
            <img
              src={selectedGalleryImg}
              alt="APM Centrale Care Team"
              className="mobile-story-image-wide-pan"
            />
          </div>
        ) : (
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
        )}
        <div className="mobile-story-overlay" />
      </div>

      {/* 2. Instagram Story Progress Bars at Top */}
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

      {/* 3. Left/Right Tap Target Zones */}
      <div className="story-tap-zone tap-left" onClick={goPrev} />
      <div className="story-tap-zone tap-right" onClick={goNext} />

      {/* 5. Bottom Story Card HUD */}
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

          {/* Expanded Tray Details */}
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

              {/* Mobile Services List */}
              {current.isServicesChapter && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {current.servicesList?.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(201, 168, 75, 0.25)',
                        borderRadius: '8px',
                        padding: '0.5rem 0.75rem'
                      }}
                    >
                      <div style={{ color: '#E8D48B', fontWeight: 600, fontSize: '0.8rem' }}>{s.title}</div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile Reviews List */}
              {current.isReviewsChapter && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {current.reviewsList?.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(201, 168, 75, 0.25)',
                        borderRadius: '8px',
                        padding: '0.65rem'
                      }}
                    >
                      <div style={{ color: '#E8D48B', fontSize: '0.78rem' }}>★★★★★</div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.74rem', fontStyle: 'italic', margin: '3px 0' }}>"{r.quote}"</div>
                      <div style={{ color: '#fff', fontSize: '0.72rem', fontWeight: 600 }}>{r.name}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile FAQ List */}
              {current.isFaqChapter && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {current.faqList?.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(201, 168, 75, 0.25)',
                        borderRadius: '8px',
                        padding: '0.5rem 0.75rem'
                      }}
                    >
                      <div style={{ color: '#E8D48B', fontSize: '0.78rem', fontWeight: 600 }}>{f.q}</div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.72rem', marginTop: '2px' }}>{f.a}</div>
                    </div>
                  ))}
                </div>
              )}

              {current.gallery && (
                <div className="hud-gallery-strip" style={{ marginTop: '0.85rem' }}>
                  {current.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Studio gallery thumbnail ${i + 1}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedGalleryImg(img)
                      }}
                      className={selectedGalleryImg === img ? 'thumbnail-active' : ''}
                      style={{ cursor: 'pointer' }}
                    />
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

      {/* Navigation hints */}
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
            {chapters
              .filter((ch) => ch.id !== 'location')
              .map((ch) => {
                const idx = chapters.findIndex((c) => c.id === ch.id)
                return (
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
                )
              })}
            <div style={{ margin: '1rem 0 0.5rem 0', height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                setServicesModalTab('services')
                setServicesModalOpen(true)
              }}
              style={{ color: '#E8D48B' }}
            >
              All Dental Services
            </a>
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                setServicesModalTab('reviews')
                setServicesModalOpen(true)
              }}
              style={{ color: '#E8D48B' }}
            >
              Patient Reviews (5.0★)
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                setServicesModalTab('faqs')
                setServicesModalOpen(true)
              }}
              style={{ color: '#E8D48B' }}
            >
              Frequently Asked Questions
            </a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              setBookingOpen(true)
            }}
            className="nav-cta-btn"
            style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
          >
            Book Appointment
          </button>

          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#A8B0C0', marginTop: '1rem', cursor: 'pointer' }}
          >
            Close Menu
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <ServicesModal
        isOpen={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
        initialTab={servicesModalTab}
        onOpenBooking={() => setBookingOpen(true)}
      />
    </div>
  )
}
