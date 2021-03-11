const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require('path');
var filePath = "./public/index.html"
var resolvedPath = path.resolve(filePath);
console.log(resolvedPath);
return res.sendFile(resolvedPath);

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});
app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'PwaBudget\Develop\public\index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    })
    // routes
app.use(require("./Develop/routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});