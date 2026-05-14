import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export function initHighlight(sceneData, state, settings) {
  const { scene, camera, renderer } = sceneData;

  let usePostProcessing = settings.postProcessing;
  let useEmissiveOutline = settings.outlineEmissive;
  let composer = null;
  let outlinePass = null;

  if (usePostProcessing) {
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    outlinePass.edgeStrength = 5.0;
    outlinePass.edgeGlow = 1.0;
    outlinePass.edgeThickness = 2.5;
    outlinePass.pulsePeriod = 1.5;
    outlinePass.visibleEdgeColor.set(0xFFA500);
    outlinePass.hiddenEdgeColor.set(0x663300);
    composer.addPass(outlinePass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      if (outlinePass) {
        outlinePass.selectedObjects = state.highlightedObjects || [];
      }
      composer.render();
    }
    animate();
  } else {
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }

  let originalEmissive = null;

  function isLatiguillo(object) {
    return object && object.name && (object.name.startsWith('highlight_latiguillo_05') || object.name.startsWith('highlight_latiguillo_2'));
  }

  function setHoveredObject(object) {
    if (originalEmissive) {
      originalEmissive.material.emissive.copy(originalEmissive.color);
      originalEmissive.material.emissiveIntensity = 0;
      originalEmissive = null;
    }

    if (object && object.material) {
      if (!object.userData._materialCloned) {
        object.material = object.material.clone();
        object.userData._materialCloned = true;
      }
      originalEmissive = { material: object.material, color: object.material.emissive.clone() };
      object.material.emissive.set(0xFFA500);
      object.material.emissiveIntensity = isLatiguillo(object) ? 0.15 : 0.7;
    }
  }

  function setPostProcessing(enabled) {
    usePostProcessing = enabled;
  }

  function setOutlineMode(emissiveOnly) {
    useEmissiveOutline = emissiveOnly;
  }

  return { composer, outlinePass, setHoveredObject, isLatiguillo, setPostProcessing, setOutlineMode };
}
