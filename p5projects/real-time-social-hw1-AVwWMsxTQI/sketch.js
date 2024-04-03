import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const particleSphereGeometry = new THREE.SphereGeometry(2.5, 32, 32)
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
})

const particlesGeometry = new THREE.BufferGeometry()
const count = 500
const positions = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 5 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}


particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

//const geometry = new THREE.BoxGeometry(1, 1, 1)
//const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

const sphereParticles = new THREE.Points(particleSphereGeometry, particlesMaterial)
scene.add(sphereParticles)

//const mesh = new THREE.Mesh(geometry, material)
//scene.add(mesh)

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    //controls.update()

    for(let i = 0; i < count; i++){
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        //const offset = Math.random()
        particlesGeometry.attributes.position.array[i3 + 1] +=  Math.sin(elapsedTime*5+x*30)*0.01
        particlesGeometry.attributes.position.needsUpdate = true 
    }
    
    sphereParticles.rotateX(0.001);
    sphereParticles.rotateY(0.001);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
// }