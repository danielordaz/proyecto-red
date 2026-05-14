import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const plantConfigs = {
  P1: {
    position: { x: 0, y: 0, z: 0 },
    scale: 1
  },
  P2: {
    position: { x: 0, y: 0, z: 0 },
    scale: 1
  },
  buhardilla: {
    position: { x: 0, y: 0, z: 0 },
    scale: 1
  },
  bodega: {
    position: { x: 0, y: 0, z: 0 },
    scale: 1
  }
};

export function initModels(sceneData, state) {
  const { scene, camera, renderer } = sceneData;
  let currentModel = null;
  const loader = new GLTFLoader();
  const loadingEl = document.getElementById('loading');

  function showLoading() { loadingEl.style.display = 'block'; }
  function hideLoading() { loadingEl.style.display = 'none'; }

  function createPlaceholder(plant) {
    const group = new THREE.Group();

    const baseGeometry = new THREE.BoxGeometry(6, 0.2, 4);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8,
      metalness: 0.1
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4C5B0,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.4
    });

    const wall1 = new THREE.Mesh(new THREE.BoxGeometry(6, 2.5, 0.15), wallMaterial);
    wall1.position.set(0, 1.25, -1.925);
    wall1.castShadow = true;
    group.add(wall1);

    const wall2 = new THREE.Mesh(new THREE.BoxGeometry(6, 2.5, 0.15), wallMaterial);
    wall2.position.set(0, 1.25, 1.925);
    wall2.castShadow = true;
    group.add(wall2);

    const wall3 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.5, 4), wallMaterial);
    wall3.position.set(-2.925, 1.25, 0);
    wall3.castShadow = true;
    group.add(wall3);

    const wall4 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.5, 4), wallMaterial);
    wall4.position.set(2.925, 1.25, 0);
    wall4.castShadow = true;
    group.add(wall4);

    const highlightObjects = [];

    if (plant === 'P1') {
      const router = createHighlightObject(0x0066CC, 0.4, 0.3, 0.2, -2, 0.35, -1, 'highlight_router');
      group.add(router);
      highlightObjects.push(router);

      const switchObj = createHighlightObject(0x0066CC, 0.5, 0.15, 0.3, -1.3, 0.275, -1, 'highlight_switch');
      group.add(switchObj);
      highlightObjects.push(switchObj);

      const roseta1 = createHighlightObject(0x00AA44, 0.15, 0.15, 0.05, 1, 1, -1.85, 'highlight_roseta_salon');
      group.add(roseta1);
      highlightObjects.push(roseta1);

      const roseta2 = createHighlightObject(0x00AA44, 0.15, 0.15, 0.05, 2, 1, 1.85, 'highlight_roseta_despacho');
      group.add(roseta2);
      highlightObjects.push(roseta2);
    } else if (plant === 'P2') {
      for (let i = 0; i < 3; i++) {
        const roseta = createHighlightObject(0x00AA44, 0.15, 0.15, 0.05, -1.5 + i * 1.5, 1, -1.85, `highlight_roseta_dormitorio_${i + 1}`);
        group.add(roseta);
        highlightObjects.push(roseta);
      }
    } else if (plant === 'buhardilla') {
      const cable = createHighlightObject(0xFF6600, 0.05, 2.5, 0.05, -2.8, 1.25, 0, 'highlight_cable_buhardilla');
      group.add(cable);
      highlightObjects.push(cable);

      const roseta = createHighlightObject(0x00AA44, 0.15, 0.15, 0.05, 1, 0.35, 0, 'highlight_roseta_buhardilla');
      group.add(roseta);
      highlightObjects.push(roseta);
    } else if (plant === 'bodega') {
      const plcEmisor = createHighlightObject(0xFF6600, 0.25, 0.2, 0.15, -2, 0.3, -1, 'highlight_plc_emisor');
      group.add(plcEmisor);
      highlightObjects.push(plcEmisor);

      const plcReceptor = createHighlightObject(0xFF6600, 0.25, 0.2, 0.15, 1.5, 0.3, 1, 'highlight_plc_receptor');
      group.add(plcReceptor);
      highlightObjects.push(plcReceptor);

      const roseta = createHighlightObject(0x00AA44, 0.15, 0.15, 0.05, 1.5, 0.35, 1.5, 'highlight_roseta_bodega');
      group.add(roseta);
      highlightObjects.push(roseta);
    }

    return { group, highlightObjects };
  }

  function createHighlightObject(color, w, h, d, x, y, z, name) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.5,
      metalness: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.name = name;
    return mesh;
  }

  function loadModel(plant) {
    return new Promise((resolve, reject) => {
      const modelPath = `/assets/models/${plant}.glb`;
      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;
          const config = plantConfigs[plant];
          model.position.set(config.position.x, config.position.y, config.position.z);
          model.scale.setScalar(config.scale);

          const highlightObjects = [];
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                child.material.envMapIntensity = 0.5;
                if (child.material.transparent) {
                  child.material.depthWrite = false;
                  child.material.alphaToCoverage = true;
                }
                if (child.material.map) {
                  child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
                }
              }
              const normalizedName = child.name.split('.')[0];
              if (normalizedName.startsWith('highlight_')) {
                child.userData.baseName = normalizedName;
                highlightObjects.push(child);
              }
            }
          });

          resolve({ model, highlightObjects });
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }

  async function switchModel(plant) {
    showLoading();

    if (currentModel) {
      scene.remove(currentModel.group || currentModel);
      currentModel = null;
    }

    state.highlightedObjects = [];

    try {
      const result = await loadModel(plant);
      scene.add(result.model);
      currentModel = result.model;
      currentModel.group = result.model;
      state.highlightedObjects = result.highlightObjects;
    } catch {
      const placeholder = createPlaceholder(plant);
      scene.add(placeholder.group);
      currentModel = placeholder.group;
      state.highlightedObjects = placeholder.highlightObjects;
    }

    hideLoading();
  }

  state.switchModel = switchModel;
  switchModel(state.currentPlant);

  return { loadModel, switchModel };
}
