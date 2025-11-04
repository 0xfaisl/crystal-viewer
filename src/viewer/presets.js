export const presets = {
    sc: {
        name: "Simple Cubic",
        lattice: { a: 3, b: 3, c: 3, alpha: 90, beta: 90, gamma: 90 },
        basis: [
            { pos: [0, 0, 0], kind: 'A' },
            { pos: [1, 0, 0], kind: 'A' },
            { pos: [0, 1, 0], kind: 'A' },
            { pos: [0, 0, 1], kind: 'A' },
            { pos: [1, 1, 0], kind: 'A' },
            { pos: [1, 0, 1], kind: 'A' },
            { pos: [0, 1, 1], kind: 'A' },
            { pos: [1, 1, 1], kind: 'A' },
        ],
        atomRadius: 0.3
    },
    bcc: {
        name: "Body-Centered Cubic",
        lattice: { a: 3, b: 3, c: 3, alpha: 90, beta: 90, gamma: 90 },
        basis: [
            // Corner atoms
            { pos: [0, 0, 0], kind: 'A' },
            { pos: [1, 0, 0], kind: 'A' },
            { pos: [0, 1, 0], kind: 'A' },
            { pos: [0, 0, 1], kind: 'A' },
            { pos: [1, 1, 0], kind: 'A' },
            { pos: [1, 0, 1], kind: 'A' },
            { pos: [0, 1, 1], kind: 'A' },
            { pos: [1, 1, 1], kind: 'A' },
            // Body-centered atom
            { pos: [0.5, 0.5, 0.5], kind: 'B' },
        ],
        atomRadius: 0.3
    },
    fcc: {
        name: "Face-Centered Cubic",
        lattice: { a: 4, b: 4, c: 4, alpha: 90, beta: 90, gamma: 90 },
        basis: [
            // Corner atoms
            { pos: [0, 0, 0], kind: 'A' },
            { pos: [1, 0, 0], kind: 'A' },
            { pos: [0, 1, 0], kind: 'A' },
            { pos: [0, 0, 1], kind: 'A' },
            { pos: [1, 1, 0], kind: 'A' },
            { pos: [1, 0, 1], kind: 'A' },
            { pos: [0, 1, 1], kind: 'A' },
            { pos: [1, 1, 1], kind: 'A' },
            // Face-centered atoms
            { pos: [0.5, 0.5, 0], kind: 'B' },
            { pos: [0.5, 0, 0.5], kind: 'B' },
            { pos: [0, 0.5, 0.5], kind: 'B' },
            { pos: [1, 0.5, 0.5], kind: 'B' }, // Opposite face in x
            { pos: [0.5, 1, 0.5], kind: 'B' }, // Opposite face in y
            { pos: [0.5, 0.5, 1], kind: 'B' }, // Opposite face in z
        ],
        atomRadius: 0.3
    },
    hcp: {
        name: "Hexagonal Close-Packed",
        lattice: { a: 3, b: 3, c: 4.9, alpha: 90, beta: 90, gamma: 120 },
        basis: [
            { pos: [0, 0, 0], kind: 'A' },
            { pos: [1, 0, 0], kind: 'A' },
            { pos: [0, 1, 0], kind: 'A' },
            { pos: [1, 1, 0], kind: 'A' },
            { pos: [0, 0, 1], kind: 'A' },
            { pos: [1, 0, 1], kind: 'A' },
            { pos: [0, 1, 1], kind: 'A' },
            { pos: [1, 1, 1], kind: 'A' },
            // Atoms in the middle layer
            { pos: [1/3, 2/3, 0.5], kind: 'B' },
            { pos: [2/3, 1/3, 0.5], kind: 'B' },
        ],
        atomRadius: 0.3
    }
};
