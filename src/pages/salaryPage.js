import axios from 'axios'
import React  from 'react';

import { useState } from 'react';
import { Select, Box,Stack, Slider, FormControl, MenuItem, InputLabel } from '@mui/material'
import '../styles/salaryPage.css';

function SalaryPredict() {
  const [product, setProduct] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const countryData = ['Sweden', 'Spain', 'Germany', 'Turkey', 'Canada', 'France', 'Switzerland', 'United Kingdom of Great Britain and Northern Ireland', 'Russian Federation', 'Israel', 'Ukraine', 'United States of America', 'Brazil', 'Other', 'Italy', 'Netherlands', 'Poland', 'Austria', 'India', 'Australia', 'Belgium', 'Iran, Islamic Republic of...', 'Denmark', 'Finland', 'Norway', 'Mexico']
  let content = null

/**
 * The function takes in the user's input and sends it to the backend. The backend then returns a
 * prediction and the prediction is displayed on the frontend
 * @param e - event
 */
  const handleSubmit = (e) => {
    e.preventDefault()
    const params = { country, education, experience }

    axios
      .post('http://localhost:8080/prediction/', params)
      .then((res) => {
        setProduct(res.data.data)        
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }
  if(product){
    let salary = currencyFormat(product.prediction)
    content = <div><h2>Yearly: {salary}</h2></div>
  }

/**
 * It takes a number, converts it to a string, adds a dollar sign to the beginning, and adds commas to
 * the thousands place
 * @param num - The number to be formatted.
 * @returns the number with a dollar sign in front of it and the number is rounded to the nearest
 * hundredth.
 */
  function currencyFormat(num) {
   return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}



  return (
    <div style={{
      position: 'absolute', left: '50%', top: '25%',
      transform: 'translate(-50%, -50%)'}}>
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <div class="form-container">
        <form class="register-form" onSubmit={(e) => handleSubmit(e)} >
        <Stack spacing={2}>
        <FormControl >
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select onChange={(e) => setCountry(e.target.value)}>
            {countryData.map((value) => {
              return <MenuItem value={value}>{value}</MenuItem>
            })}
          </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Latest Degree</InputLabel>
            <Select onChange={(e) => setEducation(e.target.value)}>
              <MenuItem value={'Less than a Bachelors'}>Less than a Bachelors</MenuItem>
              <MenuItem value={'Bachelor’s degree'}>Bachelor’s degree</MenuItem>
              <MenuItem value={'Master’s degree'}>Master’s degree</MenuItem>
              <MenuItem value={'Post grad'}>Post grad degree</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <p>Year Experience</p>
          <Slider 
            onChange={(e) => setExperience(e.target.value)}
            min={1}
            max={50}
            defaultValue={5} aria-label="Default" valueLabelDisplay="auto" 
            />
          </FormControl>
          <button class="form-field" type="submit">
          Predict
        </button>
        {content}
          </Stack>
        </form>
        </div>
        </Box>
      </div>
    );
}

export default SalaryPredict;