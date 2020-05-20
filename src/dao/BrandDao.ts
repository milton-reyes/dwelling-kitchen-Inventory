import { db } from '../dao/db';
import { Brand, BrandRow } from '../model/Brand';

 export function getAllBrands(): Promise<Brand[]> {
     const sql = `SELECT * FROM brands`;

     return db.query<BrandRow>(sql, []).then(result => {
         const rows: BrandRow[] = result.rows;

         console.log(rows);

         const brands: Brand[] = rows.map(row => Brand.from(row));
         return brands;
     });
 }

export function getBrandById(id: number): Promise<Brand> {
    const sql = `SELECT * FROM brands WHERE id = $1`;

    return db.query<BrandRow>(sql, [id])
        .then(result => result.rows.map(row => Brand.from(row))[0]);
}

export function saveBrand(brand: Brand): Promise<Brand> {
    const sql = `INSERT INTO brands (brand) VALUES ($1) RETURNING *`;

    return db.query<BrandRow>(sql, [
        brand.brand
    ]).then(result => result.rows.map(row => Brand.from(row))[0]);
}

export function patchBrand(brand: Brand): Promise<Brand> {

    const sql = `UPDATE brands SET brand = COALESCE($1, brand) WHERE id = $2 RETURNING *`;

    const params = [brand.brand, brand.id];

    return db.query<BrandRow>(sql, params)
        .then(result => result.rows.map(row => Brand.from(row))[0]);
}