import { presets } from '../viewer/presets.js';

// Defines the exact order and content of the dropdown menu.
const structureOrder = [
    { key: 'sc', name: 'Simple Cubic' },
    { key: 'tetragonal', name: 'Tetragonal' },
    { key: 'orthorhombic', name: 'Orthorhombic' },
    { key: 'rhombohedral', name: 'Rhombohedral' },
    { key: 'monoclinic', name: 'Monoclinic' },
    { key: 'triclinic', name: 'Triclinic' },
    { key: 'hexagonal', name: 'Hexagonal' },
    { key: 'bcc', name: 'Body-Centered Cubic' },
    { key: 'fcc', name: 'Face-Centered Cubic' },
    { key: 'hcp', name: 'Hexagonal Close-Packed' },
];

/**
 * Initializes the UI panel, populates the dropdown, and sets up event listeners.
 * @param {(presetKey: string) => void} onStructureChange - Callback function to be called when the structure is changed.
 */
export function initPanel(onStructureChange) {
    const selectElement = document.getElementById('structure-select');

    // Clear any existing options
    selectElement.innerHTML = '';

    // Populate dropdown in the correct order
    structureOrder.forEach(item => {
        if (presets[item.key]) {
            const option = document.createElement('option');
            option.value = item.key;
            option.textContent = item.name;
            selectElement.appendChild(option);
        }
    });

    // Event listener for dropdown
    selectElement.addEventListener('change', (event) => {
        onStructureChange(event.target.value);
    });

    // Initial call to draw the first structure in the list
    if (selectElement.value) {
        onStructureChange(selectElement.value);
    }
}