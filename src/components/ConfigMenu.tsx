import { useState } from 'react';
import { allCategories, categoriesToShow, defaultIgnoreCategories } from '../services/configService';
import '../styles/ConfigMenu.scss'

interface IConfigMenuProps {
  useBestPath: boolean;
  setUseBestPath: (arg: boolean) => void;
}

export const ConfigMenu = (props: IConfigMenuProps) => {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    Array.from(allCategories).map((category) => !defaultIgnoreCategories.has(category))
  );
  const categoryHTML: JSX.Element[] = [];

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

  let index = 0;

  for (const category of allCategories) {
    const localIndex = index;
    categoryHTML.push(
      <label key={category}>
        <input
          type="checkbox"
          name="category"
          checked={checkedState[localIndex]}
          onChange={() => handleCategoryChange(category, localIndex)}
        />
        <span> {category.charAt(0).toUpperCase() + category.slice(1)}</span>
      </label>
    )
    index++;
  }

  return (
    <section className='config-menu-container'>
      <div className='lead text-body-secondary config-menu'>
      <h2 className="fw-light">Settings</h2>
        <label>
          <input
            type="checkbox"
            name="bestPathChoice"
            checked={props.useBestPath}
            onChange={() => props.setUseBestPath(!props.useBestPath)}
          />
          <span> Only display most profitable path</span>
        </label>
        <div className="lead text-body-secondary config-menu-categories">
          <h3>Categories</h3>
          {categoryHTML.sort((a, b) => String(a.key).localeCompare(String(b.key)))}
        </div>
      </div>
    </section>
  );
}

// <div className="row py-lg-4">
// <div className="col-lg-12 col-md-8 mx-auto">