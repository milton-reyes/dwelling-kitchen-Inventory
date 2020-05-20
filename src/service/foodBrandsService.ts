import { FoodBrand } from '../model/FoodBrand';
import * as foodBrandDao from '../dao/FoodBrandDao';

export function getAllFoodBrands(): Promise<FoodBrand[]> {
    return foodBrandDao.getAllFoodBrands();
}

export function getFoodBrandById(brandId: number): Promise<FoodBrand> {
    return foodBrandDao.getFoodBrandById(brandId);
}

export function getFoodBrandByUpcFood(upcFood: string): Promise<FoodBrand> {
    return foodBrandDao.getFoodBrandByUpcFood(upcFood);
}

export function saveFoodBrand(foodBrand: any): Promise<FoodBrand> {

    console.log(foodBrand);

    const newFoodBrand = new FoodBrand(
        undefined,foodBrand.upcFood, foodBrand.weight, foodBrand.measureUnit);

    if(foodBrand.upcFood) {
        return foodBrandDao.saveFoodBrand(newFoodBrand);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('FoodBrand invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}


export function patchFoodBrand(input: any): Promise<FoodBrand> {

    const foodBrand = new FoodBrand(
        undefined,input.upcFood, input.weight, input.measureUnit
    );

    if (!foodBrand.upcFood) {
        throw new Error('400');
    }

    return foodBrandDao.patchFoodBrand(foodBrand);
}
