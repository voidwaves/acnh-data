
// to run use the command:
// ts-node -O "{ \"target\": \"es2017\" }" Item.ts

type Category = 
    'Material' |
    'Nook Item' |
    'Tool' |
    'Furniture'

interface Ingredient {
    item: Item
    amount: number
}

interface Item {
    id: number
    name: string
    category: Category
    recipe: Ingredient[]
}

const TreeBranch: Item = {
    id: 6,
    name: 'Tree Branch',
    category: 'Material',
    recipe: []
}

const Stone: Item = {
    id: 7,
    name: 'Stone',
    category: 'Material',
    recipe: []
}

const Wood: Item = {
    id: 1,
    name: 'Wood',
    category: 'Material',
    recipe: []
}

const IronNugget: Item = {
    id: 2,
    name: 'Iron Nugget',
    category: 'Material',
    recipe: []
}

const GoldNugget: Item = {
    id: 3,
    name: 'Gold Nugget',
    category: 'Material',
    recipe: []
}

const FlimsyAxe: Item = {
    id: 8,
    name: 'Flimsy Axe',
    category: 'Tool',
    recipe: [
        {item: TreeBranch, amount: 5},
        {item: Stone, amount: 1}
    ]
}

const Axe: Item = {
    id: 9,
    name: 'Axe',
    category: 'Tool',
    recipe: [
        {item: FlimsyAxe, amount: 1},
        {item: Wood, amount: 3},
        {item: IronNugget, amount: 1}
    ]
}

const GoldenAxe: Item = {
    id: 10,
    name: 'Golden Axe',
    category: 'Tool',
    recipe: [
        {item: Axe, amount: 1},
        {item: GoldNugget, amount: 1}
    ]
}

function flatten<Type>(array: Type[][]): Type[] {
    if(array.length === 0) {
        return []
    } else {
        return [...array[0], ...flatten(array.slice(1, array.length))]
    }
}

function getBaseIngredients(recipe: Ingredient[]): Ingredient[] {
    return flatten(recipe.map(ingredient => {
        if(ingredient.item.recipe.length === 0) {
            return [ingredient]
        } else {
            return flatten(new Array(ingredient.amount).fill(getBaseIngredients(ingredient.item.recipe)))
        }
    }))
}

function compoundBaseIngredients(recipe: Ingredient[], result: Ingredient[] = []): Ingredient[] {
    if(recipe.length === 0) {
        return result
    } else {
        const currentIngredient = recipe[0]
        const resultMatch = result.find(ingredient => ingredient.item.id === currentIngredient.item.id)
        if(resultMatch === undefined) {
            return compoundBaseIngredients(recipe.slice(1, recipe.length), [currentIngredient, ...result])
        } else {
            const newIngredient = {
                item: currentIngredient.item,
                amount: currentIngredient.amount + resultMatch.amount
            }
            const newResult = [newIngredient, ...result.filter(ingredient => ingredient.item.id !== currentIngredient.item.id)]
            return compoundBaseIngredients(recipe.slice(1, recipe.length), newResult)
        }
    }
}

interface DisplayBaseIngredients {
    item: string
    ingredients: {
        name: string
        amount: number
    }[]
}

function expandRecipe(item: Item): DisplayBaseIngredients {
    return {
        item: item.name,
        ingredients: compoundBaseIngredients(getBaseIngredients(item.recipe))
        .map(ingredient => ({
            name: ingredient.item.name,
            amount: ingredient.amount
        }))
    }
}

console.log(expandRecipe(GoldenAxe))
