import { db } from '../dao/db';
import { FoodGrocery, FoodGroceryRow } from '../model/FoodGrocery';

 export function getAllFoodGroceries(): Promise<FoodGrocery[]> {
     const sql = `SELECT * FROM food_groceries`;

     return db.query<FoodGroceryRow>(sql, []).then(result => {
         const rows: FoodGroceryRow[] = result.rows;
         console.log("----------Rows");
         console.log(rows);

         const foodGroceries: FoodGrocery[] = rows.map(row => FoodGrocery.from(row));
         console.log("----------------foodGroceries");
         return foodGroceries;
     });
 }

export function getFoodGroceryByUpcFood(upcFood: string): Promise<FoodGrocery> {
    const sql = `SELECT * FROM food_groceries WHERE upc_food = $1`;

    return db.query<FoodGroceryRow>(sql, [upcFood])
        .then(result => result.rows.map(row => FoodGrocery.from(row))[0]);
}

export function saveFoodGrocery(foodGrocery: FoodGrocery): Promise<FoodGrocery> {
    const sql = `INSERT INTO food_groceries (food,upc_food,notes) VALUES ($1, $2, $3) RETURNING *`;

    const params = [foodGrocery.food, foodGrocery.upcFood, foodGrocery.notes];
    return db.query<FoodGroceryRow>(sql, params).then(result =>
        result.rows.map(row => FoodGrocery.from(row))[0]
    );
}

export function patchFoodGrocery(foodGrocery: FoodGrocery): Promise<FoodGrocery> {

    const sql = `UPDATE food_groceries SET food = COALESCE($1, food), notes = COALESCE($3, notes) WHERE upc_food = $2 RETURNING *`;

    const params = [foodGrocery.food, foodGrocery.upcFood, foodGrocery.notes];

    return db.query<FoodGroceryRow>(sql, params)
        .then(result => result.rows.map(row => FoodGrocery.from(row))[0]);
}
