import React from 'react';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes, onEditRecipe, onDeleteRecipe }) => {
  if (recipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        Chưa có công thức nào. Hãy thêm công thức đầu tiên!
      </div>
    );
  }

  return (
    <div>
      {recipes.map(recipe => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onEdit={onEditRecipe}
          onDelete={onDeleteRecipe}
        />
      ))}
    </div>
  );
};

export default RecipeList;

