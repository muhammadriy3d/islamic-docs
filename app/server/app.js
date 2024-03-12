const express = require("express");

const app = express();

app.use(express.json());

// api
app.get('/api', (req, res) => {
  res.json({ message: "200 OK" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server start at port ${PORT}`);
});
