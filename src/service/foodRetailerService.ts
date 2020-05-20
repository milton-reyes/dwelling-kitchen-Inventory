import { FoodRetailer } from '../model/FoodRetailer';
import * as foodRetailerDao from '../dao/FoodRetailerDao';

export function getAllFoodRetailers(): Promise<FoodRetailer[]> {
    return foodRetailerDao.getAllFoodRetailers();
}

export function getFoodRetailerById(retailerId: number): Promise<FoodRetailer> {
    return foodRetailerDao.getFoodRetailerById(retailerId);
}

export function getFoodRetailerByUpcFood(upcFood: string): Promise<FoodRetailer> {
    return foodRetailerDao.getFoodRetailerByUpcFood(upcFood);
}

export function saveFoodRetailer(foodRetailer: any): Promise<FoodRetailer> {

    console.log(foodRetailer);

    const newFoodRetailer = new FoodRetailer(
        undefined,foodRetailer.upcFood, foodRetailer.price);

    if(foodRetailer.upcFood) {
        return foodRetailerDao.saveFoodRetailer(newFoodRetailer);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('FoodRetailer invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}


export function patchFoodRetailer(input: any): Promise<FoodRetailer> {

    const foodRetailer = new FoodRetailer(
        undefined,input.upcFood, input.price
    );

    if (!foodRetailer.upcFood) {
        throw new Error('400');
    }

    return foodRetailerDao.patchFoodRetailer(foodRetailer);
}
