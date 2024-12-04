const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
  if (!req.files || !req.files.pdfFile) {
    res.status(400).send("No PDF file uploaded.");
    return;
  }

  pdfParse(req.files.pdfFile.data)
    .then((result) => {
      res.send(result.text);
    })
    .catch((err) => {
      res.status(500).send("Error parsing PDF file.");
    });
});

app.listen(3000, () => {
  console.log("Server is running at port 3000.");
});
