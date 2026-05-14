import * as THREE from 'three';

export function initScene(settings) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);
  scene.fog = new THREE.Fog(0x87CEEB, 50, 150);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(15, 12, 15);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, precision: 'highp' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(settings.pixelRatio);
  renderer.shadowMap.enabled = settings.shadows;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x4a7c59, 0.8);
  hemiLight.visible = settings.hemiLight;
  scene.add(hemiLight);

  const directionalLight = new THREE.DirectionalLight(0xfff4e0, 2.5);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = settings.shadows;
  directionalLight.shadow.mapSize.width = settings.shadowMapSize;
  directionalLight.shadow.mapSize.height = settings.shadowMapSize;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 40;
  directionalLight.shadow.camera.left = -15;
  directionalLight.shadow.camera.right = 15;
  directionalLight.shadow.camera.top = 15;
  directionalLight.shadow.camera.bottom = -15;
  directionalLight.shadow.bias = -0.001;
  directionalLight.shadow.normalBias = 0.02;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 15, 40);
  pointLight.position.set(0, 8, 0);
  pointLight.castShadow = false;
  pointLight.visible = settings.pointLight;
  scene.add(pointLight);

  const groundGeometry = new THREE.PlaneGeometry(200, 200);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a7c59,
    roughness: 0.9,
    metalness: 0.0
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -3;
  ground.receiveShadow = settings.shadows;
  ground.castShadow = false;
  scene.add(ground);

  return { scene, camera, renderer };
}
