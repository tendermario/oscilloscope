import * as THREE from 'three'

import Oscilloscope from './audio'

const DEFAULT_FREQS = ['240']

const CAMERA_ARGS = [75, window.innerWidth/window.innerHeight, 0.1, 1000]
const CAMERA_Z_POS = 10
const RENDERER_SIZE = [window.innerWidth, window.innerHeight]
const GEOMETRY = [2, 2, 2]
const MESH_MAT = {color: 0xfd58d7}
const LIGHT_COLOR = 0xffff00
const LIGHT_POS = [10, 0, 25]

document.addEventListener('DOMContentLoaded', () => {
  // 0. Create the oscilloscope
  const oscilloscope = new Oscilloscope(DEFAULT_FREQS)

  // 1. Create the scene
  const scene = new THREE.Scene()

  // 2. Add a camera view
  const camera = new THREE.PerspectiveCamera(...CAMERA_ARGS)

  camera.position.z = CAMERA_Z_POS

  // 3. Add a renderer to generate the camera's picture
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(...RENDERER_SIZE)

  // 4. Attach what we're rendering to the web page
  document.body.appendChild(renderer.domElement)

  // 5. Lighting + Objects
  const geometry = new THREE.BoxGeometry(...GEOMETRY)
  const material = new THREE.MeshLambertMaterial(MESH_MAT)
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const light = new THREE.PointLight(LIGHT_COLOR)
  light.position.set(...LIGHT_POS)
  scene.add(light)

  const updateObjects = dataArray => {
    position++

    if (position >= dataArray.length) {
      position = 0
    }

    if (dataArray.length === 0) {
      return
    }

    cube.rotation.x = dataArray[position] / 100
    // cube.rotation.y += .01
  }

  let position = 0
  let dataArray = []

  // 6. Run the renderer
  const animate = () => {
    requestAnimationFrame(animate)


    // Visual
    updateObjects(dataArray)
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
  }

  animate()

  const startButton = document.querySelector('#start')

  startButton.addEventListener('mousedown', () => {
    // Make sound
    oscilloscope.start()

    setTimeout(() => {
      dataArray = oscilloscope.getByteTimeDomainData()[0]
    }, 1000);
    startButton.remove();
  })
})
