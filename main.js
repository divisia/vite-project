import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const loader = new THREE.TextureLoader()

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000)

const pointLight = new THREE.PointLight(0xffffff)
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLight, lightHelper)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);

const texture = loader.load("torus.png")
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({map: texture})
const torus = new THREE.Mesh(geometry, material)

const gridHelper = new THREE.GridHelper(200, 50)

scene.add(torus, gridHelper)
scene.background = loader.load('space.jpg')

pointLight.position.setY(-20)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)

  torus.rotateX(.01)
  torus.rotateY(.004)

  controls.update()

  renderer.render(scene, camera)
}

animate()

function addStar() {
  const geometry = new THREE.SphereGeometry(0.2)
  const material = new THREE.MeshStandardMaterial(0xffffff)
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)