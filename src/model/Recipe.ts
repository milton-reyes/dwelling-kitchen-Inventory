
export class Recipe {
    id: number;
    recipe: string;

    constructor(id: number,recipe:string) {
        this.id = id;
        this.recipe = recipe;
    }

    static from(obj: RecipeRow): Recipe {
        const recipe = new Recipe(
            obj.id,obj.recipe
        );
        return recipe;
    }
}

export interface RecipeRow {
    id: number;
    recipe: string;
}