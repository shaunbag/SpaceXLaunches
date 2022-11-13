import './App.css';
import axios from 'axios';
import { Button, Grid} from '@mui/material'
import { useState } from 'react';

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
      <h1> Space X Planned Launches</h1>
        <Button 
          type="submit"
          variant="contained"
          color="error"
          onClick={getApiData}
        >Update</Button>
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
      <div >
          <h2>Flight : {selected.flight_number} Mission {selected.mission_name}</h2>
          <div>
            <img alt="nothing" src={selected.links ? selected.links.mission_patch_small : "" } ></img>
          </div>
          <Grid container>
            <Grid item xs={3}>
              <p className='text'>Is Upcoming: <span className="redTxt">{String(selected.upcoming)}</span></p>
            </Grid>
            <Grid item xs={3}>
            <p className='text'>Date: <span className="redTxt">{selected.launch_date_local}</span></p>
            </Grid>
            <Grid item xs={3}>
            <p className='text'>Launch site: <span className="redTxt">{selected.launch_site ? selected.launch_site.site_name_long : ""}</span></p>
            </Grid>
            <Grid item xs={3}>
            <p className='text'>Was Launch a success:  <span className="redTxt">{String(selected.launch_success)}</span></p>
            </Grid>
          </Grid>
          
          
          <p className='text'>{selected.details}</p>

          <h1>Video</h1>
          <div className="video-responsive">
            <iframe
              width="100%"
              height="615"
              src={selected.links ? `https://www.youtube.com/embed/` + (selected.links.video_link.replace("https://www.youtube.com/watch?v=", "")) :""}
              allowFullScreen
              title="embedded video"
            />
          </div>
          <div className='text'>
            {selected.launch_failure_details ? <p>Failure Details: <span className="redTxt">{selected.launch_failure_details ? selected.launch_failure_details.reason : ""}</span></p> : ""}
          </div>
          <h1>Images</h1>
          <Grid container>
            {
              selected.links ? selected.links.flickr_images.map(item => {
                return <Grid>
                    <img width="300px" alt="not found" src={item}></img>
                </Grid> 
               
              }) : ""
            }
          </Grid>
            <hr/>
          <h1>Technical Details</h1>
          <h2>Engine Details</h2>
          <Grid container>
             <Grid item xs={4}>
                <p className='text'>Rocket Name: <span className="redTxt">{selected.rocket ? selected.rocket.rocket_name : ""}</span></p>
             </Grid> 
             <Grid item xs={4}>
                <p className='text'>Rocket Type: <span className="redTxt">{selected.rocket ? selected.rocket.rocket_type: ""}</span></p>
             </Grid>
             <Grid item xs={4}>
                <p className='text'>Rocket Id: <span className="redTxt">{selected.rocket ? selected.rocket.rocket_id : ""}</span></p>
             </Grid> 
          </Grid>
          <h3 className='ngTitle'>First Stage: </h3>
          <Grid container 
                spacing={2} 
                justifyContent="center"
                alignItems="center">
          {
            selected.rocket ? selected.rocket.first_stage.cores.map((item) => {
                return <Grid item className='gridText'>
                    <h3>Core Serial: <span className="prplTxt">{item.core_serial}</span></h3>
                    <p>Land Success: <span className="prplTxt">{String(item.land_success)}</span></p>
                    <p>Landing Intent: <span className="prplTxt">{String(item.landing_intent)}</span></p>
                    <p>Landing Type: <span className="prplTxt">{item.landing_type}</span></p>
                    <p>Landing Vehicle: <span className="prplTxt">{item.landing_vehicle}</span></p>
                    <p>Legs: <span className="prplTxt">{String(item.legs)}</span></p>
                    <p>Reused: <span className="prplTxt">{String(item.reused)}</span></p>
                </Grid>
          }) : ""
          }
          </Grid>
          <h3 className='ngTitle'>Second Stage: </h3>
          <Grid container 
                spacing={2} 
                justifyContent="center"
                alignItems="center">
          {
            selected.rocket ? selected.rocket.second_stage.payloads.map((item) => {
                return <Grid item className='gridText'>
                    <h3>Cargo Manifest: <a href={item.cargo_manifest} target="_blank">{item.cargo_manifest}</a></h3>
                    <p>Customers: {
                            item.customers.map((item)=> {
                                return <span className="prplTxt">{item + ", "}</span>
                            })
                      }</p>
                    <p>Manufacturer: <span className="prplTxt">{item.manufacturer}</span></p>
                    <p>Nationality: <span className="prplTxt">{item.nationality}</span></p>
                    <p>Orbit: <span className="prplTxt">{item.orbit}</span></p>
                    <p>Payload Mass Kg: <span className="prplTxt">{item.payload_mass_kg}</span></p>
                    <p>Payload Type: <span className="prplTxt">{item.payload_type}</span></p>
                    <p>Reused: <span className="prplTxt">{String(item.reused)}</span></p>
                </Grid>
          }) : ""
          }
          </Grid>
         
      </div>
      <h1>Full JSON Response from Space X</h1>
      <hr/>
      <div className='Results'>
        
          <pre>{JSON.stringify(selected, null, 6)}</pre>
      </div>
    </div>
  );
}

export default App;