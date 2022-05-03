const express = require('express');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser')
const { APP_PORT, DB_URL } = require('./configg/index');

const managerRoutes = require('./src/routes/managerRoutes');
const employeeRoutes = require('./src/routes/employeeroute')

const errorHandler = require('./src/middleware/errorHandler');

const mongoose = require('mongoose');

/* ----------------------------------------- CORS ----------------------------------------- */
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}))
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

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

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

app.use("/api/manager", managerRoutes); 
app.use("/employee",employeeRoutes) // manager Routes
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