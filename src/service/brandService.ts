import { Brand } from '../model/Brand';
import * as brandDao from '../dao/BrandDao';

export function getAllBrands(): Promise<Brand[]> {
    return brandDao.getAllBrands();
}

export function getBrandById(id: number): Promise<Brand> {
    return brandDao.getBrandById(id);
}

export function saveBrand(brand: any): Promise<Brand> {

    console.log(brand);

    const newBrand = new Brand(undefined, brand.brand);

    if(brand.brand) {
        return brandDao.saveBrand(newBrand);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('Brand invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}


export function patchBrand(input: any): Promise<Brand> {

    const brand = new Brand(
        input.id, input.brand
    );

    if (!brand.id) {
        throw new Error('400');
    }

    return brandDao.patchBrand(brand);
}
