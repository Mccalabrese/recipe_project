import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeList({ refresh, onRecipeSelect }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/recipes/')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, [refresh]);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id} onClick={() => onRecipeSelect(recipe.id)}>
            {recipe.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;