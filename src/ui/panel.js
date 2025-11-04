import { presets } from '../viewer/presets.js';

/**
 * Initializes the UI panel, populates the dropdown, and sets up event listeners.
 * @param {(presetKey: string) => void} onStructureChange - Callback function to be called when the structure is changed.
 */
export function initPanel(onStructureChange) {
    const selectElement = document.getElementById('structure-select');

    // Populate dropdown
    for (const key in presets) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = presets[key].name;
        selectElement.appendChild(option);
    }

    // Event listener for dropdown
    selectElement.addEventListener('change', (event) => {
        onStructureChange(event.target.value);
    });

    // Initial call
    onStructureChange(selectElement.value);
}
