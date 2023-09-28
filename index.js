import bodyParser from "body-parser";
import express from "express";
import axios from "axios"

const app = express()
const port = 3000
// const apikey = "9758b00f7ec705f6aaa94beb"

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/currencyAmount", async (req, res) => {

    console.log(req.body)
    var theFrom = req.body["fromCurrency"]
    var theTo = req.body["toCurrency"]
    var theAmount = Number(req.body["amout"])

    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/9758b00f7ec705f6aaa94beb/pair/${theFrom}/${theTo}/${theAmount}`)
        const resultat = response.data["conversion_result"]
        const datas = {
            theamount: Number(req.body["amout"]),
            thefrom: req.body["fromCurrency"],
            theto: req.body["toCurrency"],
            theresult: response.data["conversion_result"],
            therate: response.data["conversion_rate"]
        }
        console.log(response)
        res.render("index.ejs", {final: datas})
        } catch(error){
        res.status(404).send(error.message)
    }

})

app.get("/", (req, res) =>{
    res.render("index.ejs")
})

app.listen(port, () => {console.log(`Server Is Running On ${port}`)})