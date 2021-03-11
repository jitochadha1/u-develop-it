const sqlite3 = require('sqlite3').verbose();

const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('connected to the election database.');
});

// db.all(`SELECT * FROM candidates`, (err, rows) => {
// console.log(rows);
// });

//Get a single candidate
db.get(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// Delete a candidate
// db.run(`DELETE FROM candidates WHERE id=?`, 1, function (err, result) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result, this, this.changes);
// });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
                VALUES(?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
// ES5 function, not arrow function, to use this
db.run(sql, params, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result, this.lastID);
});


//Default response for any other requests(Not found) Catch all
app.use((req, res) => {
    res.status(404).end();
});

//Function to start express.js server on port 3001 after databse connection established
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});
