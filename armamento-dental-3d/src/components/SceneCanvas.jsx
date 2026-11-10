import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { DentalModel } from './DentalModel'

export function SceneCanvas({ mode, wireframe, theme, isMobile }) {
  return (
    <div className="canvas-container">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera
          makeDefault
          position={isMobile ? [0, 0, 7.5] : [2.5, 0.5, 5.5]}
          fov={42}
        />

        {/* Studio Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[6, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={1024}
        />
        <directionalLight
          position={[-6, -4, -4]}
          intensity={0.6}
          color="#00d2ff"
        />
        <pointLight position={[0, 4, 2]} intensity={1.2} color="#ffffff" />
        <pointLight position={[0, -3, -2]} intensity={1.0} color="#38bdf8" />

        <Suspense fallback={null}>
          <DentalModel mode={mode} wireframe={wireframe} theme={theme} />
        </Suspense>

        {/* Allow users to interact, spin, and inspect */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}

