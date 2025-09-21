import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import { register } from './registerServiceWorker';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Load recipes from localStorage on component mount
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    setRecipes(savedRecipes);
    
    // Register service worker for PWA
    register();
  }, []);

  // Save recipes to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addRecipe = (recipeData) => {
    if (editingRecipe) {
      // Update existing recipe
      setRecipes(recipes.map(recipe => 
        recipe.id === editingRecipe.id 
          ? { ...recipeData, id: editingRecipe.id }
          : recipe
      ));
      setEditingRecipe(null);
    } else {
      // Add new recipe
      const newRecipe = {
        ...recipeData,
        id: Date.now().toString()
      };
      setRecipes([...recipes, newRecipe]);
    }
  };

  const editRecipe = (id) => {
    const recipe = recipes.find(recipe => recipe.id === id);
    if (recipe) {
      setEditingRecipe(recipe);
    }
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="App">
      <header className="header">
        📖 Recipe Book
      </header>
      <main className="main">
        <h1>Quản lý công thức nấu ăn</h1>
        
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <RecipeForm 
          onAddRecipe={addRecipe}
          editingRecipe={editingRecipe}
        />
        
        <RecipeList 
          recipes={filteredRecipes}
          onEditRecipe={editRecipe}
          onDeleteRecipe={deleteRecipe}
        />
      </main>
    </div>
  );
}

export default App;
