const express = require("express");
const cors = require("cors");

const routes = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json());

routes.forEach((route) => {
  route.forEach((controller) =>
    app[controller.method](controller.path, controller.handler)
  );
});


app.listen(3000, () => {
  console.log("server started");
});
