import { FoodCategory } from '../model/FoodCategory';
import * as foodCategoryDao from '../dao/FoodCategoryDao';

export function getAllFoodCategories(): Promise<FoodCategory[]> {
    return foodCategoryDao.getAllFoodCategories();
}

export function getFoodCategoryById(categoryId: number): Promise<FoodCategory> {
    return foodCategoryDao.getFoodCategoryById(categoryId);
}

export function getFoodCategoryByUpcFood(upcFood: string): Promise<FoodCategory> {
    return foodCategoryDao.getFoodCategoryByUpcFood(upcFood);
}

export function saveFoodCategory(foodCategory: any): Promise<FoodCategory> {

    console.log(foodCategory);

    const newFoodCategory = new FoodCategory(
        undefined,foodCategory.upcFood);

    if(foodCategory.upcFood) {
        return foodCategoryDao.saveFoodCategory(newFoodCategory);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('FoodCategory invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}


export function patchFoodCategory(input: any): Promise<FoodCategory> {

    const foodCategory = new FoodCategory(
        undefined,input.upcFood
    );

    if (!foodCategory.upcFood) {
        throw new Error('400');
    }

    return foodCategoryDao.patchFoodCategory(foodCategory);
}
