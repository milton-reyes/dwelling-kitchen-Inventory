import { db } from '../dao/db';
import { BrandRetailer, BrandRetailerRow } from '../model/BrandRetailer';

 export function getAllBrandRetailers(): Promise<BrandRetailer[]> {
     const sql = `SELECT * FROM brands_retailers`;

     return db.query<BrandRetailerRow>(sql, []).then(result => {
         const rows: BrandRetailerRow[] = result.rows;

         console.log(rows);

         const brandretailers: BrandRetailer[] = rows.map(row => BrandRetailer.from(row));
         return brandretailers;
     });
 }

export function getBrandRetailerByBrandId(id: number): Promise<BrandRetailer> {
    const sql = `SELECT * FROM brands_retailers WHERE brand_id = $1`;

    return db.query<BrandRetailerRow>(sql, [id])
        .then(result => result.rows.map(row => BrandRetailer.from(row))[0]);
}

export function getBrandRetailerByRetailerId(id: number): Promise<BrandRetailer> {
    const sql = `SELECT * FROM brands_retailers WHERE retailer_id = $1`;

    return db.query<BrandRetailerRow>(sql, [id])
        .then(result => result.rows.map(row => BrandRetailer.from(row))[0]);
}

export function saveBrandRetailer(brand: BrandRetailer): Promise<BrandRetailer> {
    const sql = `INSERT INTO brands_retailers (brand_id,retailer_id) VALUES ($1, $2) RETURNING *`;

    return db.query<BrandRetailerRow>(sql, [
        brand.brandId, brand.retailerId
    ]).then(result => result.rows.map(row => BrandRetailer.from(row))[0]);
}

export function patchBrandRetailer(brand: BrandRetailer): Promise<BrandRetailer> {

    const sql = `UPDATE brands_retailers SET retailer_id = COALESCE($2, retailer_id) WHERE brand_id = $1 RETURNING *`;

    const params = [brand.brandId, brand.retailerId];

    return db.query<BrandRetailerRow>(sql, params)
        .then(result => result.rows.map(row => BrandRetailer.from(row))[0]);
}