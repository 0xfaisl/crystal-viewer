import * as THREE from 'three';

const ROD_RADIUS = 0.05;
const ROD_MATERIAL = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.6, metalness: 0.2 });

// Helper function to create a single cylinder mesh between two points
function createRod(p1, p2) {
    const distance = p1.distanceTo(p2);
    const geometry = new THREE.CylinderGeometry(ROD_RADIUS, ROD_RADIUS, distance, 12);
    const rod = new THREE.Mesh(geometry, ROD_MATERIAL);

    // Position and orient the rod
    rod.position.copy(p1).lerp(p2, 0.5);
    rod.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(p2, p1).normalize());

    return rod;
}

/**
 * Draws the wireframe of a unit cell using cylinders for edges.
 * @param {{v1: THREE.Vector3, v2: THREE.Vector3, v3: THREE.Vector3}} vectors The lattice vectors.
 * @returns {THREE.Group}
 */
export function drawUnitCell({ v1, v2, v3 }) {
    const cellGroup = new THREE.Group();

    const p0 = new THREE.Vector3(0, 0, 0);
    const p1 = v1.clone();
    const p2 = v2.clone();
    const p3 = v3.clone();
    const p4 = v1.clone().add(v2);
    const p5 = v1.clone().add(v3);
    const p6 = v2.clone().add(v3);
    const p7 = v1.clone().add(v2).add(v3);

    // There are 12 edges in a unit cell
    const edges = [
        [p0, p1], [p0, p2], [p0, p3], // Edges from origin
        [p1, p4], [p1, p5],           // Edges from p1
        [p2, p4], [p2, p6],           // Edges from p2
        [p3, p5], [p3, p6],           // Edges from p3
        [p7, p4], [p7, p5], [p7, p6]  // Edges to the final corner
    ];

    edges.forEach(edge => {
        const rod = createRod(edge[0], edge[1]);
        cellGroup.add(rod);
    });

    return cellGroup;
}

/**
 * Draws the wireframe of a hexagonal prism.
 * @param {number} a - The lattice parameter 'a'.
 * @param {number} c - The lattice parameter 'c'.
 * @returns {THREE.Group}
 */
export function drawHexagonalPrism(a, c) {
    const cellGroup = new THREE.Group();
    const points = [];

    // Calculate the 12 vertices of the hexagonal prism
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = a * Math.cos(angle);
        const y = a * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, 0));      // Bottom face
        points.push(new THREE.Vector3(x, y, c));      // Top face
    }

    // Create the 18 edges
    for (let i = 0; i < 6; i++) {
        const p1_bottom = points[i * 2];
        const p2_bottom = points[((i + 1) % 6) * 2];
        cellGroup.add(createRod(p1_bottom, p2_bottom)); // Bottom face edge

        const p1_top = points[i * 2 + 1];
        const p2_top = points[((i + 1) % 6) * 2 + 1];
        cellGroup.add(createRod(p1_top, p2_top));       // Top face edge

        cellGroup.add(createRod(p1_bottom, p1_top));     // Vertical edge
    }

    return cellGroup;
}
