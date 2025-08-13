import React, { useState } from 'react'
import cloud from '../component/cloud.png'
import rain from '../component/rain.png'
import haze from '../component/haze.jpg'
import clear from '../component/clear.png'
import mist from '../component/mist.png'
import err from '../component/err.png'
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
const Myfile = () => {
  const api_key ="61f31c2748b39a6a81a564bbc51e2106";
  const api = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
   const[search , setSearch]= useState("");
   const[stcode , setStcode] =useState("")
   const[data, setData] = useState();
   const [error, setError] = useState("")
   const handleInput =(event) => {
    setSearch(event.target.value)
    setStcode(event.target.value)
    console.log(event.target.value);
   }

  const btnClick = async() =>{
    const  get =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&units=matric`);
    const jsonData = await get.json()
    console.log(jsonData);
    setData(jsonData);
    if(search===""){
      //alert('Please Enter City/ Country Name');
      setError('Please Enter a valid City/state/Country Name');
    }
    else if (jsonData.cod == '404'){
      setError('Please enter a valid  place name');
    }
    else{
      setError("");
    }
    setSearch("")
  }

 
  return (
    <><div className='main'>
      <div className='left-container'>
        <h1>your daily <br></br>forcast</h1>
        <p>Live weather conditions, accurate forecasts, and updates</p>
      </div>
    
     <div className='container'>
      <h4>Find Today's Weather</h4>
        <div className='input'>
            <input placeholder='Enter City, State...' value={search}  onChange={handleInput}></input>
            <button type='submit' onClick={btnClick}><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="white" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>
        </div><hr className='border-black'></hr>
        {
          error ?  <div className='error'>
            <h2>{error}</h2>
            <img src= 'https://www.creativefabrica.com/wp-content/uploads/2022/03/13/No-data-empty-data-concept-illustration-Graphics-27069974-1.png' width='250' height='250' ></img>
            </div>: " "
        }
      
    { data && data.weather ? 
         <div className='content'>
            <h2>{data.name}</h2>
           
            <img  src={
        data.weather[0].main === "Clouds"
          ? cloud
          : data.weather[0].main === "Rain"
          ? rain
          : data.weather[0].main === "Haze"
          ? haze
          : data.weather[0].main === "Mist"
          ? mist
          : data.weather[0].main === "Clear"
          ? clear
          : ""
      } ></img>
          
           
            <h1>{Math.trunc(data.main.temp)} °C</h1>
            <h2>{data.weather[0].description}</h2>
        </div>: '' 
    }
    </div>
    </div>
    </>
   
  )
}

export default Myfile
