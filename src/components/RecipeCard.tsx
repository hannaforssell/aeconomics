import { useState } from 'react';
import '../styles/CraftableItem.scss'
import { Toast } from 'react-bootstrap';
import { RecipeCardPaths } from './RecipeCardPaths';
import { Recipe, RecipePath } from '../models/Recipe';
import { shortNum } from '../helpers/formattingHelper';

interface IRecipeCardProps {
  recipe: Recipe;
  debugMode: boolean;
}

export const RecipeCard = (props: IRecipeCardProps) => {
  if (props.debugMode) {
    return (
      <li className='craftable-item-card card shadow-sm'>
        <div className="card-body">
          <h4 className='craftable-item-card-title'>{props.recipe.englishName} <hr></hr> index: {props.recipe.index}</h4>
          <p>City: {props.recipe.city}</p>
          <p>Category: {props.recipe.category}</p>
          <p>Sell price: {shortNum(props.recipe.price)} silver</p>
          <p>Return ratio: {props.recipe.returnRatio}</p>
          <small className="text-body-secondary">{props.recipe.pricePoints.map((p, i) => {
            return <div key={i}>
              {JSON.stringify(p)}
            </div>
          })}
          </small>
          <Toast>
            <Toast.Body>
              <RecipeCardPaths
                city={props.recipe.city}
                recipePaths={props.recipe.recipePaths}
                bestPath={props.recipe.bestPath ?? new RecipePath()}
                debugMode={props.debugMode}
              />
            </Toast.Body>
          </Toast>
        </div>
      </li>
    );
  } else {
    return (
      <li className='craftable-item-card card shadow-sm'>
        <div className="card-body">
          <h4 className='craftable-item-card-title'>{props.recipe.englishName}</h4>
          <hr />
          <p>City: {props.recipe.city}</p>
          <p>Category: {props.recipe.category}</p>
          <p>Sell price: {shortNum(props.recipe.price)} silver</p>
          <Toast>
            <Toast.Body>
              <RecipeCardPaths
                city={props.recipe.city}
                recipePaths={props.recipe.recipePaths}
                bestPath={props.recipe.bestPath ?? new RecipePath()}
                debugMode={props.debugMode}
              />
            </Toast.Body>
          </Toast>
        </div>
      </li>
    );
  }
}