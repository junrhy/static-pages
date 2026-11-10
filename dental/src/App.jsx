import React, { useState, useEffect } from 'react'
import { VideoScrollytelling } from './components/VideoScrollytelling'
import { MobileStoryView } from './components/MobileStoryView'

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

export default function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 850)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="experience-container">
      {isMobile ? (
        <MobileStoryView
          chapters={CHAPTERS}
          videoSrc="./videos/armamento-dental-studio-video.mp4"
          posterSrc="./videos/armamento-dental-studio-poster.jpg"
        />
      ) : (
        <VideoScrollytelling
          chapters={CHAPTERS}
          videoSrc="./videos/armamento-dental-studio-video.mp4"
          posterSrc="./videos/armamento-dental-studio-poster.jpg"
        />
      )}
    </div>
  )
}
