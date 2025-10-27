const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        port: 5173,
        strictPort: true,
        open: false // Don't auto-open browser when using with Electron
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
}
