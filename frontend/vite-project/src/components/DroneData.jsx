import React from "react";

const DroneData = ({ data }) => {
    return ( 
    <>
        <section className="droneData">
            <h3>Drone Datasets</h3>
            <div className="cards">
                {data.map((drone) => (  
                    <ul className="card" key={drone.image_id}>
                        <li className="cardData">image id: {drone.image_id}</li>
                        <li className="cardData">timestamp: {drone.timestamp}</li>
                        <li className="cardData">latitude: {drone.latitude}</li>
                        <li className="cardData">longitude: {drone.longitude}</li>
                        <li className="cardData">altitude: {drone.altitude_m}</li>
                        <li className="cardData">heading: {drone.heading_deg} deg.</li>
                        <li className="cardData">file name: {drone.file_name}</li>
                        <li className="cardData">camera tilt: {drone.camera_tilt_deg} deg.</li>
                        <li className="cardData">focal length: {drone.focal_length_mm} mm.</li>
                        <li className="cardData">ISO: {drone.iso}</li>
                        <li className="cardData">shutter speed: {drone.shutter_speed}</li>
                        <li className="cardData">aperture: {drone.aperture}</li>
                        <li className="cardData">color temperature: {drone.color_temp_k} k.</li>
                        <li className="cardData">image format: {drone.image_format}</li>
                        <li className="cardData">file size: {drone.file_size_mb} mb.</li>
                        <li className="cardData">drone speed: {drone.drone_speed_mps} mps.</li>
                        <li className="cardData">battery level: {drone.battery_level_pct} pct.</li>
                        <li className="cardData">gps accuracy: {drone.gps_accuracy_m} m.</li>
                        <li className="cardData">gimbal mode: {drone.gimbal_mode}</li>
                        <li className="cardData">subject detection: {drone.subject_detection}</li>
                        <li className="cardData">image tags: {drone.image_tags[0]}, {drone.image_tags[1]}</li>
                    </ul>  
                    )
                )}
            </div>
        </section>
    </>
    );
}
 
export default DroneData;