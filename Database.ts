
export type Category = 
    'Material' |
    'Nook Item' |
    'Tool' |
    'Furniture'

export interface Ingredient {
    itemid: number
    amount: number
}

export interface Item {
    id: number
    name: string
    category: Category
    recipe: Ingredient[]
}

export interface Database {
    items: Item[]
}

export const DataBase: Database = {
    items: [
        {
            id: 1,
            name: 'Tree Branch',
            category: 'Material',
            recipe: []
        },
        {
            id: 2,
            name: 'Stone',
            category: 'Material',
            recipe: []
        },
        {
            id: 3,
            name: 'Wood',
            category: 'Material',
            recipe: []
        },
        {
            id: 4,
            name: 'Iron Nugget',
            category: 'Material',
            recipe: []
        },
        {
            id: 5,
            name: 'Gold Nugget',
            category: 'Material',
            recipe: []
        },
        {
            id: 6,
            name: 'Flimsy Axe',
            category: 'Tool',
            recipe: [
                {itemid: 1, amount: 5},
                {itemid: 2, amount: 1}
            ]
        },
        {
            id: 7,
            name: 'Axe',
            category: 'Tool',
            recipe: [
                {itemid: 6, amount: 1},
                {itemid: 3, amount: 3},
                {itemid: 4, amount: 1}
            ]
        },
        {
            id: 8,
            name: 'Golden Axe',
            category: 'Tool',
            recipe: [
                {itemid: 7, amount: 1},
                {itemid: 5, amount: 1}
            ]
        }
    ]
}