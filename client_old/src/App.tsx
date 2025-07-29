import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Pokedex from './components/pokedex/Pokedex'

export const BASE_URL = "http://localhost:4000/api";

function App() {

  return (
    <Pokedex />

  )
}

export default App
