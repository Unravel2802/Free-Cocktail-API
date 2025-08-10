import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
let cachedDrink = null;
let cachedDate = null;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const today = new Date().toDateString();

    try {
        if(!cachedDrink || cachedDate !== today) {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
            cachedDrink = response.data.drinks[0];
            cachedDate = today;
        } 
        return res.render('index.ejs', {
            dailyName: cachedDrink.strDrink,
            dailyInstructions: cachedDrink.strInstructions,
            dailyImg: cachedDrink.strDrinkThumb,
        });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.message.data) });
    }

});

// REST API
app.get('/random', async (req, res) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        const drink = response.data.drinks[0];
        res.render("index.ejs", { 
            name: drink.strDrink,
            instructions: drink.strInstructions,
            img: drink.strDrinkThumb,
        });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data)});
    }
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});