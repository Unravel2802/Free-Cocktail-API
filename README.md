# Cocktail Project

## Project Ideas

Since the goal is to show a random cocktail recipe with images, here are some engaging extra features to include:

* **"Surprise Me" Cocktail Generator**
  User clicks a big “Shake it!” button → shows a random cocktail with name, image, ingredients, and instructions.
  Include a fun animation of a cocktail shaker.

* **Cocktail of the Day**
  Show one featured cocktail each day with a background image matching the drink’s color palette.
  Users can save their favorites.

* **Ingredient-Based Search**
  Let users type or select an ingredient, then show random drinks containing it.
  Example: “I have rum” → “Here’s a Mojito!”

* **Party Mode**
  Generate 3–5 random cocktails at once for hosting ideas.
  Could have “Tropical,” “Classics,” or “Surprise Mix” themes.

* **Non-Alcoholic Mode**
  A toggle for mocktail recipes using the same API.
  Helps make it more inclusive.

* **Recipe Card Download**
  Button to save the recipe as a shareable image/PDF.

---

## API Information – TheCocktailDB

**Base URL**

```
https://www.thecocktaildb.com/api/json/v1/1/
```

(*Using the public test key `1`*)

### Endpoints Used

* **Random Cocktail**

  ```
  GET random.php
  ```

  Returns a single random cocktail with name, image, ingredients, and instructions.

* **Search by Name**

  ```
  GET search.php?s={name}
  ```

  Returns cocktails matching the given name.

* **Filter by Ingredient**

  ```
  GET filter.php?i={ingredient}
  ```

  Returns a list of cocktails containing the specified ingredient.

* **Lookup by ID**

  ```
  GET lookup.php?i={id}
  ```

  Returns detailed information for a specific cocktail.