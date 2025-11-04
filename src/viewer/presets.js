const ATOM_RADIUS = 0.25;

// --- Basis Helper Functions ---

/** Returns an array of 8 corner atoms. */
const corners = (kind = 'A') => [
    { pos: [0, 0, 0], kind }, { pos: [1, 0, 0], kind },
    { pos: [0, 1, 0], kind }, { pos: [0, 0, 1], kind },
    { pos: [1, 1, 0], kind }, { pos: [1, 0, 1], kind },
    { pos: [0, 1, 1], kind }, { pos: [1, 1, 1], kind },
];

/** Returns an array with 1 body-centered atom. */
const bodyCenter = (kind = 'B') => [{ pos: [0.5, 0.5, 0.5], kind }];

/** Returns an array of 6 face-centered atoms. */
const faceCenters = (kind = 'B') => [
    { pos: [0.5, 0.5, 0], kind }, { pos: [0.5, 0, 0.5], kind }, { pos: [0, 0.5, 0.5], kind },
    { pos: [1, 0.5, 0.5], kind }, { pos: [0.5, 1, 0.5], kind }, { pos: [0.5, 0.5, 1], kind },
];

export const presets = {
    sc: {
        name: "Simple Cubic",
        lattice: { a: 3, b: 3, c: 3, alpha: 90, beta: 90, gamma: 90 },
        basis: corners('A'),
        atomRadius: ATOM_RADIUS
    },
    tetragonal: {
        name: "Tetragonal",
        lattice: { a: 3, b: 3, c: 4, alpha: 90, beta: 90, gamma: 90 },
        basis: corners('A'),
        atomRadius: ATOM_RADIUS
    },
    orthorhombic: {
        name: "Orthorhombic",
        lattice: { a: 3, b: 4, c: 5, alpha: 90, beta: 90, gamma: 90 },
        basis: corners('A'),
        atomRadius: ATOM_RADIUS
    },
    rhombohedral: {
        name: "Rhombohedral",
        lattice: { a: 3, b: 3, c: 3, alpha: 80, beta: 80, gamma: 80 },
        basis: corners('A'),
        atomRadius: ATOM_RADIUS
    },
    monoclinic: {
        name: "Monoclinic",
        lattice: { a: 3, b: 4, c: 5, alpha: 90, beta: 110, gamma: 90 },
        basis: corners('A'),
        atomRadius: ATOM_RADIUS
    },
    triclinic: {
        name: "Triclinic",
        lattice: { a: 3, b: 4, c: 5, alpha: 70, beta: 80, gamma: 90 },
        basis: corners('A'),
        atomRadius: ATOM_RADIUS
    },
    hexagonal: {
        name: "Hexagonal",
        lattice: { a: 3, b: 3, c: 5, alpha: 90, beta: 90, gamma: 120 },
        basis: corners('A'),
        atomRadius: ATOM_RADIUS
    },
    bcc: {
        name: "Body-Centered Cubic",
        lattice: { a: 3.5, b: 3.5, c: 3.5, alpha: 90, beta: 90, gamma: 90 },
        basis: [...corners('A'), ...bodyCenter('B')],
        atomRadius: ATOM_RADIUS
    },
    fcc: {
        name: "Face-Centered Cubic",
        lattice: { a: 4, b: 4, c: 4, alpha: 90, beta: 90, gamma: 90 },
        basis: [...corners('A'), ...faceCenters('B')],
        atomRadius: ATOM_RADIUS
    },
    hcp: {
        name: "Hexagonal Close-Packed",
        lattice: { a: 3, b: 3, c: 4.9, alpha: 90, beta: 90, gamma: 120 },
        basis: [
            ...corners('A'),
            { pos: [1/3, 2/3, 0.5], kind: 'B' },
            { pos: [2/3, 1/3, 0.5], kind: 'B' },
        ],
        atomRadius: ATOM_RADIUS
    }
};