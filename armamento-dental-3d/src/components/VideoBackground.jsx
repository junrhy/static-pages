import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function VideoBackground({ videoSrc = './videos/armamento-dental-studio-video.mp4', poster = './videos/armamento-dental-studio-poster.jpg' }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')

    // Prime video playback on iOS Safari & mobile
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
    const removePrimeListeners = () => primeEvents.forEach(e => window.removeEventListener(e, prime))
    primeEvents.forEach(e => window.addEventListener(e, prime, { passive: true }))
    video.load()
    prime()
    video.addEventListener('loadeddata', prime, { once: true })

    const setupScroller = () => {
      // Scrub the video playback synchronously as the user scrolls through the story
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            video.currentTime = self.progress * video.duration
          }
        }
      })
    }

    if (video.readyState >= 1) {
      setupScroller()
    } else {
      video.addEventListener('loadedmetadata', setupScroller, { once: true })
    }

    return () => {
      removePrimeListeners()
    }
  }, [videoSrc])

  return (
    <div className="video-background-container" ref={containerRef}>
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        muted
        playsInline
        preload="auto"
        className="cinematic-bg-video"
      />
      {/* Dark tint gradient overlay so text remains razor-sharp */}
      <div className="video-scrim-overlay" />
    </div>
  )
}
