
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const apyController = require("./app/controllers/apys");
var corsOptions = {
  origin: "*"
};

const app = express();
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/computed-apys', apyController.getAPYS);
  
setInterval(() => {
  apyController.calculateAndSave();
}, 30000);


const server = http.createServer(app);

const PORT = process.env.PORT || 6000;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
