const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 8888;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send('this shit too easy')
});
// POST route to handle login
app.post('/api/login', (req, res) => {

    const { username, password } = req.body;
    console.log(username, password)
    // Here you would typically check the credentials against a database
    if (username === 'admin' && password === 'password') {
        res.json({ success: true, message: 'Login successful!', values: { username, password } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});


app.post('/api/quizdata', (req, res) => {

    console.log(req.body)
    // Here you would typically check the credentials against a database
    res.json({ success: true, message: 'successful!', values: req.body })
})




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

