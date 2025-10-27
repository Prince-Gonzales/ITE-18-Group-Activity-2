# ITE 18 Group Activity 2 - Beach Sunset Environment

A 3D Beach Sunset Environment using Three.js, integrating concepts from:
- **Activity 2.1 (Lights)**: Multiple light types (DirectionalLight, AmbientLight, HemisphereLight, PointLight)
- **Activity 2.2 (Shadows)**: Dynamic shadow casting and receiving
- **Activity 2.3 (Haunted House)**: Complete scene composition with textures, fog, and animations

## Features

- **DirectionalLight**: Simulates the setting sun with warm orange/pink tones
- **AmbientLight**: Provides warm ambient lighting for the sunset atmosphere
- **HemisphereLight**: Creates a gradient between sky and sea colors
- **PointLight**: Animated fireflies/lanterns for additional ambiance
- **Dynamic Shadows**: Palm trees, rocks, and umbrellas cast realistic shadows
- **Animated Water**: Waves with reflective materials
- **Fog**: Warm hazy atmosphere
- **Interactive Controls**: Orbit controls to explore the scene

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run these commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run as web application (Vite dev server)
npm run dev

# Run as Electron desktop application (development mode)
npm run electron:dev

# Run Electron with pre-built files
npm run build
npm run electron

# Build Electron application for distribution
npm run electron:build
```

## Running the Application

### Web Version (Browser)
```bash
npm run dev
```
Visit http://localhost:5173 to view the scene in your browser.

### Desktop Version (Electron)
```bash
npm run electron:dev
```
This will start both the Vite dev server and launch the Electron application window.

## Concepts Applied

### From Activity 2.1 - Lights
- DirectionalLight for sun simulation
- AmbientLight for overall scene illumination
- HemisphereLight for sky-to-ground color gradient
- PointLight for dynamic light sources

### From Activity 2.2 - Shadows
- Shadow casting enabled on all objects
- Shadow receiving on ground plane
- Optimized shadow maps for performance
- Dynamic shadow animations

### From Activity 2.3 - Integration
- Complete scene composition
- Fog for atmospheric depth
- Animated elements
- Textured materials
- GUI controls for experimentation
