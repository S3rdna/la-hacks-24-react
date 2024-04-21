import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Game from './Game.jsx'
import Quiz from './Quiz.jsx'

function App() {
  // 1 - home
  // 2 - quiz
  // 3 - game
  const [state, setState] = useState(1) // react hook
 


  return (
    

    <>

      {state === 1 && <>
      <h1>App</h1>
      <div className="card">
      <button onClick={() => setState(2)}>Quiz
        </button>
        <button onClick={() => setState(3)}>Game
        </button>
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </>}


      {state === 2 && <Quiz />}
      {state === 3 && <Game />}
      


    </>
  )
}

export default App
