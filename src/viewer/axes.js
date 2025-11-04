import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

/**
 * Creates and returns a THREE.Group containing labeled axes.
 * @param {number} length The length of the axes.
 * @returns {THREE.Group}
 */
export function drawAxes(length = 1.5) {
    const axes = new THREE.Group();
    const axisMaterial = (color) => new THREE.LineBasicMaterial({ color: 0x888888 });

    // X-axis (a)
    const xAxisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0)]);
    const xAxis = new THREE.Line(xAxisGeo, axisMaterial(0x888888));
    axes.add(xAxis);

    // Y-axis (b)
    const yAxisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0)]);
    const yAxis = new THREE.Line(yAxisGeo, axisMaterial(0x888888));
    axes.add(yAxis);

    // Z-axis (c)
    const zAxisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length)]);
    const zAxis = new THREE.Line(zAxisGeo, axisMaterial(0x888888));
    axes.add(zAxis);

    // --- Labels ---
    const createLabel = (text, position) => {
        const div = document.createElement('div');
        div.className = 'axis-label';
        div.textContent = text;
        const label = new CSS2DObject(div);
        label.position.copy(position);
        return label;
    };

    const aLabel = createLabel('a', new THREE.Vector3(length + 0.2, 0, 0));
    axes.add(aLabel);

    const bLabel = createLabel('b', new THREE.Vector3(0, length + 0.2, 0));
    axes.add(bLabel);

    const cLabel = createLabel('c', new THREE.Vector3(0, 0, length + 0.2));
    axes.add(cLabel);

    return axes;
}
