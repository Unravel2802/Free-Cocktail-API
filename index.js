import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index.ejs");
})

// REST API
app.get('/random', async (req, res) => {
    try {
        const response =  await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        const data = response.data.drinks[0];
        res.render("index.ejs", { 
            name: data.strDrink,
            instructions: data.strInstructions
        });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data)});
    }
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});