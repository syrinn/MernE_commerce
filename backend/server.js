const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()


const categorieRoutes = require("./routes/categorie.routes")
const produitRoutes = require("./routes/produit.routes")
const userRoutes = require("./routes/user.routes")
const app = express();
app.use(bodyParser.json());
// mongoose connect
mongoose.connect(process.env.DB_CONNECT)
mongoose.connection.on("connected",()=> {
    console.log("database connected successfully.")
})
mongoose.connection.on("error",(err)=> {
    console.log("error when connected to the database ",err)
})

app.use("/api/categorie",categorieRoutes)
app.use("/api/produit",produitRoutes)
app.use("/api/users",userRoutes)


app.listen(process.env.APP_PORT,()=> {
    console.log(`server listning on port ${process.env.APP_PORT}`)
})