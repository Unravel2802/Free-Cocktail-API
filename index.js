import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
let list = [];
let cachedDrink = null;
let cachedDate = null;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Daily Drink (default route) page
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

// Random Drink Generator 
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

// Search by ingredient feature 
// GET Method 
app.get('/search-by-ingredient', (req, res) => {
    res.render('searchIngredient.ejs');
})

// POST Method
app.post('/search-by-ingredient', async (req, res) => {
    const ingredient = req.body.ingredient; 
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

        res.render('searchIngredient.ejs', { drinks: drinkData, ingredient });
    } catch (error) {
        res.render('searchIngredient.ejs', { drinks: [], ingredient, error: 'No drinks found.' });
  }
});

// Search by name feature
// GET Method
app.get('/search-by-name', (req, res) => {
    res.render('searchName.ejs');
})

// POST Method
app.post('/search-by-name', async (req, res) => {
    const name = req.body.name; 
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php`, {
            params:  { s: name }
        });
        const drink  = response.data.drinks[0];
        res.render('searchName.ejs', { drink: drink, name });
    } catch (error) {
        res.render('searchName.ejs', { drink: [], name, error: 'No drinks found.' });
  }
});

// View cocktail list feature
// GET Method
app.get("/list", (req, res) => {
    res.render("list.ejs", {drinks: list});
})

// POST Method
app.post("/list", (req, res) => { 
    const drink = req.body;
    const added = list.some(d => d.drinkName === drink.drinkName);
    if (!added) {
        list.push(drink);
    }
    res.render('searchName.ejs');
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});