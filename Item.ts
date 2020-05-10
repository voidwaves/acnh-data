// to run use the command:
// ts-node -O "{ \"target\": \"es2017\" }" Item.ts

import { DataBase, Ingredient, Item } from "./Database"

function getItemById(id: number): Item {
    return DataBase.items.find(item => item.id === id)
}

function flatten<Type>(array: Type[][]): Type[] {
    const isEmpty = array.length === 0
    return isEmpty ? [] : [...array[0], ...flatten(array.slice(1, array.length))]
}

function repeatArray<Type>(times: number, array: Type[]): Type[] {
    const filledArray = new Array(times).fill(array)
    return flatten(filledArray)
}

function getBaseIngredients(recipe: Ingredient[]): Ingredient[] {
    return flatten(recipe.map(ingredient => {
        const item = getItemById(ingredient.itemid)
        const isBaseIngredient = item.recipe.length === 0
        return isBaseIngredient ? [ingredient] : repeatArray(ingredient.amount, getBaseIngredients(item.recipe))
    }))
}

function compoundBaseIngredients(recipe: Ingredient[], result: Ingredient[] = []): Ingredient[] {
    if(recipe.length === 0) {
        return result
    } else {
        const currentIngredient = recipe[0]
        const restOfRecipe = recipe.slice(1, recipe.length)
        const resultMatch = result.find(ingredient => ingredient.itemid === currentIngredient.itemid)

        if(resultMatch === undefined) {
            const addedIngredient = [currentIngredient, ...result]
            return compoundBaseIngredients(restOfRecipe, addedIngredient)
        } else {
            const newIngredient = {
                itemid: currentIngredient.itemid,
                amount: currentIngredient.amount + resultMatch.amount
            }
            const withoutCurrentIngredient = result.filter(ingredient => ingredient.itemid !== currentIngredient.itemid)
            const replacedIngredient = [newIngredient, ...withoutCurrentIngredient]
            return compoundBaseIngredients(restOfRecipe, replacedIngredient)
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

function expandRecipe(itemid: number): DisplayBaseIngredients {
    const item = getItemById(itemid)
    return {
        item: item.name,
        ingredients: compoundBaseIngredients(getBaseIngredients(item.recipe))
        .map(ingredient => ({
            name: getItemById(ingredient.itemid).name,
            amount: ingredient.amount
        }))
    }
}

console.log(expandRecipe(8))
