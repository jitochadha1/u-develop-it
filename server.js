const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Default response for any other requests(Not found) Catch all
app.use((req, res) => {
    res.status(404).end();
});

//Function to start express.js server on port 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

