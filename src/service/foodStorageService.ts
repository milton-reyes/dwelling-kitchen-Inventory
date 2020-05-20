import { FoodStorage } from '../model/FoodStorage';
import * as foodStorageDao from '../dao/FoodStorageDao';

export function getAllFoodStorages(): Promise<FoodStorage[]> {
    return foodStorageDao.getAllFoodStorages();
}

export function getFoodStorageById(storageId: number): Promise<FoodStorage> {
    return foodStorageDao.getFoodStorageById(storageId);
}

export function getFoodStorageByUpcFood(upcFood: string): Promise<FoodStorage> {
    return foodStorageDao.getFoodStorageByUpcFood(upcFood);
}

export function saveFoodStorage(foodStorage: any): Promise<FoodStorage> {

    console.log(foodStorage);

    const newFoodStorage = new FoodStorage(
        undefined,foodStorage.upcFood, foodStorage.quantity, foodStorage.datePurchased, foodStorage.shelfLife);

    if(foodStorage.upcFood) {
        return foodStorageDao.saveFoodStorage(newFoodStorage);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('FoodStorage invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}


export function patchFoodStorage(input: any): Promise<FoodStorage> {

    const foodStorage = new FoodStorage(
        undefined,input.upcFood, input.quantity, input.datePurchased, input.shelfLife
    );

    if (!foodStorage.upcFood) {
        throw new Error('400');
    }

    return foodStorageDao.patchFoodStorage(foodStorage);
}
