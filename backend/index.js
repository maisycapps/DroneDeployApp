const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());


//access API KEY
const dotenv = require("dotenv")
dotenv.config()

//Open AI setup
const OpenAI = require('openai')
const openai = new OpenAI(process.env.OPENAI_API_KEY);

//provided drone datasets
const data = [
    {
        "image_id": "001",
        "timestamp": "2024-09-24 14:31:05",
        "latitude": "44.4280° N",
        "longitude": "110.5885° W",
        "altitude_m": 50,
        "heading_deg": 270,
        "file_name": "YNP_001.jpg",
        "camera_tilt_deg": -15,
        "focal_length_mm": 24,
        "iso": 100,
        "shutter_speed": "1/500",
        "aperture": "f/2.8",
        "color_temp_k": 5600,
        "image_format": "RAW+JPEG",
        "file_size_mb": 25.4,
        "drone_speed_mps": 5.2,
        "battery_level_pct": 98,
        "gps_accuracy_m": 0.5,
        "gimbal_mode": "Follow",
        "subject_detection": "Yes",
        "image_tags": ["Geyser", "Steam"]
        },
        {
        "image_id": "002",
        "timestamp": "2024-09-24 14:33:22",
        "latitude": "44.4279° N",
        "longitude": "110.5890° W",
        "altitude_m": 75,
        "heading_deg": 180,
        "file_name": "YNP_002.jpg",
        "camera_tilt_deg": -30,
        "focal_length_mm": 35,
        "iso": 200,
        "shutter_speed": "1/1000",
        "aperture": "f/4",
        "color_temp_k": 5200,
        "image_format": "RAW+JPEG",
        "file_size_mb": 27.1,
        "drone_speed_mps": 3.8,
        "battery_level_pct": 95,
        "gps_accuracy_m": 0.6,
        "gimbal_mode": "Free",
        "subject_detection": "No",
        "image_tags": ["Forest", "River"]
        },
        {
        "image_id": "003",
        "timestamp": "2024-09-24 14:36:47",
        "latitude": "44.4275° N",
        "longitude": "110.5888° W",
        "altitude_m": 100,
        "heading_deg": 90,
        "file_name": "YNP_003.jpg",
        "camera_tilt_deg": 0,
        "focal_length_mm": 50,
        "iso": 400,
        "shutter_speed": "1/2000",
        "aperture": "f/5.6",
        "color_temp_k": 5800,
        "image_format": "RAW+JPEG",
        "file_size_mb": 26.8,
        "drone_speed_mps": 2.5,
        "battery_level_pct": 91,
        "gps_accuracy_m": 0.4,
        "gimbal_mode": "Tripod",
        "subject_detection": "Yes",
        "image_tags": ["Wildlife", "Elk"]
        },
        {
        "image_id": "004",
        "timestamp": "2024-09-24 14:40:13",
        "latitude": "44.4277° N",
        "longitude": "110.5882° W",
        "altitude_m": 120,
        "heading_deg": 0,
        "file_name": "YNP_004.jpg",
        "camera_tilt_deg": -45,
        "focal_length_mm": 70,
        "iso": 800,
        "shutter_speed": "1/4000",
        "aperture": "f/8",
        "color_temp_k": 6000,
        "image_format": "RAW+JPEG",
        "file_size_mb": 28.3,
        "drone_speed_mps": 1.2,
        "battery_level_pct": 87,
        "gps_accuracy_m": 0.7,
        "gimbal_mode": "Follow",
        "subject_detection": "No",
        "image_tags": ["Canyon", "Waterfall"]
        },
        {
        "image_id": "005",
        "timestamp": "2024-09-24 14:44:56",
        "latitude": "44.4282° N",
        "longitude": "110.5879° W",
        "altitude_m": 80,
        "heading_deg": 315,
        "file_name": "YNP_005.jpg",
        "camera_tilt_deg": -10,
        "focal_length_mm": 24,
        "iso": 100,
        "shutter_speed": "1/250",
        "aperture": "f/2.8",
        "color_temp_k": 5400,
        "image_format": "RAW+JPEG",
        "file_size_mb": 24.9,
        "drone_speed_mps": 6.7,
        "battery_level_pct": 82,
        "gps_accuracy_m": 0.5,
        "gimbal_mode": "Free",
        "subject_detection": "Yes",
        "image_tags": ["Thermal Pool", "Bacteria"]
        }
];

//route for axios call 
app.get('/drone-data', (req, res) => {
    res.json(data);
})

app.post('/ask-openAI', (req, res) => {

    const query = req.body
    console.log("received prompt on backend", query)


    //formatting data for AI query

    const formatData = data.map((x) => `Image ID: ${x.image_id}, Timestamp: ${x.timestamp}, Latitude: ${x.latitude}, Longitude: ${x.longitude}, Altitude: ${x.altitude_m} m., Heading: ${x.heading_deg} deg., File Name: ${x.file_name}, Camera Tilt: ${x.camera_tilt_deg} deg., Focal Length: ${x.focal_length_mm} mm., ISO: ${x.iso}, Shutter Speed: ${x.shutter_speed}, Aperture: ${x.aperture}, Color Temperature: ${x.color_temp_k} k., Image Format: ${x.image_format}, File Size: ${x.file_size_mb} mb., Drone Speed: ${x.drone_speed_mps} mps., Battery Level: ${x.battery_level_pct} pct., GPS Accuracy: ${x.gps_accuracy_m} m., Gimbal Mode: ${x.gimbal_mode}, Subject Detection: ${x.subject_detection}, Image Tags: ${x.image_tags[0]}, ${x.image_tags[1]}`)

    const queryData = formatData.join(". ")

    const prompt = [query, "?", " Craft a relevant response based on this dataset:"].concat(queryData)

    try {
        const askOpenAI = async(prompt) => { 
            console.log("askOpenAI Prompt", prompt)
            const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: [{ type: "text", content: `${prompt}` }],
                },
                ],
            })
            console.log("openAI response:", completion)
            const answer = await completion.choices[0].message.content
            res.json(answer)
        }
         askOpenAI(prompt)
        
    } catch (error) {
        console.error("Error processing Open AI request:", error.message)
        res.status(500)
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});