import { BrandRetailer } from '../model/BrandRetailer';
import * as brandRetailerDao from '../dao/BrandsRetailersDao';

export function getAllBrandRetailers(): Promise<BrandRetailer[]> {
    return brandRetailerDao.getAllBrandRetailers();
}

export function getBrandRetailerByBrandId(id: number): Promise<BrandRetailer> {
    return brandRetailerDao.getBrandRetailerByBrandId(id);
}

export function getBrandRetailerByRetailerId(id: number): Promise<BrandRetailer> {
    return brandRetailerDao.getBrandRetailerByRetailerId(id);
}

export function saveBrandRetailer(brand: any): Promise<BrandRetailer> {

    console.log(brand);

    const newBrandRetailer = new BrandRetailer(
        brand.brandId, brand.retailerId);

    if(brand.brandId && brand.retailerId) {
        return brandRetailerDao.saveBrandRetailer(newBrandRetailer);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('BrandRetailer invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}


export function patchBrandRetailer(input: any): Promise<BrandRetailer> {

    const brand = new BrandRetailer(
        input.brandId, input.retailerId
    );

    if (!brand.brandId || !brand.retailerId) {
        throw new Error('400');
    }

    return brandRetailerDao.patchBrandRetailer(brand);
}
