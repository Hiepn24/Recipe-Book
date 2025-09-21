import React from 'react';

const RecipeItem = ({ recipe, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(recipe.id);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công thức này?')) {
      onDelete(recipe.id);
    }
  };

  return (
    <div className="recipe">
      <h3>{recipe.title}</h3>
      <p><strong>Nguyên liệu:</strong> {recipe.ingredients}</p>
      <p><strong>Cách làm:</strong> {recipe.instructions}</p>
      <div className="recipe-buttons">
        <button className="edit-btn" onClick={handleEdit}>
          Sửa
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default RecipeItem;

