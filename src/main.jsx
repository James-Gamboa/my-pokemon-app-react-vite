import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/components/index.module.css'
import Pokemon from "../src/components/pokemon";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Pokemon />
  </React.StrictMode>,
)
