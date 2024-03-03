const express = require('express');
require("dotenv").config();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');;
const studentRoutes = require('./routes/studentRoutes'); // Import the student routes
const eventRoutes = require('./routes/eventRoutes.js'); // Import the event routes
const accoRoutes = require('./routes/AccoRoutes.js'); // Import the accommodation routes
const accomodationRoutes = require('./routes/accomodationRoutes');
const app = express();


app.use(express.json());

app.use(express.json());
app.use(morgan('dev'));

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(cookieParser());
app.use('/api/student/auth', studentRoutes);
app.use('/api/student/events', eventRoutes);
// app.use('/api/student/accommodation', accoRoutes);
app.use("/api/student/accomodations", accomodationRoutes);
// app.use('api/student/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
