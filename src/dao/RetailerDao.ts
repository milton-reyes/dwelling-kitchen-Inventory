import { db } from '../dao/db';
import { Retailer, RetailerRow } from '../model/Retailer';

export function getAllRetailers(): Promise<Retailer[]> {
    const sql = `SELECT * FROM retailers`;

    return db.query<RetailerRow>(sql, []).then(result => {
        const rows: RetailerRow[] = result.rows;

        console.log(rows);

        const retailers: Retailer[] = rows.map(row => Retailer.from(row));
        return retailers;
    })
}

export function getRetailerById(id: number): Promise<Retailer> {
    const sql = `SELECT * FROM retailers WHERE id = $1`;

    return db.query<RetailerRow>(sql, [id])
        .then(result => result.rows.map(row => Retailer.from(row))[0]);
}

export function saveRetailer(retailer: Retailer): Promise<Retailer> {
    const sql = `INSERT INTO retailers (retailer) VALUES ($1) RETURNING *`;

    return db.query<RetailerRow>(sql, [retailer.retailer])
        .then(result => result.rows.map(row => Retailer.from(row))[0]);
}

export function patchRetailer(retailer: Retailer): Promise<Retailer> {
    const sql = `UPDATE retailers SET retailer = COALESCE($1, retailer) WHERE id = $2 RETURNING *`;

    const params = [retailer.retailer, retailer.id];

    return db.query<RetailerRow>(sql, params)
        .then(result => result.rows.map(row => Retailer.from(row))[0]);
}