// / server-frontside-headers.js
const express = require("express");
const crypto = require("crypto");
const app = express();
const path = require("path")

app.use(express.static("public", {
  // Let the browser cache static assets for 1 hour
  maxAge: "1h", etag: true
}));


app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname,'home.html'));
})


// A small API that supports browser caching via ETag
app.get("/api/message", (req, res) => {
  const payload = JSON.stringify({ message: "hello", at: new Date().toISOString() });
  // Generate a simple ETag from the payload
  const etag = '"' + crypto.createHash("md5").update(payload).digest("hex") + '"';
  
  //(short for Entity Tag) is an HTTP response header that works like a fingerprint or version ID for a resource (file, API response, etc.)
  // Tell the browser it can cache for 30s and revalidate with ETag
  // That value is usually a hash or unique identifier based on the file’s contents.
  
  res.set("Cache-Control", "public, max-age=30");
  res.set("ETag", etag);
//   console.log(res)
  console.log(payload)
    console.log(etag)
  res.json(JSON.parse(payload));
});

app.listen(3000, () => console.log("Front-side headers on http://localhost:3000"));