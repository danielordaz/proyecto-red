const qualityPresets = {
  low: {
    pixelRatio: 1,
    shadows: false,
    shadowMapSize: 0,
    postProcessing: false,
    pointLight: false,
    hemiLight: false,
    outlineEmissive: true
  },
  medium: {
    pixelRatio: 1,
    shadows: true,
    shadowMapSize: 1024,
    postProcessing: true,
    pointLight: true,
    hemiLight: true,
    outlineEmissive: false
  },
  high: {
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    shadows: true,
    shadowMapSize: 2048,
    postProcessing: true,
    pointLight: true,
    hemiLight: true,
    outlineEmissive: false
  }
};

export function getGraphicsSettings() {
  const saved = localStorage.getItem('graphicsQuality');
  return saved && qualityPresets[saved] ? qualityPresets[saved] : qualityPresets.high;
}

export function getGraphicsQuality() {
  return localStorage.getItem('graphicsQuality') || 'medium';
}

export function setGraphicsQuality(quality) {
  localStorage.setItem('graphicsQuality', quality);
}

export function applyGraphicsSettings(renderer, scene, settings) {
  renderer.setPixelRatio(settings.pixelRatio);

  scene.traverse((child) => {
    if (child.isLight) {
      if (child.isPointLight) {
        child.visible = settings.pointLight;
      }
      if (child.isHemisphereLight) {
        child.visible = settings.hemiLight;
      }
    }
    if (child.isMesh) {
      child.castShadow = settings.shadows;
      child.receiveShadow = settings.shadows;
    }
  });

  if (renderer.shadowMap) {
    renderer.shadowMap.enabled = settings.shadows;
  }
}

export { qualityPresets };
