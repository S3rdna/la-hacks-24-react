
import { useState } from 'react'
import './App.css'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`submit button pressed!\nusername: ${username}\npassword: ${password}`)
        //when submitted we need to send to backend
        //
        fetch('http://localhost:8888/api/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label name="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>


                <div className="form-group">
                    <label name="email">Email:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type='submit' value="submit" />
            </form>

        </>
    )
}

export default Login
