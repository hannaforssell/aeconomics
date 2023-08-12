import { useState } from 'react';
import '../styles/CraftableItem.scss'
import { Toast } from 'react-bootstrap';
import { RecipeCardPaths } from './RecipeCardPaths';
import { Recipe, RecipePath } from '../models/Recipe';
import { shortNum } from '../helpers/formattingHelper';

interface RecipeCardProps {
  recipe: Recipe;
  useBestPath: boolean;
}

export const RecipeCard = (props: RecipeCardProps) => {
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <li className='craftable-item-card card shadow-sm'>
      <div className="card-body">
        <h4 className='craftable-item-card-title'>{props.recipe.englishName} <hr></hr> index: {props.recipe.index}</h4>
        <p>City: { props.recipe.city }</p>
        <p>Category: { props.recipe.category }</p>
        <p>Sell price: { shortNum(props.recipe.price) } silver</p>
        <p>return ratio: { props.recipe.returnRatio }</p>
        <small className="text-body-secondary">{ props.recipe.pricePoints.map((p, i) => {
          return <div key={i}>
            { JSON.stringify(p) }
          </div>
        }) }</small>
        <Toast>
          <Toast.Body>
            <RecipeCardPaths
              city={props.recipe.city}
              recipePaths={props.recipe.recipePaths}
              bestPath={props.recipe.bestPath ?? new RecipePath()}
              useBestPath={props.useBestPath}
            />
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-body-secondary">9 mins</small>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={ () => setUpdate(!update) }>Refresh</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </li>
  );
}