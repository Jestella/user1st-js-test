const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// serve index.html file for all routes (client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
