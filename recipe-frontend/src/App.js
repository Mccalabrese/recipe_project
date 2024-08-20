import React, { useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  }

  return (
    <div>
      <h1>Recipe Manager</h1>
      <RecipeForm recipeId={selectedRecipeId} onSubmitSuccess={handleSuccess} />
      <RecipeList 
        refresh={refresh}
        onRecipeSelect={setSelectedRecipeId} 
      />
      <RecipeDetail recipeId={selectedRecipeId} />
    </div>
  );
}

export default App;