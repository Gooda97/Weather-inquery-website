// Global Variables
const baseURLZip = "https://api.openweathermap.org/data/2.5/weather?zip=";
const baseURLCity = "https://api.openweathermap.org/data/2.5/weather?q=";

// The server URL
const host = "http://localhost:8050";

//personal API Key
const apiKey = '&units=metric&appid=b931303e7e66344d244c80fb26104956';

//elements will be used
const inputZip = document.getElementById('zip');
const inputCity = document.getElementById('cityName');
const btn = document.getElementById('generate');
const inputFeelings= document.getElementById("feelings");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'/'+d.getMonth()+1+'/'+ d.getFullYear();

//event listener on generate button
document.getElementById('generate').addEventListener('click', function extractInfo() 
{
    const zipCode = inputZip.value;
    const cityName = inputCity.value;
   //communicate with the API
   (async function()
      {
        if(zipCode!= "")
        {
          const result = await fetch(baseURLZip + zipCode + apiKey);
          try
          {
            const incomeData = await result.json();
            console.log(incomeData);
            const requiredData= getRequiredData(incomeData);
            return requiredData;
          }
          catch (error) 
          {
            console.log('Error: ',error);
          }
        
        }
        else if(cityName!= "")
        {
          const result= await fetch(baseURLCity + cityName + apiKey);
          try
          {
            const incomeData = await result.json();
            const requiredData= getRequiredData(incomeData);
            return requiredData;
          }
          catch (error) 
          {
            console.log('Error: ',error);
          }
        
        }
      }())
   .then((requiredData)=>{
       //post the data to the server
       (async function (){
          const res = await fetch(host+ '/putData', {
              method : 'POST',
              credentials : 'same-origin',
              headers : {
                  'Content-Type': 'application/json',
              },
              body : JSON.stringify(requiredData),
          });
          try{
              const finalData = await res.json();
              console.log(finalData);
              return(finalData);
          }
          catch(error){
              console.log("error", error);
          }
      }
       )()})
   //show the results on the page elements
   .then(()=>(async function(){
    const req = await fetch(host+ '/currentData');
    try{
        const savedData = await req.json();
        console.log(savedData);
        //show results on the elements
        document.getElementById("date").innerHTML = savedData.newDate;
        document.getElementById("city").innerHTML = savedData.city;
        document.getElementById("temp").innerHTML = savedData.temp + '&degC';
        document.getElementById("min").innerHTML = 'min: '+savedData.temp_min + '&degC';
        document.getElementById("max").innerHTML = 'max: '+savedData.temp_max + '&degC';
        document.getElementById("description").innerHTML = savedData.description;
        document.getElementById("content").innerHTML = savedData.feelings;
        document.getElementById('result').style.visibility = 'visible';
    }
    catch(error)
    {
        console.log("error", error);
    }
   })());
});

//extract required information from the api returned data
function getRequiredData(incomeData)
{
    const temp= incomeData.main.temp;
    const description= incomeData.weather[0].description;
    const temp_min= incomeData.main.temp_min;
    const temp_max= incomeData.main.temp_max;
    const city= incomeData.name;
    const feelings= inputFeelings.value;
    const requiredData= {newDate, temp, description, temp_min, temp_max, city, feelings};
    return requiredData;
}

// Make the button disabled at first
btn.disabled= true;

// Making the button disabled when both the zip and city inputs are empty
inputZip.addEventListener("input", function(){
  btn.disabled = (this.value === ''&&inputCity.value==='');
})

inputCity.addEventListener("input", function(){
  btn.disabled = (this.value === ''&&inputZip.value==='');
})

// Making the city name input disabled when the zip input isn't empty
inputZip.addEventListener("input", function(){
  inputCity.disabled = !(this.value === '');
})

// Making the zip input disabled when the city name input isn't empty
inputCity.addEventListener("input", function(){
  inputZip.disabled = !(this.value === '');
})

// Function to clear all the inputs when the page is reloaded
function clearInp() 
{
  const inputs=document.getElementsByTagName("input");
  for (let ip of inputs)
  {
    ip.value='';
  }
}

// Function to clear the results when clicking the x button
function clearResult()
{
  document.getElementById('result').style.visibility = 'hidden';
}