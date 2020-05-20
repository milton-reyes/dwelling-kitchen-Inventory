import { Storage } from '../model/Storage';
import * as storagesDao from '../dao/StorageDao';

export function getAllStorages(): Promise<Storage[]> {
    return storagesDao.getAllStorages();
}

export function getStorageById(id: number): Promise<Storage> {
    return storagesDao.getStorageById(id);
}

export function saveStorage(storages: any): Promise<Storage> {
    
    console.log(storages);

    const newStorage = new Storage(undefined, storages.storage);

    if(storages.store) {
        return storagesDao.saveStorage(newStorage);
    } else {
        console.warn('Storage invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchStorage(input: any): Promise<Storage> {
    const storages = new Storage(input.id, input.storage);

    if(!storages.id) {
        throw new Error('400');
    }
    return storagesDao.patchStorage(storages);
}
