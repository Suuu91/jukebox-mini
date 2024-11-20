const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}${req.originalUrl}`);
  next()
})

app.use("/users", require("./api/users"))

app.use((req, res, next) => {
  next ({
    status: 404,
    message: "Endpoint not found"
  })
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status ?? 500);
  res.message(err.message ?? "Something went wrong")
})

app.listen(PORT, () => {
  console.log(`listeninging on port ${PORT}`)
})
