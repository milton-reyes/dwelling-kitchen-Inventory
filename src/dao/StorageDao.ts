import { db } from './db';
import { Storage, StorageRow } from '../model/Storage';

export function getAllStorages(): Promise<Storage[]> {
    const sql = `SELECT * FROM storages`;

    return db.query<StorageRow>(sql, []).then(result => {
        const rows: StorageRow[] = result.rows;

        console.log(rows);

        const storages: Storage[] = rows.map(row => Storage.from(row));
        return storages;
    })
}

export function getStorageById(id: number): Promise<Storage> {
    const sql = `SELECT * FROM storages WHERE id = $1`;

    return db.query<StorageRow>(sql, [id])
        .then(result => result.rows.map(row => Storage.from(row))[0]);
}

export function saveStorage(storage: Storage): Promise<Storage> {
    const sql = `INSERT INTO storages (store) VALUES ($1) RETURNING *`;

    return db.query<StorageRow>(sql, [storage.storage])
        .then(result => result.rows.map(row => Storage.from(row))[0]);
}

export function patchStorage(storage: Storage): Promise<Storage> {
    const sql = `UPDATE storages SET storage = COALESCE($1, storage) WHERE id = $2 RETURNING *`;

    const params = [storage.storage, storage.id];

    return db.query<StorageRow>(sql, params)
        .then(result => result.rows.map(row => Storage.from(row))[0]);
}