import { useState } from 'react'
import './App.css'

import Game from './components/Game.jsx'
import Quiz from './components/Quiz.jsx'
import Login from './components/Login.js'

function App() {

    // 1 - home
    // 2 - quiz
    // 3 - game
    const [state, setState] = useState(1) // react hook

    return (

        <>
            {state === 1 && <>

                <Login />
            </>}


            {state === 2 && <Quiz />}
            {state === 3 && <Game />}



        </>
    )

}

export default App

//                <h1>App</h1>
//                <div className="card">
//                    <button onClick={() => setState(2)}>Quiz
//                    </button>
//                    <button onClick={() => setState(3)}>Game
//                    </button>
//                </div>
//            </>}
