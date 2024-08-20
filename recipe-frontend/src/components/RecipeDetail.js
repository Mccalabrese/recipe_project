import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeDetail({ recipeId }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (recipeId) {
      axios.get(`/api/recipes/${recipeId}/`)
        .then(response => {
          setRecipe(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [recipeId]);

  if (!recipe) return <div>Select a recipe to see the details.</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <h3>Steps</h3>
      <ol>
        {recipe.steps.map(step => (
          <li key={step.step_number}>{step.instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;