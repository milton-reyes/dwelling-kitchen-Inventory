import { Grocery } from '../model/Grocery';
import * as groceryDao from '../dao/GroceryDao';

export function getAllGroceries(): Promise<Grocery[]> {
    return groceryDao.getAllGroceries();
}

//export function getFoodGroceryByUpcFood(upcFood: string): Promise<FoodGrocery> {
//    return foodGroceryDao.getFoodGroceryByUpcFood(upcFood);
//}
//
//export function saveFoodGrocery(foodGrocery: any): Promise<FoodGrocery> {
//
//    console.log("-------service saveFG foodGrocery");
//    console.log(foodGrocery);
//
//    // make sure same case as column name from any obj (foodGrocery)
//    const newFoodGrocery = new FoodGrocery(
//        foodGrocery.food, foodGrocery.upc_food, foodGrocery.notes);
//
//    if(foodGrocery.food && foodGrocery.upc_food) {
//        return foodGroceryDao.saveFoodGrocery(newFoodGrocery);
//    } else {
//        // TODO: We should fail here, probably issue some kind of 400
//        console.warn('FoodGrocery invalid');
//        return new Promise((resolve, reject) => reject(422));
//    }
//}
//
//
//export function patchFoodGrocery(input: any): Promise<FoodGrocery> {
//
//    const foodGrocery = new FoodGrocery(
//        input.food, input.upcFood, input.notes
//    );
//
//    if (!foodGrocery.food || !foodGrocery.upcFood) {
//        throw new Error('400');
//    }
//
//    return foodGroceryDao.patchFoodGrocery(foodGrocery);
//}
