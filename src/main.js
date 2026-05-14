import { initScene } from './scene.js';
import { initUI } from './ui.js';
import { initModels } from './models.js';
import { initHighlight } from './highlight.js';
import { initInteraction } from './interaction.js';

const state = {
  currentPlant: 'P1',
  highlightedObjects: [],
  hoveredObject: null,
  modelData: {}
};

function init() {
  const sceneData = initScene();
  const uiData = initUI(state);
  const modelData = initModels(sceneData, state);
  const highlightData = initHighlight(sceneData, state);
  const interactionData = initInteraction(sceneData, state, highlightData);

  state.scene = sceneData.scene;
  state.camera = sceneData.camera;
  state.renderer = sceneData.renderer;
  state.composer = highlightData.composer;
}

init();
