// index.js
const express = require('express')
const axios = require('axios')

//express-handlebars to handle the frontend
const exphbs = require('express-handlebars')

const app = express()

// Setting up Handlebars as our view engine
const hbs = exphbs.create({defaultLayout: 'main'})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/pokemon/:name', async (req, res) => {
    try{
        const {name} = req.params
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokemon = response.data;

        // Rendering the data using our Handlebars template
        res.render('pokemon', {pokemon})

    }catch(e){
        res.send(404).render('error', {message: "Result not found"})
    }
})
const PORT = 4000;
app.listen(PORT, ()=> {console.log("Server is live")})