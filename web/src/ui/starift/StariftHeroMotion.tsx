import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function StariftHeroMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100)
    camera.position.z = 4.9
    scene.add(new THREE.AmbientLight(0xffffff, 1.4))

    const keyLight = new THREE.PointLight('#9dd7ff', 28, 18)
    keyLight.position.set(-3, 3, 5)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight('#ff9e83', 16, 15)
    rimLight.position.set(3, -2, 2)
    scene.add(rimLight)

    const palette = ['#3478f6', '#35c7d5', '#ff8a70', '#f6a23a'].map((color) => new THREE.Color(color))
    const count = 300
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    for (let index = 0; index < count; index += 1) {
      const offset = index * 3
      positions[offset] = (Math.random() - 0.5) * 13
      positions[offset + 1] = (Math.random() - 0.5) * 4.5
      positions[offset + 2] = (Math.random() - 0.5) * 5
      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[offset] = color.r
      colors[offset + 1] = color.g
      colors[offset + 2] = color.b
      phases[index] = Math.random() * Math.PI * 2
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      sizeAttenuation: true,
    }))
    scene.add(particles)

    const microphone = new THREE.Group()
    scene.add(microphone)
    const glass = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 36, 28),
      new THREE.MeshPhysicalMaterial({ color: '#7ab2ff', metalness: 0.12, roughness: 0.2, transparent: true, opacity: 0.28, clearcoat: 1 }),
    )
    microphone.add(glass)
    const micBody = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.2, 0.56, 8, 20),
      new THREE.MeshPhysicalMaterial({ color: '#f4f9ff', metalness: 0.12, roughness: 0.16, emissive: '#183e70', emissiveIntensity: 0.15, clearcoat: 1 }),
    )
    micBody.position.y = 0.18
    microphone.add(micBody)
    const micSlot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.035), new THREE.MeshBasicMaterial({ color: '#3478f6' }))
    micSlot.position.set(0, 0.23, 0.2)
    microphone.add(micSlot)

    const arcPoints = [[-0.36, 0.25], [-0.36, -0.05], [-0.3, -0.34], [-0.14, -0.48], [0, -0.5], [0.14, -0.48], [0.3, -0.34], [0.36, -0.05], [0.36, 0.25]]
      .map(([x, y]) => new THREE.Vector3(x, y, 0.02))
    const arch = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arcPoints), 40, 0.045, 8, false),
      new THREE.MeshStandardMaterial({ color: '#35c7d5', metalness: 0.28, roughness: 0.3 }),
    )
    microphone.add(arch)
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.27, 16), new THREE.MeshStandardMaterial({ color: '#35c7d5', metalness: 0.25, roughness: 0.3 }))
    stand.position.y = -0.62
    microphone.add(stand)
    const foot = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.02, 3, 16), new THREE.MeshStandardMaterial({ color: '#ff8a70', metalness: 0.15, roughness: 0.32 }))
    foot.rotation.z = Math.PI / 2
    foot.position.y = -0.78
    microphone.add(foot)

    const rings = [
      ['#3478f6', 1.45],
      ['#35c7d5', 1.82],
      ['#ff8a70', 2.17],
    ].map(([color, radius], index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(Number(radius), 0.007, 8, 128),
        new THREE.MeshBasicMaterial({ color: String(color), transparent: true, opacity: 0.36 }),
      )
      ring.rotation.x = 0.9 + index * 0.25
      ring.rotation.y = 0.35 + index * 0.37
      microphone.add(ring)
      return ring
    })

    const fit = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (!width || !height) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = width < 700 ? 4.15 : 4.9
      microphone.scale.setScalar(width < 700 ? 0.84 : 0.92)
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(fit)
    resizeObserver.observe(canvas)
    fit()

    let frame = 0
    const clock = new THREE.Clock()
    const draw = () => {
      const elapsed = clock.getElapsedTime()
      particles.rotation.y = elapsed * 0.018
      particles.rotation.z = Math.sin(elapsed * 0.1) * 0.025
      microphone.rotation.y = Math.sin(elapsed * 0.25) * 0.12
      microphone.rotation.x = Math.cos(elapsed * 0.19) * 0.035
      microphone.position.y = Math.sin(elapsed * 0.8) * 0.04
      rings.forEach((ring, index) => { ring.rotation.z = elapsed * (index % 2 ? 0.035 : -0.025) })
      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(draw)
    }
    frame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        mesh.geometry?.dispose()
        if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose())
        else mesh.material?.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="starift-motion-canvas" aria-hidden="true" />
}
