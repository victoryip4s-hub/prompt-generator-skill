import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'
import { generatePromptWithClaude } from './api/claude.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  const isDev = process.env.NODE_ENV === 'development'
  const url = isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`

  mainWindow.loadURL(url)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// IPC Handler for prompt generation
ipcMain.handle('generate-prompt', async (event, { images, description, style }) => {
  try {
    const prompts = await generatePromptWithClaude({
      images,
      description,
      style,
    })
    return { prompts }
  } catch (error) {
    throw new Error(error.message)
  }
})
