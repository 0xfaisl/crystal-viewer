import * as THREE from 'three';

/**
 * Converts lattice parameters (lengths and angles) to Cartesian basis vectors.
 * The conversion follows the standard crystallographic convention where:
 * - vector 'a' is aligned with the x-axis.
 * - vector 'b' is in the xy-plane.
 * - vector 'c' is defined by the remaining angles.
 *
 * @param {object} params - The lattice parameters.
 * @param {number} params.a - Length of the 'a' vector.
 * @param {number} params.b - Length of the 'b' vector.
 * @param {number} params.c - Length of the 'c' vector.
 * @param {number} params.alpha - Angle between 'b' and 'c' in degrees.
 * @param {number} params.beta - Angle between 'a' and 'c' in degrees.
 * @param {number} params.gamma - Angle between 'a' and 'b' in degrees.
 * @returns {{v1: THREE.Vector3, v2: THREE.Vector3, v3: THREE.Vector3}} The three lattice vectors in Cartesian coordinates.
 */
export function getLatticeVectors({ a, b, c, alpha, beta, gamma }) {
    const toRad = THREE.MathUtils.degToRad;

    const cosAlpha = Math.cos(toRad(alpha));
    const cosBeta = Math.cos(toRad(beta));
    const cosGamma = Math.cos(toRad(gamma));
    const sinGamma = Math.sin(toRad(gamma));

    // v1 along x-axis
    const v1 = new THREE.Vector3(a, 0, 0);

    // v2 in xy-plane
    const v2 = new THREE.Vector3(b * cosGamma, b * sinGamma, 0);

    // v3 in 3D space
    const cx = c * cosBeta;
    const cy = c * (cosAlpha - cosBeta * cosGamma) / sinGamma;
    const cz = c * Math.sqrt(1 - cosBeta**2 - ((cosAlpha - cosBeta * cosGamma) / sinGamma)**2);

    const v3 = new THREE.Vector3(cx, cy, cz);

    return { v1, v2, v3 };
}
