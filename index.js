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
});
app.get('/search-by-ingredient', (req, res) => {
    res.render('search.ejs');
})
app.post('/search-by-ingredient', async (req, res) => {
    const ingredient = req.body.ingredient; // now works!
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php`, {
            params:  { i: ingredient }
        });
        const drinks = response.data.drinks;
        let drinkData = [];
        for (let i = 0; i < 5; i++) {
        drinkData.push({
            name: drinks[i].strDrink,
            image: drinks[i].strDrinkThumb
        });
        }

        res.render('search.ejs', { drinks: drinkData, ingredient });
    } catch (error) {
        res.render('search.ejs', { drinks: [], ingredient, error: 'No drinks found.' });
  }
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});