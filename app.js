const express = require('express')
const path = require("path");
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Some info from package.json
const package_json = require('./package.json')
CODE_REPOSITORY = package_json.repository && package_json.repository.url ? package_json.repository.url : package_json.repository;
const AUTHOR_NAME = package_json.author && package_json.author.name ? package_json.author.name : "";
const AUTHOR_URL = package_json.author && package_json.author.url ? package_json.author.url : "";
const ISSUE_TRACKER = package_json.bugs;
NEW_ISSUE_URL = ISSUE_TRACKER ? `${ISSUE_TRACKER.replace(/\/$/, "")}/new` : '';

const PORT = 3000

var app = express(module.exports);
app.disable('x-powered-by');
app.set("views", "./views");
app.set("view engine", "ejs");

var homeRouter = require("./routes/home");
var jwtRouter = require("./routes/jwt");
var demoRouter = require("./routes/demo");
var lessonRouter = require("./routes/lesson");

app.use('/docs', express.static('docs'));
app.use(express.static(path.join(__dirname, "public")));

// support parsing of application/json type post data
app.use(express.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

//Utility to identify content type

app.use(function(req, res, next){
    if (!req.get('Content-Type') || req.get('Content-Type').indexOf('application/json') === -1) {
        req.wantsJson = false;
    } else  {
        req.wantsJson = true;
    }
    console.debug(new Date().toString() + "Requested :: ", req.method, req.url);
    console.debug(req.headers)
    next();
})

// app.use(cors());

//Using explicit header settings for cors instead of cors package to make it easier to understand what exaxtly we are doing
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use("/", homeRouter);
app.use("/jwt", jwtRouter);
app.use("/demo", demoRouter);
app.use("/lesson", lessonRouter);

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
})