import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Storage polyfill للـ Vercel/Netlify (يستخدم localStorage بدل window.storage)
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      const val = localStorage.getItem(key)
      return val ? { key, value: val } : null
    },
    set: async (key, value) => {
      localStorage.setItem(key, value)
      // أرسل إشعار للتبويبات الثانية
      window.dispatchEvent(new StorageEvent('storage', { key, newValue: value }))
      return { key, value }
    },
    delete: async (key) => {
      localStorage.removeItem(key)
      return { key, deleted: true }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
