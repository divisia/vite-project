import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const textureLoader = new THREE.TextureLoader()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
scene.background = textureLoader.load('space.jpg')

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)


const texture = textureLoader.load("favicon.svg")
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: true })
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)

camera.position.setZ(30);

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.BoxGeometry(3, 3, 3)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  star.rotation.set(x, y, z)
  scene.add(star)
}
Array(200).fill().forEach(addStar)


function animate() {
  requestAnimationFrame(animate)

  torus.rotateX(.001)
  torus.rotateY(.004)
  torus.rotateZ(.009)

  controls.update()

  renderer.render(scene, camera)
}

animate()

const container = renderer.domElement.parentElement;

window.onresize = function onContainerResize() {
  console.log('resized')
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
}