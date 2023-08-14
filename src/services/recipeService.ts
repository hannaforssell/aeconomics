import axios from "axios";
import { Recipe } from "../models/Recipe";
import { getItemPrice } from "./pricePointService";
import { allCities, categoriesToShow, citiesToShow } from "./configService";

export interface CraftableItem {
  '@uniquename': string;
  englishName: string;
  '@shopcategory': string;
  '@shopsubcategory1': string;
  craftingrequirements: CraftingReqs[];
}

interface CraftingReqs {
  '@amountcrafted'?: number;
  craftresource?: CraftingResources[];
}

interface CraftingResources {
  '@uniquename': string;
  '@count'?: number;
}

const recipes: Recipe[] = [];

export const init = async () => {
  let index = 0;
  await axios.get<CraftableItem[]>('items.json')
    .then(res => {
      for (const item of res.data) {
        if (item.craftingrequirements) {
          if (!Array.isArray(item.craftingrequirements)) {
            item.craftingrequirements = [item.craftingrequirements];
          }
          for (const city of allCities) {
            recipes.push(new Recipe(item, city, index++));
          }
        }
      }      
    })
    .catch(err => console.log(err));
}

export const getRecipes = (count: number): Recipe[] => {
  assignPrices();

  const validRecipes = recipes
    .filter((r) => categoriesToShow.has(r.category))
    .filter((r) => citiesToShow.has(r.city))
    .filter((r) => r.price > 0)
    .filter((r) => r.hasValidPath())
    .filter((r) => r.returnRatio < 5);

  const sortedRecipes = validRecipes.sort((a, b) => (b.price * (b.bestPath?.amountCrafted ?? 1) - (b.bestPath?.price ?? Number.MAX_VALUE)) - (a.price * (a.bestPath?.amountCrafted ?? 1) - (a.bestPath?.price ?? Number.MAX_VALUE)));
  
  return sortedRecipes.slice(0, count);
  //return recipes.slice(7690, 7690 + count);
}

const assignPrices = () => {
  for (const recipe of recipes) {
    [recipe.price, recipe.pricePoints] = getItemPrice(recipe.uniqueName, recipe.city);

    let bestPathPrice = Number.MAX_VALUE;
    for (const recipePath of recipe.recipePaths) {
      for (const recipeItem of recipePath.recipeItems) {
        [recipeItem.price, recipeItem.pricePoints] = getItemPrice(recipeItem.uniqueName, recipe.city);
        recipeItem.price *= recipeItem.count;
      }
      recipePath.price = recipePath.recipeItems.reduce((a, item) => a + item.price, 0);

      if (recipePath.price < bestPathPrice && recipePath.isValid()) {
        bestPathPrice = recipePath.price;
        recipe.bestPath = recipePath;

        recipe.returnRatio = (recipe.price * recipePath.amountCrafted) / recipePath.price;
      }
    }
  }
}
