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
        1000 // Increased far plane for larger structures
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
    labelRenderer.domElement.style.top = '60px'; // Offset for the toolbar
    labelRenderer.domElement.style.pointerEvents = 'none'; // Let mouse events pass through
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

    // --- Auto-center and Scale --- 
    const box = new THREE.Box3().setFromObject(currentStructure);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center the structure
    currentStructure.position.sub(center);

    // Calculate optimal frustum size
    const maxDim = Math.max(size.x, size.y, size.z);
    frustumSize = maxDim * 1.5; // Add 50% padding
    cellCenter.copy(center);

    onWindowResize(); // Update camera projection
    resetView();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function onWindowResize() {
    const aspect = window.innerWidth / (window.innerHeight - 60); // Adjust for toolbar height
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
    // The structure is now centered at (0,0,0), so the target is (0,0,0)
    controls.target.set(0, 0, 0);
    camera.position.set(10, 10, 10); // Keep a consistent starting distance
    camera.lookAt(0,0,0);
}

// --- Run --- 
init();