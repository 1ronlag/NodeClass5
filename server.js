const express = require("express");
const app = express();
const cors = require("cors");

const { reportRequest } = require("./src/middlewares/logger")

app.use(cors());
app.use(reportRequest);
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor encendido en puerto ${port}`);
});


module.exports = app;
