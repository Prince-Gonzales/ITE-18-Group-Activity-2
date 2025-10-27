import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Determine if we're in development mode
const isDev = process.env.NODE_ENV !== 'production' || process.argv.includes('--dev')

let mainWindow

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true
        },
        backgroundColor: '#ffa07a', // Match the sunset color
        title: 'Beach Sunset Environment - ITE 18 Activity 2',
        icon: path.join(__dirname, 'build/icon.png')
    })

    // Load the app
    if (isDev) {
        // Development mode - load from Vite dev server
        mainWindow.loadURL('http://localhost:5173')
        // Open DevTools in development
        mainWindow.webContents.openDevTools()
    } else {
        // Production mode - load from built files
        mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))
    }

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        // Open external links in default browser
        if (url.startsWith('http://') || url.startsWith('https://')) {
            require('electron').shell.openExternal(url)
            return { action: 'deny' }
        }
        return { action: 'allow' }
    })
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS, re-create window when dock icon is clicked and no windows are open
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
})
