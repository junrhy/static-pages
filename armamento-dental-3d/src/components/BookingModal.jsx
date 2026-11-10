import React, { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'

export function BookingModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Dental Implants & Surgery',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM - 1:00 PM)',
    notes: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const resetAndClose = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={resetAndClose} aria-label="Close">
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="step-tag" style={{ marginBottom: '0.4rem' }}>Consultation Request</span>
              <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1.65rem', fontWeight: 600, color: '#fff' }}>
                Schedule at APM Centrale
              </h3>
              <p style={{ color: '#A8B0C0', fontSize: '0.88rem', marginTop: '4px' }}>
                Dr. Aldrine Armamento &amp; Team • Mon–Sat: 9:00 AM – 8:00 PM
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Santos"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(11, 20, 38, 0.6)',
                    border: '1px solid rgba(201, 168, 75, 0.3)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.85rem',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+63 945 599 7475"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(11, 20, 38, 0.6)',
                      border: '1px solid rgba(201, 168, 75, 0.3)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(11, 20, 38, 0.6)',
                      border: '1px solid rgba(201, 168, 75, 0.3)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>
                  Interested Treatment
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#0B1426',
                    border: '1px solid rgba(201, 168, 75, 0.3)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.85rem',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                >
                  <option>Dental Implants & Surgery</option>
                  <option>Aesthetic Smile Makeover & Veneers</option>
                  <option>Teeth Whitening (In-Office Laser)</option>
                  <option>General Check-Up & Cleaning (Prophylaxis)</option>
                  <option>Wisdom Tooth Removal & Minor Surgery</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(11, 20, 38, 0.6)',
                      border: '1px solid rgba(201, 168, 75, 0.3)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#0B1426',
                      border: '1px solid rgba(201, 168, 75, 0.3)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option>Morning (9:00 AM - 1:00 PM)</option>
                    <option>Afternoon (1:00 PM - 5:00 PM)</option>
                    <option>Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="nav-cta-btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem'
                }}
              >
                Confirm Booking Request
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201, 168, 75, 0.15)', border: '2px solid #C9A84B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle2 size={36} color="#C9A84B" />
            </div>
            <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1.8rem', fontWeight: 600, color: '#fff' }}>
              Appointment Requested
            </h3>
            <p style={{ color: '#A8B0C0', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>. Our care team will contact you via WhatsApp or SMS at <strong style={{ color: '#C9A84B' }}>{formData.phone}</strong> to confirm your slot.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <button onClick={resetAndClose} className="nav-cta-btn" style={{ padding: '0.75rem 2rem' }}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
