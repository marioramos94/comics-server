const express = require("express")
const axios = require("axios")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 80

app.use(express.static(path.join(__dirname,"public")))

app.get("/api",async(req, res) => {
    res.send({ message: "Hello" })
})
app.get("/comic",async(req, res) => {
    console.log("1")
    let url =  'https://xkcd.com/info.0.json'
    let { data:comic } = await axios.get(url) 
    console.log(comic)
    res.send({ ...comic, last:true})
})
app.get("/comic/:comicId",async(req, res) => {
    console.log("3")
    let { comicId } = req.params
    let url = `https://xkcd.com/${comicId}/info.0.json`
    let { data:comic } = await axios.get(url) 
    console.log(comic)
    res.send({ ...comic, last:false})
})
app.get("/random",async(req, res) => {
    console.log("2")
    let comicId = 5
    let url = `https://xkcd.com/${comicId}/info.0.json`
    let { data:comic } = await axios.get(url) 
    console.log(comic)
    res.send({ ...comic, last:false})
})
app.get("/", async(req, res) => {
    console.log("4")
    res.sendFile(path.join(__dirname, "public", "index.html"))
} )

app.listen(PORT, () => console.log("server is running on " + PORT))