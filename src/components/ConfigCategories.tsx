import { useState } from 'react';
import { allCategories, categoriesToShow } from '../services/configService';

export const ConfigCategories = () => {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    Array.from(allCategories).map((category) => categoriesToShow.has(category))
  );

  const handleCategoryChange = (selectedCategory: string, position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? !item : item;
    });

    setCheckedState(updatedCheckedState);

    if (!checkedState[position]) {
      categoriesToShow.add(selectedCategory);
    } else {
      categoriesToShow.delete(selectedCategory);
    }
  }

  return (
    <div className="lead text-body-secondary config-menu-child">
      <h3>Categories</h3>
      {allCategories.map((category, index) => {
        return (
          <label key={category}>
            <input
              type="checkbox"
              name="city"
              checked={checkedState[index]}
              onChange={() => handleCategoryChange(category, index)}
            />
            <span> {category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </label>
        )
      })}
    </div>
  );
}

// <div className="row py-lg-4">
// <div className="col-lg-12 col-md-8 mx-auto">