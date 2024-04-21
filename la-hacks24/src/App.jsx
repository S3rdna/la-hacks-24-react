import { useState } from 'react'
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
      
      <h1>App</h1>
      <div className="card">
        <button onClick={() => setState(2)}>Game
        </button>
        <button onClick={() => setState(3)}>Quiz
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>


      {state === 2 && <Game />}
      {state === 3 && <Quiz />}


    </>
  )

}

export default App
