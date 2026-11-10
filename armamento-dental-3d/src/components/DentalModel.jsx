import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Cylinder, Sphere } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Procedural stylized 3D Dental Crown / Implant & Scan Hologram
 * Responsive to the current scroll stage or interactive mode
 */
export function DentalModel({ mode = 'implant', wireframe = false, theme = 'cyan' }) {
  const groupRef = useRef()
  const crownRef = useRef()
  const implantScrewRef = useRef()
  const abutmentRef = useRef()
  const scanRingRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle idle rotation
      groupRef.current.rotation.y += delta * 0.35
    }
    if (scanRingRef.current) {
      scanRingRef.current.rotation.z += delta * 0.8
      scanRingRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.8
    }
  })

  // Material setup
  const porcelainColor = theme === 'gold' ? '#fffbeb' : '#f0f9ff'
  const titaniumColor = theme === 'gold' ? '#e2e8f0' : '#94a3b8'
  const accentHoloColor = theme === 'cyan' ? '#00d2ff' : '#38bdf8'

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        
        {/* === DENTAL CROWN (Top Component) === */}
        <group ref={crownRef} position={[0, 1.1, 0]}>
          {/* Main Crown Body */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[0.85, 0.72, 1.3, 32, 16]} />
            <meshPhysicalMaterial
              color={porcelainColor}
              roughness={0.12}
              metalness={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.08}
              transmission={0.25}
              thickness={0.8}
              ior={1.52}
              wireframe={wireframe}
            />
          </mesh>

          {/* Occlusal Cusp 1 */}
          <mesh position={[0.32, 0.65, 0.32]}>
            <sphereGeometry args={[0.38, 24, 24]} />
            <meshPhysicalMaterial
              color={porcelainColor}
              roughness={0.1}
              clearcoat={1.0}
              wireframe={wireframe}
            />
          </mesh>

          {/* Occlusal Cusp 2 */}
          <mesh position={[-0.32, 0.65, 0.32]}>
            <sphereGeometry args={[0.38, 24, 24]} />
            <meshPhysicalMaterial
              color={porcelainColor}
              roughness={0.1}
              clearcoat={1.0}
              wireframe={wireframe}
            />
          </mesh>

          {/* Occlusal Cusp 3 */}
          <mesh position={[0.32, 0.65, -0.32]}>
            <sphereGeometry args={[0.38, 24, 24]} />
            <meshPhysicalMaterial
              color={porcelainColor}
              roughness={0.1}
              clearcoat={1.0}
              wireframe={wireframe}
            />
          </mesh>

          {/* Occlusal Cusp 4 */}
          <mesh position={[-0.32, 0.65, -0.32]}>
            <sphereGeometry args={[0.38, 24, 24]} />
            <meshPhysicalMaterial
              color={porcelainColor}
              roughness={0.1}
              clearcoat={1.0}
              wireframe={wireframe}
            />
          </mesh>
        </group>

        {/* === ABUTMENT CONNECTOR (Middle Component) === */}
        <group ref={abutmentRef} position={[0, 0.28, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.55, 0.45, 0.55, 24]} />
            <meshStandardMaterial
              color="#e2e8f0"
              metalness={0.9}
              roughness={0.25}
              wireframe={wireframe}
            />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <torusGeometry args={[0.5, 0.06, 16, 32]} />
            <meshStandardMaterial color={accentHoloColor} emissive={accentHoloColor} emissiveIntensity={0.6} />
          </mesh>
        </group>

        {/* === TITANIUM IMPLANT ROOT / SCREW (Bottom Component) === */}
        <group ref={implantScrewRef} position={[0, -1.0, 0]}>
          {/* Tapered Core */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.42, 0.18, 1.8, 32]} />
            <meshStandardMaterial
              color={titaniumColor}
              metalness={0.92}
              roughness={0.28}
              wireframe={wireframe}
            />
          </mesh>

          {/* Micro-threaded rings */}
          {[-0.6, -0.35, -0.1, 0.15, 0.4, 0.65].map((yOffset, i) => (
            <mesh key={i} position={[0, yOffset, 0]}>
              <torusGeometry args={[0.44 - i * 0.035, 0.045, 12, 32]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.95}
                roughness={0.2}
                wireframe={wireframe}
              />
            </mesh>
          ))}

          {/* Root Apex */}
          <mesh position={[0, -0.9, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color={titaniumColor} metalness={0.9} roughness={0.3} />
          </mesh>
        </group>

        {/* === HOLOGRAPHIC SCANNER RINGS === */}
        <group ref={scanRingRef} position={[0, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.4, 0.015, 16, 64]} />
            <meshBasicMaterial color={accentHoloColor} transparent opacity={0.7} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.65, 0.008, 16, 64]} />
            <meshBasicMaterial color={accentHoloColor} transparent opacity={0.35} />
          </mesh>
        </group>

        {/* Digital Point Cloud Grid Orbiting */}
        <points position={[0, 0, 0]}>
          <sphereGeometry args={[1.9, 32, 32]} />
          <pointsMaterial
            size={0.035}
            color={accentHoloColor}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </points>

      </Float>
    </group>
  )
}

