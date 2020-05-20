import { db } from '../dao/db';
import { Grocery, GroceryRow } from '../model/Grocery';

 export function getAllGroceries(): Promise<Grocery[]> {
     const sql = `SELECT \
categories.category\
,fg.food\
,brands.brand\
,fg.notes\
,foods_brands.weight, foods_brands.measure_unit\
,foods_storages.date_purchased\
,retailers.retailer\
,foods_retailers.price\
,storages.storage\
,foods_storages.quantity ,foods_storages.shelf_life \
FROM food_groceries fg \
LEFT JOIN foods_categories ON fg.upc_food = foods_categories.upc_food \
LEFT JOIN foods_brands ON fg.upc_food = foods_brands.upc_food \
LEFT JOIN foods_retailers ON fg.upc_food = foods_retailers.upc_food \
LEFT JOIN foods_storages ON fg.upc_food = foods_storages.upc_food \
LEFT JOIN categories ON foods_categories.categories_id = categories.id \
LEFT JOIN retailers ON foods_retailers.retailer_id = retailers.id \
LEFT JOIN storages ON foods_storages.storages_id = storages.id \
LEFT JOIN brands ON foods_brands.brand_id = brands.id`;

     return db.query<GroceryRow>(sql, []).then(result => {
         const rows: GroceryRow[] = result.rows;
         console.log("----------Rows");
         console.log(rows);

         const groceries: Grocery[] = rows.map(row => Grocery.from(row));
         console.log("----------------foodGroceries");
         return groceries;
     });
 }

//export function getFoodGroceryByUpcFood(upcFood: string): Promise<FoodGrocery> {
//    const sql = `SELECT * FROM food_groceries WHERE upc_food = $1`;
//
//    return db.query<FoodGroceryRow>(sql, [upcFood])
//        .then(result => result.rows.map(row => FoodGrocery.from(row))[0]);
//}
//
//export function saveFoodGrocery(foodGrocery: FoodGrocery): Promise<FoodGrocery> {
//    const sql = `INSERT INTO food_groceries (food,upc_food,notes) VALUES ($1, $2, $3) RETURNING *`;
//
//    const params = [foodGrocery.food, foodGrocery.upcFood, foodGrocery.notes];
//    return db.query<FoodGroceryRow>(sql, params).then(result =>
//        result.rows.map(row => FoodGrocery.from(row))[0]
//    );
//}
//
//export function patchFoodGrocery(foodGrocery: FoodGrocery): Promise<FoodGrocery> {
//
//    const sql = `UPDATE food_groceries SET food = COALESCE($1, food), notes = COALESCE($3, notes) WHERE upc_food = $2 RETURNING *`;
//
//    const params = [foodGrocery.food, foodGrocery.upcFood, foodGrocery.notes];
//
//    return db.query<FoodGroceryRow>(sql, params)
//        .then(result => result.rows.map(row => FoodGrocery.from(row))[0]);
//}
