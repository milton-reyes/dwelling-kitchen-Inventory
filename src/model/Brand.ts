export class Brand {
    id: number;
    brand: string;

    constructor(id:number,brand:string) {
        this.id = id;
        this.brand = brand;
    }

    static from(obj: BrandRow): Brand {
        const brand = new Brand(
            obj.id, obj.brand);
        return brand;
    }
}

export interface BrandRow {
    id: number;
    brand: string;
}