import './App.css';
import axios from 'axios';
import { Button, Grid} from '@mui/material'
import { useState } from 'react';
import { Display } from './components/Display';

function App() {

    axios.defaults.baseURL = "";
    const [selected, setSelected] = useState({});
    const [result, setResult] = useState({});
    const [flight, setFlight] = useState([{
      flightnumber: 0,
      missionName: "",
      launchDateUTC: ""
    }]);

  

    function getApiData(e){
      e.preventDefault();
      axios.get(`https://api.spacexdata.com/v2/launches`).then(data => {
        console.log(data)
        setResult(() => data.data)
        alert("Fetch Successful Please Click Display")
      }).catch(error => {
        console.error(error)
        setResult(() => error)
        alert("Fetch Failed")
      })
    }

    function setFlightData(){

      result.forEach(element => {
        setFlight(flights => [...flights, {
          "flight_number": element.flight_number,
          "mission_name": element.mission_name,
          "upcoming": element.upcoming,
          "launch_year": element.launch_year,
          "launch_date_local": element.launch_date_local,
          "rocket": element.rocket,
          "launch_site": element.launch_site,
          "launch_success": element.launch_success,
          "launch_failure_details":element.launch_failure_details,
          "links": element.links,
          "details": element.details,
                   
        }])
    });

    console.log(result)
    }

    function showData(index){
      console.log(flight[index])
      setSelected(flight[index])
    }

  return (
    <div className="App">
      <h1> Space X Launches</h1>
        <Button 
          type="submit"
          variant="contained"
          color="error"
          onClick={getApiData}
        >Fectch Data</Button>
        <Button 
          type="submit"
          variant="contained"
          color="error"
          onClick={setFlightData}
        >Display</Button>    
      <div className='btnGrid'>
        <Grid container>
        {
          flight.map((item, index) => {
            if(index === 0){
              return <div></div>
            }
            return <Grid item spacing="2">
              <Button 
                type="submit"
                variant="contained"
                color="success"
                onClick={() => {
                  showData(index)
                }}
              >{item.flight_number}</Button>
            </Grid>
          })
        }
        </Grid>
        
      </div>
     {
      selected.links ? <Display selected={selected}/> : ""
     }
    </div>
  );
}

export default App;