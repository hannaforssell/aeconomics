import '../styles/CraftableItemRecipe.scss'
import { RecipePath } from '../models/Recipe';
import { shortNum } from '../helpers/formattingHelper';

interface IRecipeCardPathsProps {
  city: string;
  recipePaths: RecipePath[];
  bestPath: RecipePath;
  debugMode: boolean;
}

export const RecipeCardPaths = (props: IRecipeCardPathsProps) => {
  if (props.debugMode) {
    return (
      <>{props.recipePaths?.filter((p) => p.isValid()).map((recipePath, i) => {
        return <div className='card-recipe' key={i}> {recipePath.recipeItems?.map((recipeItem, j) => {
          return <p className="card-text" key={j}>{recipeItem.englishName} x {recipeItem.count} | Price: {shortNum(recipeItem.price)}</p>
        })}
          <hr />
          <p>Amount crafted: {recipePath.amountCrafted}</p>
          <p>Resource price: {shortNum(recipePath.price)} silver ({shortNum(recipePath.price / recipePath.amountCrafted)} silver each)</p>
        </div>
      })}
      </>
    );
  } else {
    return (
      <>
        <div className='card-recipe'> {props.bestPath.recipeItems.map((recipeItem, j) => {
          return <p className="card-text" key={j}>{recipeItem.englishName} x {recipeItem.count} | Total price: {shortNum(recipeItem.price)}</p>
        })}
          <hr />
          <p>Amount crafted: {props.bestPath.amountCrafted}</p>
          <p>Resource price: {shortNum(props.bestPath.price)} silver ({shortNum(props.bestPath.price / props.bestPath.amountCrafted)} silver each)</p>
        </div>
      </>
    );
  }
}