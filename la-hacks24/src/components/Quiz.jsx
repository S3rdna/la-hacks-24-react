
import { useState, useEffect } from 'react'
import '../App.css'
import './Quiz.css'
import ButtonAppBar from './ButtonAppBar.jsx'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import SubmitBt from './SubmitBt.jsx'
import fs from 'fs'; // For file system operations (Node.js)



function Quiz() {
    const [sliderValue, setSliderValue] = useState(0);
    const [questionNum, setquestionNum] = useState(1) // react hook
    const [quizJSON, setquizJSON] = useState({
        spicy: 0,
        meats: { fish: false, pork: false, beef: false, chicken: false },
        allergies: { lactose: false, nuts: false, soy: false, eggs: false },
        cuisineType: []
    })
    const [checkedMeats, setCheckedMeats] = useState([false, false, false, false]);
    const [checkedAllergies, setCheckedAllergies] = useState([false, false, false, false]);



    const handleButtonClick = () => {
        // Update JSON file
        const enu = ['spicy', 'meats', 'allergies', 'cuisineType']
        const t = quizJSON
        switch (questionNum) {
            case 1:
                t[enu[questionNum - 1]] = sliderValue
                setquizJSON(t)
                console.log(quizJSON)
                setquestionNum(questionNum + 1)
                break;

            case 2:
                t[enu[questionNum - 1]] = { fish: checkedMeats[0], pork: checkedMeats[1], beef: checkedMeats[2], chicken: checkedMeats[3] }
                setquizJSON(t)
                console.log(quizJSON)

                setquestionNum(questionNum + 1)
                break;

            case 3:
                t[enu[questionNum - 1]] = { lactose: checkedAllergies[0], nuts: checkedAllergies[1], soy: checkedAllergies[2], eggs: checkedAllergies[3] }
                setquizJSON(t)
                console.log(quizJSON)
                fetch('http://localhost:8888/api/quizdata', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(quizJSON)
                })
                    .then(response => {
                        if (response.ok) {
                            console.log('JSON file updated successfully.');
                            console.log(response)
                        } else {
                            console.error('Failed to update JSON file:', response.statusText);
                        }
                    })
                    .catch(error => {
                        console.error('Error updating JSON file:', error);
                    });
                break;

            default:
                break;
        }
    };

    const handleChangeMeats = (index) => (event) => {
        const t = [...checkedMeats]
        t[index] = event.target.checked;  // Update the specific index
        setCheckedMeats(t);
        console.log(index, t)
    };

    const handleChangeAllergies = (index) => (event) => {
        const t = [...checkedAllergies]
        t[index] = event.target.checked;  // Update the specific index
        setCheckedAllergies(t);
        console.log(index, t.allergies)
    };

    // Function to update JSON file
    const updateJSONFile = (newValue) => {

        // Write JSON data to file (this is a simplified example, in reality, you would handle file I/O properly)
        // You may want to fetch a remote API endpoint to handle this operation
        // Here, I'm assuming you have a backend endpoint '/updateSpiceLevel' that handles writing to the JSON file
        fetch('http://localhost:8888/api/quizdata', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ "spiceLevel": newValue })
        })
            .then(response => {
                if (response.ok) {
                    console.log('JSON file updated successfully.');
                } else {
                    console.error('Failed to update JSON file:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error updating JSON file:', error);
            });
    };


    return (
        <>
            <ButtonAppBar name="Dashboard" />
            {
                questionNum === 1 &&
                <>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ fontSize: 25, minHeight: '64px' }}>
                        What is your spice tolerance on a level of 1-10?
                    </Alert>
                    <Slider
                        aria-label="🌶️"
                        defaultValue={3}
                        valueLabelDisplay="auto"
                        shiftStep={1}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        value={sliderValue}
                        onChange={(e) => { setSliderValue(e.target.value) }}
                        onDragStop={(e) => setSliderValue(e.target.value)}
                    />
                    {/* Pass handleButtonClick function to the SubmitBt component */}
                </>

            }

            {
                questionNum === 2 &&

                <>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ fontSize: 25, minHeight: '64px' }}>
                        Do you any meats you dont like?
                    </Alert>
                    <div style={{ color: "black" }}>
                        {checkedMeats.map((value, index) => (
                            <label key={index}> fish
                                <Checkbox
                                    checked={value}
                                    onChange={handleChangeMeats(index)}  // Pass the index to the handler
                                    inputProps={{ 'aria-label': `controlled-${index}` }}
                                />
                            </label>
                        ))}
                    </div>
                </>
            }

            {
                questionNum === 3 &&

                <>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{ fontSize: 25, minHeight: '64px' }}>
                        Any allergies I should be aware of?
                    </Alert>
                    <div style={{ color: "black" }}>
                        {checkedAllergies.map((value, index) => (
                            <label key={index}>

                                <Checkbox
                                    checked={value}
                                    onChange={handleChangeAllergies(index)}  // Pass the index to the handler
                                    inputProps={{ 'aria-label': `controlled-${index}` }}
                                />
                            </label>
                        ))}
                    </div>
                </>
            }
            <SubmitBt onClick={handleButtonClick} />

        </>

        // next question

    )
}

export default Quiz
