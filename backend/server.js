const express = require("express");
const cors = require('cors');
const http = require("http");
const axios = require("axios");
const bodyParser = require("body-parser");
const connectDB = require('./connectDB');
const { Server } = require("socket.io");
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);

// Socket server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow only your React app's origin
        methods: ['GET', 'POST'],
        credentials: true                // Allow cookies and other credentials
    }
});

let allContacts = [];

// Handle Alert Function
async function handleAlert() {
    try {
        const db = mongoose.connection;

        // List of login collection names
        const loginCollections = ['generalpublicloginschemas', 'emergencyrespondersloginschemas', 'governmentauthoritiesloginschemas'];

        for (const collectionName of loginCollections) {
            // Get the collection
            const collection = db.collection(collectionName);

            // Find all documents and project only the 'contact' field
            const contacts = await collection.find({}, { projection: { contact: 1, _id: 0 } }).toArray();

            // Extract contacts and push them to the allContacts array
            allContacts = allContacts.concat(contacts.map(doc => doc.contact));
        }

        console.log('All contacts:', allContacts);
    } catch (error) {
        console.error('Error retrieving contacts:', error);
    }
}

// WebSocket initialization
io.on("connection", (socket) => {
    console.log("Socket.io client connected:", socket.id);

    // Receive message from client
    socket.on("client-message", (message) => {
        console.log("Message from client:", message);

        if (message === "Alert") {
            handleAlertMsg();
        }

        // Ensure message is sent as an array or in the expected format
        io.emit("message", message); // Wrap in an array if it's not one
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("Socket.io client disconnected:", socket.id);
    });
});

// Function to handle sending alerts via SMS


// Start Express server after MongoDB connection

    const uri = "mongodb+srv://akhileshpimple3:ytYxoa3so6WZxoxF@cluster-glof.cxbkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-glof";       
    connectDB.connectToDB(uri)
        .then(() => {
            console.log("DB connected");
            handleAlert(); // Only call handleAlert after DB connection
            const PORT = process.env.PORT || 3000;
            server.listen(PORT, () => {
                console.log('Server is running on http://localhost:4000');
            });
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB', error);
        });

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// API requests from frontend
app.get("/api/msg", (req, res) => {
    res.json({ msg: "hello" });
});

app.get("/api/weatherData/:place", async (req, res) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=87d09b2a950c4a63a0c83743240409&q={${req.params.place}}&aqi=yes`);
        console.log("resp = ", response.data);
        res.json(response.data);
    } catch (err) {
        console.log("Error occurred: ", err);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.post("/api/alert/:msg", async (req, res) => {
    const data = req.params;
    console.log("Data = ", data);
    if (data && data.msg === "Alert") {
        handleAlertMsg();
        res.json({ msg: "Got Alert" });
    } else {
        res.json({ msg: "No Alert" });
    }
});



// DataBase connection
// connectDB.connectToDB(process.env.MONGODB ?? "mongodb://127.0.0.1:27017/GLOFMAS")
//     .then(() => {
//         console.log("DB connected");
//     });



app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const { handleEmergencyRespLogIn,
    handleEmergencyRespValidation,
    handleGenralPublicLogIn,
    handleGenralPublicValidation,
    handleGovernmentAuthLogin,
    handleGovernmentAuthValidation, } = require("./controllers/UserData");

// API requests from frontend
// app.use(cors({
//     origin: 'http://localhost:5173', // Allow only your React app's origin
//     methods: ['GET', 'POST'],        // Allow specific HTTP methods
//     credentials: true                // Allow cookies and other credentials
// }));

app.get("/api/msg", (req, res) => {
    res.json({ msg: "hello" });
});

app.get("/api/weatherData/:place", async (req, res) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=87d09b2a950c4a63a0c83743240409&q={${req.params.place}}&aqi=yes`);
        console.log("resp = ", response.data);
        res.json(response.data);
    } catch (err) {
        console.log("Error occurred: ", err);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.post("/api/general-public-singup/login-data", async (req, res) => {
    try {
        const data = req.body;
        const result = await handleGenralPublicLogIn(data)
        console.log(result);
        res.json({ msg: "done" })
    } catch (error) {
        console.log("Error msg = ", error)
    }
})

app.post("/api/general-public-validation/data", async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const result = await handleGenralPublicValidation(data)
        console.log(result);
        if (data.location === result.location) {

            res.json({ msg: "done" })
        }
    } catch (error) {
        console.log("Error msg = ", error)
    }
})

app.post("/api/government-auth-singup/login-data", async (req, res) => {
    try {
        const data = req.body;
        const result = await handleGovernmentAuthLogin(data)
        console.log(result);
        res.json({ msg: "done" })
    } catch (error) {
        console.log("Error msg = ", error)
    }
})

app.post("/api/government-auth-validation/data", async (req, res) => {
    try {
        const data = req.body;
        const result = await handleGovernmentAuthValidation(data)
        console.log(result);
        res.json({ msg: "done" })
    } catch (error) {
        console.log("Error msg = ", error)
    }
})

app.post("/api/emergency-resp-singup/login-data", async (req, res) => {
    try {
        const data = req.body;
        const result = await handleEmergencyRespLogIn(data)
        console.log(result);
        res.json({ msg: "done" })
    } catch (error) {
        console.log("Error msg = ", error)
    }
})

app.post("/api/emergency-resp-validation/data", async (req, res) => {
    try {
        const data = req.body;
        const result = await handleEmergencyRespValidation(data)
        console.log(result);
        res.json({ msg: "done" })
    } catch (error) {
        console.log("Error msg = ", error)
    }
})
