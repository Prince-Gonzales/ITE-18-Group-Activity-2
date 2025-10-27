import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Beach Sunset Environment
 * Integrating concepts from Activity 2.1 (Lights), 2.2 (Shadows), and 2.3 (Scene Composition)
 */

/**
 * Base
 */
// Debug GUI
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights - From Activity 2.1
 * Multiple light types to create a realistic sunset atmosphere
 */

// AmbientLight - Warm ambient lighting for sunset mood (Activity 2.1 concept)
const ambientLight = new THREE.AmbientLight(0xffa07a, 0.4) // Light salmon color
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient Intensity')
scene.add(ambientLight)

// DirectionalLight - Simulates the setting sun (Activity 2.1 & 2.2 concepts)
const sunLight = new THREE.DirectionalLight(0xff6b35, 1.2) // Orange sunset color
sunLight.position.set(-8, 3, -5) // Low angle for sunset
sunLight.castShadow = true // Activity 2.2 - Enable shadows

// Optimize shadow map (Activity 2.2 concept)
sunLight.shadow.mapSize.width = 2048
sunLight.shadow.mapSize.height = 2048
sunLight.shadow.camera.near = 1
sunLight.shadow.camera.far = 30
sunLight.shadow.camera.top = 15
sunLight.shadow.camera.right = 15
sunLight.shadow.camera.bottom = -15
sunLight.shadow.camera.left = -15

scene.add(sunLight)

// Add GUI controls for sun position
const sunFolder = gui.addFolder('Sun Position')
sunFolder.add(sunLight.position, 'x').min(-15).max(15).step(0.1)
sunFolder.add(sunLight.position, 'y').min(0).max(10).step(0.1)
sunFolder.add(sunLight.position, 'z').min(-15).max(15).step(0.1)
sunFolder.add(sunLight, 'intensity').min(0).max(2).step(0.01).name('Sun Intensity')

// HemisphereLight - Sky to ground gradient (Activity 2.1 concept)
const hemisphereLight = new THREE.HemisphereLight(
    0xffd4a3, // Sky color - warm peachy orange
    0x4a90e2, // Ground/sea color - blue
    0.6
)
gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.001).name('Hemisphere Intensity')
scene.add(hemisphereLight)

/**
 * Beach Scene Objects
 */

// Sand/Beach floor
const sandGeometry = new THREE.PlaneGeometry(50, 50)
const sandMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xf4a460, // Sandy brown
    roughness: 0.9,
    metalness: 0.1
})
const sand = new THREE.Mesh(sandGeometry, sandMaterial)
sand.rotation.x = -Math.PI * 0.5
sand.position.y = 0
sand.receiveShadow = true // Activity 2.2 - Receive shadows
scene.add(sand)

// Water plane with reflective material
const waterGeometry = new THREE.PlaneGeometry(50, 30)
const waterMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1e90ff, // Dodger blue
    roughness: 0.1,
    metalness: 0.8,
    transparent: true,
    opacity: 0.9
})
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = -Math.PI * 0.5
water.position.y = 0.05
water.position.z = -15
scene.add(water)

/**
 * Palm Trees - Casting shadows (Activity 2.2 concept)
 */
const palmTrees = new THREE.Group()
scene.add(palmTrees)

// Function to create a palm tree
const createPalmTree = (x, z, scale = 1) => {
    const tree = new THREE.Group()
    
    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2 * scale, 0.3 * scale, 3 * scale, 8)
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }) // Saddle brown
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = 1.5 * scale
    trunk.castShadow = true
    tree.add(trunk)
    
    // Palm leaves (simplified as cones)
    const leavesGeometry = new THREE.ConeGeometry(1.2 * scale, 2 * scale, 8)
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }) // Forest green
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial)
    leaves.position.y = 3.5 * scale
    leaves.castShadow = true
    tree.add(leaves)
    
    tree.position.set(x, 0, z)
    return tree
}

// Add multiple palm trees
palmTrees.add(createPalmTree(-8, 2, 1.2))
palmTrees.add(createPalmTree(-6, 4, 1))
palmTrees.add(createPalmTree(7, 3, 1.1))
palmTrees.add(createPalmTree(9, 1, 0.9))

/**
 * Beach Rocks
 */
const rocks = new THREE.Group()
scene.add(rocks)

const rockGeometry = new THREE.DodecahedronGeometry(0.5)
const rockMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x696969, // Dim gray
    roughness: 0.9
})

for(let i = 0; i < 15; i++) {
    const rock = new THREE.Mesh(rockGeometry, rockMaterial)
    const angle = Math.random() * Math.PI * 2
    const radius = 5 + Math.random() * 8
    rock.position.x = Math.cos(angle) * radius
    rock.position.z = Math.sin(angle) * radius
    rock.position.y = Math.random() * 0.3
    rock.scale.set(
        0.5 + Math.random() * 1.5,
        0.5 + Math.random() * 1,
        0.5 + Math.random() * 1.5
    )
    rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    )
    rock.castShadow = true
    rocks.add(rock)
}

/**
 * Beach Umbrellas
 */
const umbrellas = new THREE.Group()
scene.add(umbrellas)

const createUmbrella = (x, z) => {
    const umbrella = new THREE.Group()
    
    // Pole
    const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8)
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const pole = new THREE.Mesh(poleGeometry, poleMaterial)
    pole.position.y = 1.25
    pole.castShadow = true
    umbrella.add(pole)
    
    // Canopy
    const canopyGeometry = new THREE.ConeGeometry(1.5, 1, 8)
    const canopyMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 }) // Tomato red
    const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial)
    canopy.position.y = 2.5
    canopy.castShadow = true
    umbrella.add(canopy)
    
    umbrella.position.set(x, 0, z)
    return umbrella
}

umbrellas.add(createUmbrella(-3, 5))
umbrellas.add(createUmbrella(2, 6))
umbrellas.add(createUmbrella(5, 5))

/**
 * Animated Fireflies/Lanterns - PointLights (Activity 2.1 concept)
 */
const firefly1 = new THREE.PointLight(0xffff00, 0.8, 5) // Yellow
firefly1.castShadow = true
firefly1.shadow.mapSize.width = 256
firefly1.shadow.mapSize.height = 256
scene.add(firefly1)

const firefly2 = new THREE.PointLight(0xffa500, 0.8, 5) // Orange
firefly2.castShadow = true
firefly2.shadow.mapSize.width = 256
firefly2.shadow.mapSize.height = 256
scene.add(firefly2)

const firefly3 = new THREE.PointLight(0xff69b4, 0.8, 5) // Hot pink
firefly3.castShadow = true
firefly3.shadow.mapSize.width = 256
firefly3.shadow.mapSize.height = 256
scene.add(firefly3)

/**
 * Fog - Warm hazy atmosphere (Activity 2.3 concept)
 */
const fogColor = 0xffa07a // Light salmon
scene.fog = new THREE.Fog(fogColor, 5, 35)
scene.background = new THREE.Color(fogColor)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 5, 15)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.maxPolarAngle = Math.PI / 2 - 0.1 // Prevent going below ground

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(fogColor)

// Enable shadow map (Activity 2.2 concept)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate water waves (Activity 2.3 concept - animation)
    water.position.y = 0.05 + Math.sin(elapsedTime * 0.5) * 0.1

    // Animate fireflies in circular patterns (Activity 2.3 concept)
    const firefly1Angle = elapsedTime * 0.5
    firefly1.position.x = Math.cos(firefly1Angle) * 6
    firefly1.position.z = Math.sin(firefly1Angle) * 6
    firefly1.position.y = 1.5 + Math.sin(elapsedTime * 2) * 0.5

    const firefly2Angle = -elapsedTime * 0.3
    firefly2.position.x = Math.cos(firefly2Angle) * 8
    firefly2.position.z = Math.sin(firefly2Angle) * 8
    firefly2.position.y = 2 + Math.sin(elapsedTime * 1.5) * 0.8

    const firefly3Angle = elapsedTime * 0.4
    firefly3.position.x = Math.cos(firefly3Angle) * 7
    firefly3.position.z = Math.sin(firefly3Angle) * 7
    firefly3.position.y = 1.8 + Math.cos(elapsedTime * 1.8) * 0.6

    // Subtle palm tree sway
    palmTrees.children.forEach((tree, index) => {
        tree.rotation.z = Math.sin(elapsedTime + index) * 0.05
    })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
