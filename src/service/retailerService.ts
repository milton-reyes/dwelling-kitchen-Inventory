import { Retailer } from '../model/Retailer';
import * as retailerDao from '../dao/RetailerDao';

export function getAllRetailers(): Promise<Retailer[]> {
    return retailerDao.getAllRetailers();
}

export function getRetailerById(id: number): Promise<Retailer> {
    return retailerDao.getRetailerById(id);
}

export function saveRetailer(retailer: any): Promise<Retailer> {
    
    console.log(retailer);

    const newRetailer = new Retailer(undefined, retailer.retailer);

    if(retailer.retailer) {
        return retailerDao.saveRetailer(newRetailer);
    } else {
        console.warn('Retailer invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchRetailer(input: any): Promise<Retailer> {
    const retailer = new Retailer(input.id, input.retailer);

    if(!retailer.id) {
        throw new Error('400');
    }
    return retailerDao.patchRetailer(retailer);
}
