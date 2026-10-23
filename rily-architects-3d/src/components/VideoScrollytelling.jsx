import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function VideoScrollytelling({ videoSrc = './architectural-walkthrough.mp4' }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.pause()

    const setupScroller = () => {
      const duration = video.duration || 23.03

      // Direct scroll timeline to scrub video from 0s to 23s smoothly
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = self.progress * video.duration
          }
        }
      })

      // Add entrance and exit opacity & movement transitions for each section card
      const cards = container.querySelectorAll('.story-card')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
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
          playsInline
          webkit-playsinline="true"
          muted
          autoPlay={false}
          preload="auto"
          className="scrolly-video-element"
        />
        {/* Ambient Cinema Vignette */}
        <div className="video-cinema-overlay" />
      </div>

      {/* Synchronized Architectural Storyline Cards */}
      <div className="scrolly-chapters">
        
        {/* TIMECODE: 0.0s – 3.2s | The Grand Panoramic Overview */}
        <section className="story-step step-left">
          <div className="story-card">
            <span className="step-tag">01 &middot; Architectural Vision</span>
            <h2>Bringing Beautiful, Functional Spaces to Life</h2>
            <p>
              Your Family's Dream Home, Your Business's Ideal Space. We blend architectural innovation with real-world building expertise to create the perfect space for your family or business.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a href="https://ri-lyarchitects.com/services/" target="_blank" rel="noreferrer" className="story-cta-btn">
                Start Your Project <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* TIMECODE: 3.2s – 7.0s | Structural Glazing & Light Penetration */}
        <section className="story-step step-right">
          <div className="story-card">
            <span className="step-tag">02 &middot; Spatial Philosophy</span>
            <h3>More Than Just Blueprints &amp; Buildings</h3>
            <p>
              You know architecture isn't just about technical drawings. It's about designing living volumes flooded with daylight, calculated orientations, and seamless circulation.
            </p>
          </div>
        </section>

        {/* TIMECODE: 7.0s – 11.5s | Interior Craftsmanship & Structural Articulation */}
        <section className="story-step step-left">
          <div className="story-card">
            <span className="step-tag">03 &middot; Buildability &amp; Engineering</span>
            <h3>Construction Expertise at Your Service</h3>
            <p>
              From concept to completion, we've got you covered. Your project benefits from our insider construction knowledge—we understand how to build smart, saving you time, money, and headaches.
            </p>
          </div>
        </section>

        {/* TIMECODE: 11.5s – 15.5s | Living Space Harmony & Materiality */}
        <section className="story-step step-right">
          <div className="story-card">
            <span className="step-tag">04 &middot; Everyday Living</span>
            <h3>Beauty Meets Functionality</h3>
            <p>
              Stunning designs that work in real life. We craft spaces that nurture families and inspire businesses through tactile finishes, bespoke ergonomics, and natural ventilation.
            </p>
          </div>
        </section>

        {/* TIMECODE: 15.5s – 19.5s | Passive Climate & Tropical Orientation */}
        <section className="story-step step-left">
          <div className="story-card">
            <span className="step-tag">05 &middot; Tropical Living &amp; Ecology</span>
            <h3>Sustainable Solutions for the Tropics</h3>
            <p>
              Experience the comfort of a space designed to thrive in the tropics. Our designs harness the power of nature with passive cooling strategies, cross breezes, and energy efficiency.
            </p>
          </div>
        </section>

        {/* TIMECODE: 19.5s – 23.0s | The Final Focal Vista & Call to Action */}
        <section className="story-step step-right">
          <div className="story-card">
            <span className="step-tag">06 &middot; Your Journey</span>
            <h2>Creating Spaces You'll Love</h2>
            <p>
              Every project is as unique as you are. We listen, understand, and bring your vision to life. Ready to get your dream space built right?
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="https://ri-lyarchitects.com/services/" target="_blank" rel="noreferrer" className="story-cta-btn">
                Start Your Project <ArrowUpRight size={14} />
              </a>
              <a href="https://ri-lyarchitects.com/portfolio/" target="_blank" rel="noreferrer" className="story-secondary-btn">
                See Portfolio
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
