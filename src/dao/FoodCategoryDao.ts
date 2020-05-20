import { db } from './db';
import { FoodCategory, FoodCategoryRow } from '../model/FoodCategory';

 export function getAllFoodCategories(): Promise<FoodCategory[]> {
     const sql = `SELECT * FROM foods_categories`;

     return db.query<FoodCategoryRow>(sql, []).then(result => {
         const rows: FoodCategoryRow[] = result.rows;

         console.log(rows);

         const foodCategories: FoodCategory[] = rows.map(row => FoodCategory.from(row));
         return foodCategories;
     });
 }

 export function getFoodCategoryById(categoryId: number): Promise<FoodCategory> {
    const sql = `SELECT * FROM foods_categories WHERE categories_id = $1`;

    return db.query<FoodCategoryRow>(sql, [categoryId])
        .then(result => result.rows.map(row => FoodCategory.from(row))[0]);
}

export function getFoodCategoryByUpcFood(upcFood: string): Promise<FoodCategory> {
    const sql = `SELECT * FROM foods_categories WHERE upc_food = $1`;

    return db.query<FoodCategoryRow>(sql, [upcFood])
        .then(result => result.rows.map(row => FoodCategory.from(row))[0]);
}

export function saveFoodCategory(foodCategory: FoodCategory): Promise<FoodCategory> {
    const sql = `INSERT INTO foods_categories (upc_food) VALUES ($1) RETURNING *`;

    return db.query<FoodCategoryRow>(sql, [
        foodCategory.upcFood
    ]).then(result => result.rows.map(row => FoodCategory.from(row))[0]);
}

export function patchFoodCategory(foodCategory: FoodCategory): Promise<FoodCategory> {

    const sql = `UPDATE foods_categories SET upc_food = COALESCE($1, upc_food) WHERE upc_food = $1 RETURNING *`;

    const params = [foodCategory.upcFood];

    return db.query<FoodCategoryRow>(sql, params)
        .then(result => result.rows.map(row => FoodCategory.from(row))[0]);
}