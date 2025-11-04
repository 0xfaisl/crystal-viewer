import * as THREE from 'three';

const atomMaterials = {
    'A': new THREE.MeshStandardMaterial({ color: 0x4444ff, roughness: 0.5 }), // Blue for corners
    'B': new THREE.MeshStandardMaterial({ color: 0xff4444, roughness: 0.5 }), // Red for centers
    'C': new THREE.MeshStandardMaterial({ color: 0x44ff44, roughness: 0.5 }), // Green for other
};

/**
 * Draws atoms within the unit cell based on fractional coordinates.
 * @param {THREE.Scene} scene The scene to add the atoms to.
 * @param {{v1: THREE.Vector3, v2: THREE.Vector3, v3: THREE.Vector3}} vectors The lattice vectors.
 * @param {Array<{pos: [number, number, number], kind: string}>} basis The list of atoms in the basis.
 * @param {number} radius The radius for the atom spheres.
 */
export function drawAtoms({ v1, v2, v3 }, basis, radius = 0.3) {
    const atomsGroup = new THREE.Group();
    const geometry = new THREE.SphereGeometry(radius, 32, 32);

    for (const atom of basis) {
        const [u, v, w] = atom.pos;
        const material = atomMaterials[atom.kind] || atomMaterials['A'];

        const position = new THREE.Vector3()
            .addScaledVector(v1, u)
            .addScaledVector(v2, v)
            .addScaledVector(v3, w);

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.copy(position);
        atomsGroup.add(sphere);
    }

    return atomsGroup;
}

/**
 * Draws the 12 atoms at the vertices of a hexagonal prism.
 * @param {number} a - The lattice parameter 'a'.
 * @param {number} c - The lattice parameter 'c'.
 * @param {number} radius - The radius for the atom spheres.
 * @returns {THREE.Group}
 */
export function drawHexagonalAtoms(a, c, radius) {
    const atomsGroup = new THREE.Group();
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = atomMaterials['A'];

    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = a * Math.cos(angle);
        const y = a * Math.sin(angle);

        // Bottom face atom
        const bottomAtom = new THREE.Mesh(geometry, material);
        bottomAtom.position.set(x, y, 0);
        atomsGroup.add(bottomAtom);

        // Top face atom
        const topAtom = new THREE.Mesh(geometry, material);
        topAtom.position.set(x, y, c);
        atomsGroup.add(topAtom);
    }

    return atomsGroup;
}
