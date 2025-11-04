import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { drawAxes } from './viewer/axes.js';
import { getLatticeVectors } from './viewer/lattice.js';
import { drawUnitCell } from './viewer/cell.js';
import { drawAtoms } from './viewer/atoms.js';
import { presets } from './viewer/presets.js';
import { initPanel } from './ui/panel.js';

// --- Scene Globals ---
let scene, camera, renderer, labelRenderer, controls;
let currentStructure = new THREE.Group();
let cellCenter = new THREE.Vector3();

function init() {
    // --- Scene Setup ---
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // --- Camera Setup ---
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 10;
    camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        0.1,
        100
    );
    camera.position.set(5, 5, 5);
    scene.add(camera);

    // --- Renderer Setup ---
    const canvas = document.getElementById('viewer');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // --- Label Renderer ---
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(labelRenderer.domElement);

    // --- Controls ---
    controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // --- Content ---
    drawAxes(scene);
    scene.add(currentStructure);

    // --- UI ---
    initPanel(drawStructure);

    // --- Listeners ---
    window.addEventListener('resize', onWindowResize);
    document.getElementById('reset-view-btn').addEventListener('click', resetView);

    // --- Start ---
    animate();
    console.log('Crystal Viewer initialized.');
}

function clearStructure() {
    // Clear all children from the current structure group
    while (currentStructure.children.length > 0) {
        currentStructure.remove(currentStructure.children[0]);
    }
}

function drawStructure(presetKey) {
    clearStructure();

    const preset = presets[presetKey];
    if (!preset) {
        console.error(`Preset "${presetKey}" not found.`);
        return;
    }

    const latticeVectors = getLatticeVectors(preset.lattice);
    const cell = drawUnitCell(latticeVectors);
    const atoms = drawAtoms(latticeVectors, preset.basis, preset.atomRadius);

    currentStructure.add(cell);
    currentStructure.add(atoms);

    // Update controls target
    cellCenter = new THREE.Vector3()
        .add(latticeVectors.v1)
        .add(latticeVectors.v2)
        .add(latticeVectors.v3)
        .multiplyScalar(0.5);
    resetView();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 10;
    camera.left = frustumSize * aspect / -2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

function resetView() {
    controls.reset();
    camera.position.set(5, 5, 5);
    controls.target.copy(cellCenter);
}

// --- Run --- 
init();
