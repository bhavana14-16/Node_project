
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");
//const authJwt = require("./src/handler/jwt.handler");
//const errorHandler = require("./src/handler/error-handler");

app.use(cors());
//app.options("*", cors()); 
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

//middleware
app.use(express.json());
app.use(morgan("tiny"));
//app.use(authJwt());
//app.use(errorHandler);

require("./database/connection")

// const Product = require("./src/models/product")
 const Employee = require("./database/models/employee");
 const Project = require("./database/models/project");

const port = process.env.PORT || 3001;

// const router1 = require("./src/routes/productRoute");
 const router = require("./src/routes/employeeroute");
 const router1 = require("./src/routes/projectroute");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const api = process.env.API_URL;
//post

// app.use("/product", router1);
 app.use("/employee", router);
 app.use("/project", router1);

app.listen(port, () => {
    console.log("connection running on 3001");
})