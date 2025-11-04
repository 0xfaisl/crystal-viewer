# Crystal Viewer

A simple, interactive, browser-based 3D viewer for basic crystal structures. This project provides a clean, scientific-style visualization of crystal unit cells, built with plain JavaScript and Three.js.

It is designed to be a lightweight, educational tool that runs directly in the browser with no installation or build steps required.

**Live Demo:** [https://<your-github-username>.github.io/crystal-viewer/](https://<your-github-username>.github.io/crystal-viewer/)


## Features

- **Interactive 3D Viewer:** Rotate, pan, and zoom to inspect the unit cells from any angle.
- **Multiple Crystal Systems:** Select from a dropdown menu of 9 different crystal structures:
  - Simple Cubic
  - Tetragonal
  - Orthorhombic
  - Rhombohedral
  - Monoclinic
  - Triclinic
  - Hexagonal
  - Body-Centered Cubic (BCC)
  - Face-Centered Cubic (FCC)
- **Scientific Accuracy:** Uses an orthographic camera to prevent perspective distortion and accurately represent cell geometry.
- **Informative UI:** A clean toolbar displays the formal lattice parameters (e.g., `a=b=c, α=β=γ=90°`) for the selected structure.
- **Modern Tech:** Built with modern JavaScript (ES Modules) and the latest version of Three.js, imported directly from a CDN.
- **Zero Dependencies:** Runs without any package manager, bundler, or frameworks.

## Technology Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES Modules)**
- **Three.js** (imported via CDN)

## Local Development

Because the project uses ES Modules, it must be served by a local web server to handle the imports correctly. Opening the `index.html` file directly from the filesystem (`file:///...`) will not work.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/<your-github-username>/crystal-viewer.git
    cd crystal-viewer
    ```

2.  **Serve the directory:**
    The easiest way is to use a simple server extension for your code editor, such as **Live Server** for VS Code.

    Alternatively, you can use Python's built-in HTTP server:
    ```sh
    # For Python 3
    python3 -m http.server
    ```
    Then, open your browser and navigate to `http://localhost:8000`.
