import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { drawAxes } from './viewer/axes.js';
import { getLatticeVectors } from './viewer/lattice.js';
import { drawUnitCell, drawHexagonalPrism } from './viewer/cell.js';
import { drawAtoms, drawHexagonalAtoms } from './viewer/atoms.js';
import { presets } from './viewer/presets.js';
import { initPanel } from './ui/panel.js';

// --- Scene Globals ---
let scene, camera, renderer, labelRenderer, controls;
let currentStructure = new THREE.Group();
let frustumSize = 10; // Initial frustum size

function init() {
    // --- Scene Setup ---
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // --- Camera Setup ---
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        0.1,
        1000
    );
    camera.position.set(10, 10, 10);
    scene.add(camera);

    // --- Renderer Setup ---
    const canvas = document.getElementById('viewer');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // --- Label Renderer ---
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '60px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);

    // --- Controls ---
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x606060, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // --- Content ---
    const axes = drawAxes();
    scene.add(axes);
    scene.add(currentStructure);

    // --- UI ---
    initPanel(drawStructure);

    // --- Listeners ---
    window.addEventListener('resize', onWindowResize);
    document.getElementById('reset-view-btn').addEventListener('click', resetView);

    // --- Start ---
    animate();
    console.log('Crystal Viewer initialized and enhanced.');
}

function clearStructure() {
    while (currentStructure.children.length > 0) {
        currentStructure.remove(currentStructure.children[0]);
    }
}

function formatLatticeParams({ a, b, c, alpha, beta, gamma }) {
    const lengths = [];
    if (a === b && b === c) lengths.push('a=b=c');
    else if (a === b) lengths.push('a=b!=c');
    else if (a === c) lengths.push('a=c!=b');
    else if (b === c) lengths.push('b=c!=a');
    else lengths.push('a!=b!=c');

    const angles = [];
    if (alpha === 90 && beta === 90 && gamma === 90) angles.push('α=β=γ=90°');
    else if (alpha === beta && beta === gamma) angles.push('α=β=γ!=90°');
    else if (alpha === 90 && beta === 90) angles.push('α=β=90°, γ!=90°');
    else angles.push('α!=β!=γ!=90°');

    return `${lengths.join(', ')}; ${angles.join(', ')}`;
}

function drawStructure(presetKey) {
    clearStructure();

    const preset = presets[presetKey];
    if (!preset) {
        console.error(`Preset "${presetKey}" not found.`);
        return;
    }

    const infoDiv = document.getElementById('lattice-info');
    infoDiv.textContent = formatLatticeParams(preset.lattice);

    if (presetKey === 'hexagonal') {
        const { a, c } = preset.lattice;
        const cell = drawHexagonalPrism(a, c);
        const atoms = drawHexagonalAtoms(a, c, preset.atomRadius);
        currentStructure.add(cell, atoms);
    } else {
        const latticeVectors = getLatticeVectors(preset.lattice);
        const cell = drawUnitCell(latticeVectors);
        const atoms = drawAtoms(latticeVectors, preset.basis, preset.atomRadius);
        currentStructure.add(cell, atoms);
    }

    const box = new THREE.Box3().setFromObject(currentStructure);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    currentStructure.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    frustumSize = maxDim * 2.0;

    onWindowResize();
    resetView();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function onWindowResize() {
    const aspect = window.innerWidth / (window.innerHeight - 60);
    camera.left = frustumSize * aspect / -2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 60);
    labelRenderer.setSize(window.innerWidth, window.innerHeight - 60);
}

function resetView() {
    controls.reset();
    controls.target.set(0, 0, 0);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
}

init();