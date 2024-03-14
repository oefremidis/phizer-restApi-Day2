const express = require('express');
const router = require('./routes/route');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json())

// Allow all
// app.use(cors());

const whitelist = [];
// const whitelist = ['https://www.google.com', 'http://localhost'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) != -1 || !origin){ //remove for production
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/', router);

app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server runs at ${PORT}`));