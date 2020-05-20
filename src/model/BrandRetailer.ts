export class BrandRetailer {
    brandId: number;
    retailerId: number;

    constructor(brandId:number,retailerId:number){
        this.brandId = brandId;
        this.retailerId = retailerId;
    }

    static from(obj: BrandRetailerRow): BrandRetailer {
        const brandRetailer = new BrandRetailer(obj.brandId,obj.retailerId);
        return brandRetailer;
    }
}

export interface BrandRetailerRow {
    brandId: number;
    retailerId: number;
}