import * as THREE from 'three';

/**
 * Draws the wireframe of a unit cell given its basis vectors.
 * @param {THREE.Scene} scene The scene to add the cell to.
 * @param {{v1: THREE.Vector3, v2: THREE.Vector3, v3: THREE.Vector3}} vectors The lattice vectors.
 */
export function drawUnitCell({ v1, v2, v3 }) {
    const cellGroup = new THREE.Group();
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });

    const p0 = new THREE.Vector3(0, 0, 0);
    const p1 = v1.clone();
    const p2 = v2.clone();
    const p3 = v3.clone();
    const p4 = v1.clone().add(v2);
    const p5 = v1.clone().add(v3);
    const p6 = v2.clone().add(v3);
    const p7 = v1.clone().add(v2).add(v3);

    const points = [
        // Bottom face
        p0, p1, p1, p4, p4, p2, p2, p0,
        // Top face
        p3, p5, p5, p7, p7, p6, p6, p3,
        // Connecting edges
        p0, p3, p1, p5, p2, p6, p4, p7
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineSegments(geometry, material);
    cellGroup.add(line);

    return cellGroup;
}
