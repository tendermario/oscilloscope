// 1. Create the scene
const scene = new THREE.Scene()

// 2. Add a camera view
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth/window.innerHeight, 0.1, 1000)

camera.position.z = 10

// 3. Add a renderer to generate the camera's picture
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )

// 4. Attach what we're rendering to the web page
document.body.appendChild(renderer.domElement)

// 5. Lighting + Objects
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshLambertMaterial({color: 0xfd59d7})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const light = new THREE.PointLight(0xffff00)
light.position.set(10, 0, 25)
scene.add(light)

// 6. Run the renderer
const animate = () => {
  requestAnimationFrame(animate)

  cube.rotation.x += .01
  cube.rotation.y += .01
  camera.updateProjectionMatrix()

  renderer.render(scene, camera)
}

animate()
