import { contextBridge, ipcRenderer } from 'electron'

/**
 * Preload script for Electron
 * This script runs before the web page is loaded and has access to both
 * Node.js APIs and the DOM. Use it to expose safe APIs to the renderer process.
 */

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // Example: You can add custom APIs here if needed
    platform: process.platform,
    versions: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    }
})

// Log that preload script has loaded
console.log('Preload script loaded successfully')
