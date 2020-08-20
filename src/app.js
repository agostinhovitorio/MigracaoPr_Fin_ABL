const app = require('express')();
const client = require('./routes/client');
const bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use('/api', client);

app.listen(3001, () => {
    console.log("API RODANDO");
});