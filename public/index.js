document.addEventListener('DOMContentLoaded', () => {
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

  const updateObjects = () => {
    position++

    if (position >= dataArray.length) {
      position = 0
    }

    cube.rotation.x = dataArray[position] / 100
    // cube.rotation.y += .01
  }

  let x = 100
  const doOnceASecond = (cb) => {
    if (--x < 1) {
      x = 100
      cb()
    }
  }

  let position = 0;

  // 6. Run the renderer
  const animate = () => {
    requestAnimationFrame(animate)

    // Audio

    doOnceASecond(() => console.log(dataArray))

    // Visual
    updateObjects()
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
  }

  animate()

  const startButton = document.querySelector('#start')

  startButton.addEventListener('mousedown', () => {
    // Make sound
    oscillator.start()
    setTimeout(() => {
      analyser.getByteTimeDomainData(dataArray)
    }, 1000);
    startButton.remove();
  })
})
