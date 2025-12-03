
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Make sure this matches your file name
import './index.css' // Keep your CSS import
import { BrowserRouter } from 'react-router-dom' // <--- THIS IS THE MISSING KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- The Engine must be here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)