import { useState } from 'react'
import '../App.css'
import './Game.css'
import GoogleMaps from './GoogleMaps.jsx'
import ButtonAppBar from './ButtonAppBar.jsx'

function Game() {
    const [count, setCount] = useState(0)


    console.log("In Game Component")
    return (
        <>
            <ButtonAppBar name="Explore" />
            <GoogleMaps />

        </>
    )
}

export default Game
