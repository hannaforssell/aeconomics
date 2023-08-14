import '../styles/CraftableItems.scss'
import { RecipeCard } from './RecipeCard';
import { useEffect, useState } from 'react';
import { getRecipes } from '../services/recipeService';

interface IRecipeCardCollectionProps {
  debugMode: boolean;
}

export const RecipeCardCollection = (props: IRecipeCardCollectionProps) => {
  const [, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {      
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  let items: JSX.Element[] = [];

  items = getRecipes(3).map((recipe) => {
    return <RecipeCard
      key={recipe.uniqueName + recipe.city}
      recipe={recipe}
      debugMode={props.debugMode}
    />
  })

  return <div>
    <ul className='craftable-items'>
      {items}
    </ul>
  </div>;
}
