import '../styles/CraftableItems.scss'
import { RecipeCard } from './RecipeCard';
import { useEffect, useState } from 'react';
import { getRecipes } from '../services/recipeService';

interface RecipeCardCollectionProps {
  useBestPath: boolean;
}

export const RecipeCardCollection = (props: RecipeCardCollectionProps) => {
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
      useBestPath={props.useBestPath}
    />
  })

  return <div>
    <ul className='craftable-items'>
      {items}
    </ul>
  </div>;
}
