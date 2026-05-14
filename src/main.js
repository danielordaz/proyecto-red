import { initScene } from './scene.js';
import { initUI } from './ui.js';
import { initModels } from './models.js';
import { initHighlight } from './highlight.js';
import { initInteraction } from './interaction.js';
import { getGraphicsSettings, getGraphicsQuality, setGraphicsQuality, qualityPresets } from './graphics.js';

const state = {
  currentPlant: 'P1',
  highlightedObjects: [],
  hoveredObject: null,
  modelData: {},
  graphicsQuality: getGraphicsQuality()
};

function init() {
  const settings = getGraphicsSettings();
  const sceneData = initScene(settings);
  const uiData = initUI(state);
  const modelData = initModels(sceneData, state);
  const highlightData = initHighlight(sceneData, state, settings);
  const interactionData = initInteraction(sceneData, state, highlightData);

  state.scene = sceneData.scene;
  state.camera = sceneData.camera;
  state.renderer = sceneData.renderer;
  state.composer = highlightData.composer;
  state.settings = settings;

  initGraphicsUI(state, sceneData, highlightData);
}

function initGraphicsUI(state, sceneData, highlightData) {
  const buttons = document.querySelectorAll('.btn-graphics');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const quality = btn.dataset.quality;
      if (quality === state.graphicsQuality) return;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      state.graphicsQuality = quality;
      setGraphicsQuality(quality);

      const settings = qualityPresets[quality];
      state.settings = settings;

      sceneData.renderer.setPixelRatio(settings.pixelRatio);
      sceneData.renderer.shadowMap.enabled = settings.shadows;

      sceneData.scene.traverse((child) => {
        if (child.isLight) {
          if (child.isPointLight) child.visible = settings.pointLight;
          if (child.isHemisphereLight) child.visible = settings.hemiLight;
        }
        if (child.isMesh) {
          child.castShadow = settings.shadows;
          child.receiveShadow = settings.shadows;
        }
      });

      if (highlightData.setPostProcessing) {
        highlightData.setPostProcessing(settings.postProcessing);
      }

      if (highlightData.setOutlineMode) {
        highlightData.setOutlineMode(settings.outlineEmissive);
      }
    });
  });
}

init();
