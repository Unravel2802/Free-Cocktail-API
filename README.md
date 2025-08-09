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