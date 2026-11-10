import React, { useState } from 'react'
import { X, Sparkles, MessageSquareQuote, HelpCircle, ChevronRight, CheckCircle2, ShieldCheck, Star } from 'lucide-react'
import { SITE_DATA } from '../data/siteData'

export function ServicesModal({ isOpen, onClose, initialTab = 'services', onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedService, setSelectedService] = useState(SITE_DATA.services[0])
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  if (!isOpen) return null

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="modal-container site-info-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '900px',
          width: '94%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          overflow: 'hidden',
          background: 'rgba(11, 20, 38, 0.96)',
          border: '1px solid rgba(201, 168, 75, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(201, 168, 75, 0.2)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(18, 30, 51, 0.6)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(201, 168, 75, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(201, 168, 75, 0.4)'
              }}
            >
              <Sparkles size={18} color="#E8D48B" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#E8D48B', fontWeight: 600 }}>
                Armamento Dental Studio
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.5px' }}>
                Mabolo, Cebu City · Directly Across SM City Cebu
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s'
            }}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '0.85rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(11, 20, 38, 0.4)'
          }}
        >
          <button
            onClick={() => setActiveTab('services')}
            className={`tab-pill-btn ${activeTab === 'services' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.5rem 1.1rem',
              borderRadius: '999px',
              border: activeTab === 'services' ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeTab === 'services' ? 'rgba(201, 168, 75, 0.15)' : 'transparent',
              color: activeTab === 'services' ? '#E8D48B' : '#94a3b8',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={14} /> All 7 Services
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`tab-pill-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.5rem 1.1rem',
              borderRadius: '999px',
              border: activeTab === 'reviews' ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeTab === 'reviews' ? 'rgba(201, 168, 75, 0.15)' : 'transparent',
              color: activeTab === 'reviews' ? '#E8D48B' : '#94a3b8',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <MessageSquareQuote size={14} /> Patient Reviews (5.0★)
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`tab-pill-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.5rem 1.1rem',
              borderRadius: '999px',
              border: activeTab === 'faqs' ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeTab === 'faqs' ? 'rgba(201, 168, 75, 0.15)' : 'transparent',
              color: activeTab === 'faqs' ? '#E8D48B' : '#94a3b8',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <HelpCircle size={14} /> FAQ
          </button>
        </div>

        {/* Tab Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem' }}>
          
          {/* TAB 1: ALL 7 SERVICES */}
          {activeTab === 'services' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: '1.5rem' }}>
              {/* Service list selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SITE_DATA.services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: selectedService.id === srv.id ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.05)',
                      background: selectedService.id === srv.id ? 'rgba(201, 168, 75, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ color: selectedService.id === srv.id ? '#E8D48B' : '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                        {srv.title}
                      </div>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          color: srv.featured ? '#E8D48B' : '#94a3b8',
                          background: srv.featured ? 'rgba(201, 168, 75, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          display: 'inline-block',
                          marginTop: '3px'
                        }}
                      >
                        {srv.tag}
                      </span>
                    </div>
                    <ChevronRight size={15} color={selectedService.id === srv.id ? '#C9A84B' : '#64748b'} />
                  </div>
                ))}
              </div>

              {/* Service Details Card */}
              <div
                style={{
                  background: 'rgba(18, 30, 51, 0.5)',
                  border: '1px solid rgba(201, 168, 75, 0.25)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#C9A84B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Clinical Specialty
                    </span>
                    {selectedService.featured && (
                      <span style={{ background: 'var(--gold-gradient)', color: '#0B1426', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                        Featured Focus
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#fff', margin: '0 0 0.85rem 0' }}>
                    {selectedService.title}
                  </h3>

                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.65', margin: '0 0 1.25rem 0' }}>
                    {selectedService.desc}
                  </p>

                  <div style={{ fontSize: '0.8rem', color: '#E8D48B', fontWeight: 600, marginBottom: '0.65rem', letterSpacing: '0.5px' }}>
                    KEY CLINICAL HIGHLIGHTS:
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedService.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0', fontSize: '0.86rem' }}>
                        <ShieldCheck size={16} color="#C9A84B" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Personalized consultation with Dr. Aldrine &amp; team
                  </div>
                  <button
                    onClick={() => {
                      onClose()
                      onOpenBooking?.()
                    }}
                    className="nav-cta-btn"
                    style={{ padding: '0.65rem 1.4rem', fontSize: '0.82rem' }}
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PATIENT REVIEWS */}
          {activeTab === 'reviews' && (
            <div>
              <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#E8D48B', margin: '0 0 4px 0' }}>
                    Real Google Patient Reviews
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                    Verified patient experiences from Armamento Dental Studio at APM Centrale.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(201, 168, 75, 0.15)', padding: '6px 14px', borderRadius: '999px', border: '1px solid var(--gold)' }}>
                  <div style={{ display: 'flex', color: '#E8D48B' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#E8D48B" color="#E8D48B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#E8D48B', fontWeight: 700 }}>5.0 Rating</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {SITE_DATA.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(18, 30, 51, 0.5)',
                      border: '1px solid rgba(201, 168, 75, 0.25)',
                      borderRadius: '16px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', color: '#E8D48B', marginBottom: '8px' }}>
                        {[...Array(rev.stars)].map((_, i) => (
                          <Star key={i} size={14} fill="#E8D48B" color="#E8D48B" />
                        ))}
                      </div>
                      <p style={{ color: '#cbd5e1', fontSize: '0.86rem', lineHeight: '1.6', fontStyle: 'italic', margin: '0 0 1rem 0' }}>
                        "{rev.quote}"
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.75rem' }}>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem' }}>{rev.name}</div>
                      <div style={{ color: '#C9A84B', fontSize: '0.74rem' }}>{rev.source}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.82rem', color: '#94a3b8' }}>
                Read more reviews on{' '}
                <a
                  href="https://maps.app.goo.gl/mRj2ayEd6CPRwSL29"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#E8D48B', textDecoration: 'underline' }}
                >
                  Google Maps
                </a>{' '}
                or visit our{' '}
                <a
                  href="https://www.facebook.com/share/1CJP1UctqA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#E8D48B', textDecoration: 'underline' }}
                >
                  Facebook Page
                </a>.
              </div>
            </div>
          )}

          {/* TAB 3: FAQ */}
          {activeTab === 'faqs' && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#E8D48B', margin: '0 0 4px 0' }}>
                  Frequently Asked Questions
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                  Everything you need to know about preparing for your appointment, treatments, and clinic access.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SITE_DATA.faqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i
                  return (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(18, 30, 51, 0.5)',
                        border: isOpen ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s'
                      }}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '1rem 1.25rem',
                          background: 'transparent',
                          border: 'none',
                          color: isOpen ? '#E8D48B' : '#fff',
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.92rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}
                      >
                        <span>{faq.q}</span>
                        <ChevronRight
                          size={16}
                          color={isOpen ? '#E8D48B' : '#94a3b8'}
                          style={{
                            transform: isOpen ? 'rotate(90deg)' : 'none',
                            transition: 'transform 0.2s ease',
                            flexShrink: 0
                          }}
                        />
                      </button>

                      {isOpen && (
                        <div
                          style={{
                            padding: '0 1.25rem 1.15rem 1.25rem',
                            color: '#cbd5e1',
                            fontSize: '0.86rem',
                            lineHeight: '1.65',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
