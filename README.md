 # Weather Journal App Project

 ## Table of Contents
 - The project file contains a file server.js that contains the server side code.
 - The project file also contains "mySite" folder that contains:
    - app.js file that handles the communication with the API and getting the required data and control the changes in the page apperance.
    - index.html file that contains the structure of the web page.
    - style.css file that styles the page elements as required.
 
 ## Usage policy
 - You can enter the zip code of the city you want to get the weather (This works only for US, because we didn't add
   the country code for simplicity)
 - You can also write the city name instead of the zip code.
 - You won't be able to use both the zip code and the city name.
 - You won't be able to use the submit button when the fields of city name and zip code are empty.
 - In the case of entering the zip code or the city name uncorrectly , there will be no response on the page.
 - You can enter your description about the weather in the specified input element (if you want to).
 - If you want to clear the results you can click on the x button on the top right of the result area. 

## Received data
- The received data will be:
  - The city name.
  - The current temprature.
  - The minimum temprature along the day.
  - The maximum temprature along the day.
  - The weather description according to the API.
  - The description you entered will also appear.