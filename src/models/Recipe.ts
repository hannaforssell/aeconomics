import { getEnglishName } from "../services/itemNameService";
import { IPricePoint } from "../services/pricePointService";
import { CraftableItem } from "../services/recipeService";

export class Recipe {
  price = 0;
  pricePoints: IPricePoint[] = [];
  uniqueName: string;
  englishName: string;
  city: string;
  bestPath: RecipePath | undefined;
  recipePaths: RecipePath[] = [];
  returnRatio = 0;
  category: string;
  subCategory: string;

  constructor(craftableItem: CraftableItem, city: string, public index: number) {
    this.uniqueName = craftableItem["@uniquename"];
    this.englishName = getEnglishName(craftableItem["@uniquename"]);
    this.city = city;
    this.category = craftableItem["@shopcategory"];
    this.subCategory = craftableItem["@shopsubcategory1"];

    if (!Array.isArray(craftableItem.craftingrequirements)) {
      craftableItem.craftingrequirements = [craftableItem.craftingrequirements];
    }

    for (const req of craftableItem.craftingrequirements) {
      if (req.craftresource) {
        const newPath = new RecipePath();

        if (req["@amountcrafted"]) {
          newPath.amountCrafted = req["@amountcrafted"];
        }

        if (!Array.isArray(req.craftresource)) {
          req.craftresource = [req.craftresource];
        }

        for (const res of req.craftresource) {
          newPath.recipeItems.push(new RecipeItem(res["@uniquename"], getEnglishName(res["@uniquename"]), res["@count"] ?? 0))
        }
        this.recipePaths.push(newPath);
      }
    }
  }

  hasValidPath = (): boolean => {
    for (const recipePath of this.recipePaths) {
      if (recipePath.isValid()) {
        return true;
      }
    }
    return false;
  }
}

export class RecipePath {
  price = 0;
  recipeItems: RecipeItem[] = [];
  amountCrafted = 1;

  isValid = (): boolean => {
    for (const recipeItem of this.recipeItems) {
      if (recipeItem.price <= 0) {
        return false;
      }
    }
    return true;
  }
}

export class RecipeItem {
  price = 0;
  pricePoints: IPricePoint[] = [];

  constructor(
    public uniqueName: string,
    public englishName: string,
    public count: number
  ) { }
}
