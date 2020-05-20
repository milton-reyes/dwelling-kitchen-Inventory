export class FoodBrand {
    brandId: number;
    upcFood: string;
    weight: number;
    measureUnit: string;

    constructor(brandId:number,upcFood:string,weight:number,measureUnit:string;){
        this.brandId = brandId;
        this.upcFood = upcFood;
        this.weight = weight;
        this.measureUnit = measureUnit;
    }

    static from(obj: FoodBrandRow): FoodBrand {
        const foodBrand = new FoodBrand(obj.brandId,obj.upcFood,obj.weight,obj.measureUnit);
        return foodBrand;
    }
}

export interface FoodBrandRow {
    brandId: number;
    upcFood: string;
    weight: number;
    measureUnit: string;
}