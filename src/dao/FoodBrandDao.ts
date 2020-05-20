import { db } from '../dao/db';
import { FoodBrand, FoodBrandRow } from '../model/FoodBrand';

 export function getAllFoodBrands(): Promise<FoodBrand[]> {
     const sql = `SELECT * FROM foods_brands`;

     return db.query<FoodBrandRow>(sql, []).then(result => {
         const rows: FoodBrandRow[] = result.rows;

         console.log(rows);

         const foodGroceries: FoodBrand[] = rows.map(row => FoodBrand.from(row));
         return foodGroceries;
     });
 }

 export function getFoodBrandById(brandId: number): Promise<FoodBrand> {
    const sql = `SELECT * FROM foods_brands WHERE brand_id = $1`;

    return db.query<FoodBrandRow>(sql, [brandId])
        .then(result => result.rows.map(row => FoodBrand.from(row))[0]);
}

export function getFoodBrandByUpcFood(upcFood: string): Promise<FoodBrand> {
    const sql = `SELECT * FROM foods_brands WHERE upc_food = $1`;

    return db.query<FoodBrandRow>(sql, [upcFood])
        .then(result => result.rows.map(row => FoodBrand.from(row))[0]);
}

export function saveFoodBrand(foodBrand: FoodBrand): Promise<FoodBrand> {
    const sql = `INSERT INTO foods_brands (upc_food,weight,measure_unit) VALUES ($1, $2, $3) RETURNING *`;

    return db.query<FoodBrandRow>(sql, [
        foodBrand.upcFood, foodBrand.weight, foodBrand.measureUnit
    ]).then(result => result.rows.map(row => FoodBrand.from(row))[0]);
}

export function patchFoodBrand(foodBrand: FoodBrand): Promise<FoodBrand> {

    const sql = `UPDATE foods_brands SET weight = COALESCE($2, weight), measure_unit = COALESCE($3, measure_unit) WHERE upc_food = $1 RETURNING *`;

    const params = [foodBrand.upcFood, foodBrand.weight, foodBrand.measureUnit];

    return db.query<FoodBrandRow>(sql, params)
        .then(result => result.rows.map(row => FoodBrand.from(row))[0]);
}