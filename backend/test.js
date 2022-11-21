const express = require("express");
const app = express();
const port = 4000;

const middleware = (req, res, next) => {
  if (true) return next("Error");
};

app.get("/error", middleware, (req, res) => {
  try {
    res.send("Success");
  } catch (err) {
    res.send(err);
  }
});
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
