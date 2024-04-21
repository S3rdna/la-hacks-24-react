
import { useState } from 'react'
import './App.css'
import './Game.css'

function Game() {
  const [count, setCount] = useState(0)


console.log("In Game Component")
  return (
    <>
    <h2>Game</h2>
    <div id="aiBox">
        <h3>AI area</h3>
        <p>🐢: Welcome!</p>
        <p>🐢: Click around near your neighborhood to discovered new challenges!</p>
    </div>

    <GoogleMaps />
      
    </>
  )
}

export default Game
