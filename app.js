const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
 
const app = express();
 
app.use(express.urlencoded({ extended: true }));
 
mongoose.connect(
    "mongodb://user_453w24nca:p453w24nca@db01.dbhost.dev:5050/db_453w24nca"
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log(error);
});
 
 
const travelSchema = new mongoose.Schema({
    travellerId: String,
    name: String,
    destination: String,
    travelDate: String,
    budget: Number,
    email: String
});
 
 
const Traveller = mongoose.model("Traveller", travelSchema);
 
 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
 
 
app.post("/travellers", async (req, res) => {
 
    console.log(req.body);
 
    const traveller = new Traveller({
        travellerId: req.body.travellerId,
        name: req.body.name,
        destination: req.body.destination,
        travelDate: req.body.travelDate,
        budget: req.body.budget,
        email: req.body.email
    });
 
    await traveller.save();
 
    res.send("Travel buddy added successfully");
});
 
 
app.listen(3000, () => {
    console.log("Server running on port 3000");
});