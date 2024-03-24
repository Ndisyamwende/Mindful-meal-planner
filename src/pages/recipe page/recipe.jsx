
import React, { useState, useEffect } from 'react';

export const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [mealTime, setMealTime] = useState('');

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/meal/');
        const data = await response.json();
        const currentTime = new Date().getHours();
        let selectedRecipe = null;

        // time of the day
        if (currentTime >= 6 && currentTime < 12) {
          selectedRecipe = data.find(meal => meal.time === 'Morning');
        } else if (currentTime >= 12 && currentTime < 17) {
          selectedRecipe = data.find(meal => meal.time === 'Afternoon');
        } else {
          selectedRecipe = data.find(meal => meal.time === 'Evening');
        }

        setRecipe(selectedRecipe);
        setMealTime(selectedRecipe ? selectedRecipe.time : '');
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchRecipeData();
  }, []);

  return (
    <div>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <p>Serves: {recipe.serves}</p>
          <img src={recipe.image} alt={recipe.title} />
          <h2>Ingredients:</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2>Recipe:</h2>
          <ol>
            {recipe.recipe.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h2>Nutrition:</h2>
          <ul>
            {Object.entries(recipe.nutrition).map(([nutrient, value]) => (
              <li key={nutrient}>
                <strong>{nutrient}:</strong> {value}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
