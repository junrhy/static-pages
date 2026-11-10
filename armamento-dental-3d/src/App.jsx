import React from 'react'
import { VideoScrollytelling } from './components/VideoScrollytelling'

export default function App() {
  return (
    <div className="experience-container">
      <VideoScrollytelling
        videoSrc="./videos/armamento-dental-studio-video.mp4"
        posterSrc="./videos/armamento-dental-studio-poster.jpg"
      />
    </div>
  )
}
