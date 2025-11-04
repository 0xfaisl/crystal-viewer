import * as THREE from 'three';

const atomMaterials = {
    'A': new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5 }),
    'B': new THREE.MeshStandardMaterial({ color: 0xff4444, roughness: 0.5 }),
    'C': new THREE.MeshStandardMaterial({ color: 0x4444ff, roughness: 0.5 }),
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
