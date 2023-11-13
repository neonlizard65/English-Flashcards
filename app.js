const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set("view engine", 'ejs');

app.get("/", function (req, res) {
    res.render('index.ejs');
});

app.get("/flash", function (req, res) {
    res.render('flash.ejs');
});

app.get("/result", function (req, res) {
    res.render('result.ejs');
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
