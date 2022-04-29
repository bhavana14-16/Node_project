const express = require('express');
const app = express();

const { APP_PORT, DB_URL } = require('../Node_project/configg/index');

const managerRoutes = require('../Node_project/src/routes/managerRoutes');

const errorHandler = require('../Node_project/src/middleware/errorHandler');

const mongoose = require('mongoose');

/* ----------------------------------------- CORS ----------------------------------------- */

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

/* ----------------------------------------- CORS ----------------------------------------- */


/* ----------------------------------------- DATABASE CONNECTION ----------------------------------------- */

mongoose.connect(DB_URL, { useUnifiedTopology: true, useUnifiedTopology: true, useUnifiedTopology: false });

const db = mongoose.connection;
db.on('Database error => ', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
     console.log("Database Connected...!");
    //console.log(``);
});
/* ------------------------------------------------------------------------------------------------------- */

/* ------------------------ MIDDLEWARES ------------------------ */
app.use(express.json());
/* -------------------------------------------------------- */

/* ------------------------ ROUTES ------------------------ */

app.get('/', function (req, res) {
    res.send(' <h1> Backend !</h1>')
})

app.use("/api/manager", managerRoutes);  // manager Routes
/* -------------------------------------------------------- */

/*  Error Handler  */
app.use(errorHandler);  // Place your error handler after all other middlewares.
/* ---------------- */

/* ---------------------- APP Listen ---------------------- */

app.listen(APP_PORT, () => {
    console.clear();
    // console.log(`Server has started on port ${APP_PORT}. ______________________________`);
    console.log(`_____________________________________________`);
});

/* -------------------------------------------------------- */

module.exports = app;