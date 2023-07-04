var express = require("express");
var app = express();
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// This is REQUIRED for IISNODE to work
app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});

app.use(express.static(__dirname + '/')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "mann-mohit-cyberaxy-mobot",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false
    }
}));
