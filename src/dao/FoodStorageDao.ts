import { db } from '../dao/db';
import { FoodStorage, FoodStorageRow } from '../model/FoodStorage';

 export function getAllFoodStorages(): Promise<FoodStorage[]> {
     const sql = `SELECT * FROM foods_storages`;

     return db.query<FoodStorageRow>(sql, []).then(result => {
         const rows: FoodStorageRow[] = result.rows;

         console.log(rows);

         const foodStorages: FoodStorage[] = rows.map(row => FoodStorage.from(row));
         return foodStorages;
     });
 }

 export function getFoodStorageById(storageId: number): Promise<FoodStorage> {
    const sql = `SELECT * FROM foods_storages WHERE storage_id = $1`;

    return db.query<FoodStorageRow>(sql, [storageId])
        .then(result => result.rows.map(row => FoodStorage.from(row))[0]);
}

export function getFoodStorageByUpcFood(upcFood: string): Promise<FoodStorage> {
    const sql = `SELECT * FROM foods_storages WHERE upc_food = $1`;

    return db.query<FoodStorageRow>(sql, [upcFood])
        .then(result => result.rows.map(row => FoodStorage.from(row))[0]);
}

export function saveFoodStorage(foodStorage: FoodStorage): Promise<FoodStorage> {
    const sql = `INSERT INTO foods_storages (upc_food,quantity,date_purchased,shelf_life) VALUES ($1, $2, $3, $4) RETURNING *`;

    return db.query<FoodStorageRow>(sql, [
        foodStorage.upcFood, foodStorage.quantity, foodStorage.datePurchased, foodStorage.shelfLife
    ]).then(result => result.rows.map(row => FoodStorage.from(row))[0]);
}

export function patchFoodStorage(foodStorage: FoodStorage): Promise<FoodStorage> {

    const sql = `UPDATE foods_storages SET upc_food = COALESCE($1, upc_food), quantity = COALESCE($2, quantity), date_purchased = COALESCE($3, date_purchased), shelf_life = COALESCE($4, shelf_life) WHERE upc_food = $1 RETURNING *`;

    const params = [foodStorage.upcFood, foodStorage.quantity, foodStorage.datePurchased, foodStorage.shelfLife];

    return db.query<FoodStorageRow>(sql, params)
        .then(result => result.rows.map(row => FoodStorage.from(row))[0]);
}