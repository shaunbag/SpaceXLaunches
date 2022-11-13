import {Grid} from '@mui/material'

export function Display(props){

    return(
        <div>
        <div>
            <h2>Flight: {props.selected.flight_number} Mission {props.selected.mission_name}</h2>
            <div>
                <img alt="nothing" src={props.selected.links ? props.selected.links.mission_patch_small : ""}></img>
            </div>
            <Grid container>
                <Grid item xs={3}>
                    <p className='text'>Is Upcoming: <span className="redTxt">{String(props.selected.upcoming)}</span></p>
                </Grid>
                <Grid item xs={3}>
                    <p className='text'>Date: <span className="redTxt">{props.selected.launch_date_local}</span></p>
                </Grid>
                <Grid item xs={3}>
                    <p className='text'>Launch site: <span className="redTxt">{props.selected.launch_site ? props.selected.launch_site.site_name_long : ""}</span></p>
                </Grid>
                <Grid item xs={3}>
                    <p className='text'>Was Launch a success: <span className="redTxt">{String(props.selected.launch_success)}</span></p>
                </Grid>
            </Grid>


            

            <h1>Video</h1>
            <div className="video-responsive">
                <iframe
                    width="100%"
                    height="615"
                    src={props.selected.links ? `https://www.youtube.com/embed/` + (props.selected.links.youtube_id) : ""}
                    allowFullScreen
                    title="embedded video" />
                    <p className='detailText'>{props.selected.details}</p>
            </div>
            <div className='text'>
                {props.selected.launch_failure_details ? <p>Failure Details: <span className="redTxt">{props.selected.launch_failure_details ? props.selected.launch_failure_details.reason : ""}</span></p> : ""}
            </div>
            <h1>Images</h1>
            <Grid container>
                {props.selected.links ? props.selected.links.flickr_images.map(item => {
                    return <Grid>
                        <a href={item} target="_blank" rel="noreferrer">
                            <img width="300px" alt="not found" src={item}></img>
                        </a>

                    </Grid>

                }) : ""}
            </Grid>
            <hr />
            <h1>Technical Details</h1>
            <h2>Engine Details</h2>
            <Grid container>
                <Grid item xs={4}>
                    <p className='text'>Rocket Name: <span className="redTxt">{props.selected.rocket ? props.selected.rocket.rocket_name : ""}</span></p>
                </Grid>
                <Grid item xs={4}>
                    <p className='text'>Rocket Type: <span className="redTxt">{props.selected.rocket ? props.selected.rocket.rocket_type : ""}</span></p>
                </Grid>
                <Grid item xs={4}>
                    <p className='text'>Rocket Id: <span className="redTxt">{props.selected.rocket ? props.selected.rocket.rocket_id : ""}</span></p>
                </Grid>
            </Grid>
            <h3 className='ngTitle'>First Stage: </h3>
            <Grid container
                spacing={2}
                justifyContent="center"
                alignItems="center">
                {props.selected.rocket ? props.selected.rocket.first_stage.cores.map((item) => {
                    return <Grid item className='gridText'>
                        <h3>Core Serial: <span className="prplTxt">{item.core_serial}</span></h3>
                        <p>Land Success: <span className="prplTxt">{String(item.land_success)}</span></p>
                        <p>Landing Intent: <span className="prplTxt">{String(item.landing_intent)}</span></p>
                        <p>Landing Type: <span className="prplTxt">{item.landing_type}</span></p>
                        <p>Landing Vehicle: <span className="prplTxt">{item.landing_vehicle}</span></p>
                        <p>Legs: <span className="prplTxt">{String(item.legs)}</span></p>
                        <p>Reused: <span className="prplTxt">{String(item.reused)}</span></p>
                    </Grid>
                }) : ""}
            </Grid>
            <h3 className='ngTitle'>Second Stage: </h3>
            <Grid container
                spacing={2}
                justifyContent="center"
                alignItems="center">
                {props.selected.rocket ? props.selected.rocket.second_stage.payloads.map((item) => {
                    return <Grid item className='gridText'>
                        <h3>Cargo Manifest: <a href={item.cargo_manifest} target="_blank" rel="noreferrer">{item.cargo_manifest}</a></h3>
                        <p>Customers: {item.customers.map((item) => {
                            return <span className="prplTxt">{item + ", "}</span>
                        })}</p>
                        <p>Manufacturer: <span className="prplTxt">{item.manufacturer}</span></p>
                        <p>Nationality: <span className="prplTxt">{item.nationality}</span></p>
                        <p>Orbit: <span className="prplTxt">{item.orbit}</span></p>
                        <p>Payload Mass Kg: <span className="prplTxt">{item.payload_mass_kg}</span></p>
                        <p>Payload Type: <span className="prplTxt">{item.payload_type}</span></p>
                        <p>Reused: <span className="prplTxt">{String(item.reused)}</span></p>
                    </Grid>
                }) : ""}
            </Grid>

            </div><h1>Full JSON Response from Space X</h1><hr /><div className='Results'>

                <pre>{JSON.stringify(props.selected, null, 6)}</pre>
            </div>
            </div>
    )
}

