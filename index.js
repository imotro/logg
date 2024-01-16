const express = require("express");
const app = express();
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const port = 3000;
app.get("/new", (req, res) => {
  res.sendFile(__dirname + "/new.html");
});
app.use(bodyParser.json());
app.use(express.static("public"));
app.post("/publish", async (req, res) => {
  try {
    const { content } = req.body;
    const filePath = "public/data.json";
    let existingContent = await fs.readFile(filePath, "utf-8");
    existingContent = existingContent.slice(0, -2);
    existingContent += `,\n  ${content}`;
    existingContent += "\n}";
    await fs.writeFile(filePath, existingContent);
    res.json({ success: true, message: "File updated successfully" });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ success: false, message: error });
  }
});
app.listen(port, () => {
  console.log("App online");
});
