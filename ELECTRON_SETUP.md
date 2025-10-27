# Electron.js Setup Guide

## What is Electron?

Electron is a framework for building cross-platform desktop applications using web technologies (HTML, CSS, JavaScript). It combines Chromium and Node.js, allowing you to create native desktop apps that work on Windows, macOS, and Linux.

## Project Structure

```
ITE 18 Group Activity 2/
├── src/                    # Web application source files
│   ├── index.html         # HTML entry point
│   ├── script.js          # Three.js scene code
│   └── style.css          # Styles
├── dist/                   # Built web files (generated)
├── main.js                 # Electron main process
├── preload.js             # Electron preload script
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## Electron Architecture

### Main Process (main.js)
- Controls the application lifecycle
- Creates and manages browser windows
- Handles system-level operations
- Runs in Node.js environment

### Renderer Process (src/script.js)
- Your Three.js web application
- Runs in each browser window
- Has limited access to Node.js (for security)

### Preload Script (preload.js)
- Bridge between main and renderer processes
- Exposes safe APIs to the web application
- Runs before the web page loads

## Development Workflow

### 1. Web Development Mode
```bash
npm run dev
```
- Runs Vite dev server on http://localhost:5173
- Hot module replacement (HMR) enabled
- Fast development iteration
- Test in browser first

### 2. Electron Development Mode
```bash
npm run electron:dev
```
- Starts Vite dev server
- Waits for server to be ready
- Launches Electron window
- DevTools open by default
- Changes reflect immediately

### 3. Production Build
```bash
npm run build
npm run electron
```
- Builds optimized web files to dist/
- Runs Electron with built files
- Tests production behavior

### 4. Distribution Build
```bash
npm run electron:build
```
- Creates installable application
- Packages all dependencies
- Outputs to release/ directory
- Platform-specific installers

## Key Features

### Window Configuration
- **Size**: 1280x800 (min: 800x600)
- **Background**: Matches sunset color (#ffa07a)
- **Security**: Context isolation enabled
- **DevTools**: Available in development

### Security Settings
- `nodeIntegration: false` - Prevents direct Node.js access
- `contextIsolation: true` - Isolates preload scripts
- `webSecurity: true` - Enforces web security policies

### Development Features
- Auto-reload on code changes (via Vite HMR)
- DevTools for debugging
- Console logging
- Error handling

## Scripts Explained

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Vite dev server (web only) |
| `npm run build` | Build production web files |
| `npm run electron` | Run Electron with built files |
| `npm run electron:dev` | Run Electron in development mode |
| `npm run electron:build` | Create distributable application |

## Dependencies

### Production Dependencies
- **three**: 3D graphics library
- **lil-gui**: Debug GUI controls

### Development Dependencies
- **electron**: Desktop application framework
- **electron-builder**: Package and distribute apps
- **vite**: Fast build tool and dev server
- **concurrently**: Run multiple commands simultaneously
- **wait-on**: Wait for resources (dev server) before starting

## Building for Distribution

The `electron:build` script uses electron-builder to create:

### Windows
- NSIS installer (.exe)
- Portable executable
- Auto-updater support

### macOS (if built on Mac)
- DMG installer
- .app bundle
- Code signing support

### Linux (if built on Linux)
- AppImage
- Debian package (.deb)
- RPM package

## Customization

### Change Window Size
Edit `main.js`:
```javascript
mainWindow = new BrowserWindow({
    width: 1920,  // Your width
    height: 1080, // Your height
    // ...
})
```

### Change App Icon
1. Create icon files in `build/` directory
2. Update `package.json` build configuration
3. Rebuild application

### Add Menu Bar
Add to `main.js`:
```javascript
import { Menu } from 'electron'

const menu = Menu.buildFromTemplate([...])
Menu.setApplicationMenu(menu)
```

## Troubleshooting

### Port Already in Use
If port 5173 is busy, change it in `vite.config.js`:
```javascript
server: {
    port: 3000, // Different port
    // ...
}
```

### Electron Window Blank
1. Check if Vite dev server is running
2. Verify URL in main.js matches Vite port
3. Check browser console for errors

### Build Fails
1. Run `npm install` again
2. Delete `node_modules` and reinstall
3. Check Node.js version (14+ required)

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Builder](https://www.electron.build/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
