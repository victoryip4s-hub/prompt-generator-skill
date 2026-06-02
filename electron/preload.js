import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  generatePrompt: (data) => ipcRenderer.invoke('generate-prompt', data),
})
