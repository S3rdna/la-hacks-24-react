
import { useState } from 'react'
import '../App.css'
import './Quiz.css'
import ButtonAppBar from './ButtonAppBar.jsx'
import AITextField from './AITextField.jsx'
import DiscreteSlider from './DiscreteSlider.jsx'
import SubmitBt from './SubmitBt.jsx'
import fs from 'fs'; // For file system operations (Node.js)



function Quiz() {
    const [sliderValue, setSliderValue] = useState(0);
    const [questionNum, setquestionNum] = useState(1) // react hook
    const [quizJSON, setquizJSON] = useState(null)

    const handleJSONchange = (keyName, newValue) => {
        console.log("inside func")

        if (quizJSON == null) {
            let j = { [keyName]: newValue }; // Use computed property syntax to set the key dynamically
            setquizJSON(JSON.stringify(j));
        } else {
            newvar = JSON.parse(quizJSON);
            newvar[keyName] = newValue;
            console.log(newvar)

        }
           
    };

    // const handleButtonClick = () => {
    //     // Update JSON file
    //     updateJSONFile(sliderValue);
    // };
    // Function to update JSON file
    const updateJSONFile = (newValue) => {

        // Write JSON data to file (this is a simplified example, in reality, you would handle file I/O properly)
        // You may want to fetch a remote API endpoint to handle this operation
        // Here, I'm assuming you have a backend endpoint '/updateSpiceLevel' that handles writing to the JSON file
        fetch('http://localhost:8888/api/quizdata', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ "spiceLevel" : newValue })
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
        {
        questionNum === 1 &&
        <>
        <ButtonAppBar />
        {/* This is p */}
        <AITextField />
        <DiscreteSlider value={sliderValue} onChange={(event, sliderValue) => handleJSONchange("spiceLevel", sliderValue)} />
         {/* Pass handleButtonClick function to the SubmitBt component */}
         <SubmitBt onClick={() => setquestionNum(questionNum+1)} />
         </>
        
        }
        </>

        // next question

    )
}

export default Quiz
