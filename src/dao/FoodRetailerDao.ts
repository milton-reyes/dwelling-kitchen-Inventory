import { db } from '../dao/db';
import { FoodRetailer, FoodRetailerRow } from '../model/FoodRetailer';

 export function getAllFoodRetailers(): Promise<FoodRetailer[]> {
     const sql = `SELECT * FROM foods_retailers`;

     return db.query<FoodRetailerRow>(sql, []).then(result => {
         const rows: FoodRetailerRow[] = result.rows;

         console.log(rows);

         const foodRetailers: FoodRetailer[] = rows.map(row => FoodRetailer.from(row));
         return foodRetailers;
     });
 }

 export function getFoodRetailerById(retailerId: number): Promise<FoodRetailer> {
    const sql = `SELECT * FROM foods_retailers WHERE retailer_id = $1`;

    return db.query<FoodRetailerRow>(sql, [retailerId])
        .then(result => result.rows.map(row => FoodRetailer.from(row))[0]);
}

export function getFoodRetailerByUpcFood(upcFood: string): Promise<FoodRetailer> {
    const sql = `SELECT * FROM foods_retailers WHERE upc_food = $1`;

    return db.query<FoodRetailerRow>(sql, [upcFood])
        .then(result => result.rows.map(row => FoodRetailer.from(row))[0]);
}

export function saveFoodRetailer(foodRetailer: FoodRetailer): Promise<FoodRetailer> {
    const sql = `INSERT INTO foods_retailers (upc_food,price) VALUES ($1, $2) RETURNING *`;

    return db.query<FoodRetailerRow>(sql, [
        foodRetailer.upcFood, foodRetailer.price
    ]).then(result => result.rows.map(row => FoodRetailer.from(row))[0]);
}

export function patchFoodRetailer(foodRetailer: FoodRetailer): Promise<FoodRetailer> {

    const sql = `UPDATE foods_retailers SET upc_food = COALESCE($1, upc_food), price = COALESCE($2, price) WHERE upc_food = $1 RETURNING *`;

    const params = [foodRetailer.upcFood, foodRetailer.price];

    return db.query<FoodRetailerRow>(sql, params)
        .then(result => result.rows.map(row => FoodRetailer.from(row))[0]);
}