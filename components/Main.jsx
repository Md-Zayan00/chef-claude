import { useState } from "react"
import { getRecipeHF } from "../ai"
import ReactMarkdown from "react-markdown"

export default function Main(){
    
    const [ingredients, setIngredients] = useState([])

    const [recipe, setRecipe] = useState("")

    async function getRecipe(){
        const recipeMarkdown = await getRecipeHF(ingredients)
        setRecipe(recipeMarkdown)
    }

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    
    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [...prev, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="ingredient-form">
                <input 
                placeholder="e.g. oregano"
                type="text"
                aria-label="Add ingredient"
                name="ingredient"
                />
                <button>+ Add ingredient</button>
            </form>
            {ingredients.length > 0 && <section className="ingredients">
                <h2>Selected Ingredients:</h2>
                <ul>{ingredientsListItems}</ul>
                {ingredients.length > 3 && <div className="recipe">
                    <div className="recipeHead">
                        <h2>Ready for a Recipe?</h2>
                        <p>Search for a recipe using Chef Claude</p>
                    </div>
                    <button onClick={getRecipe}>Search</button>
                </div>}
            </section>}
            {recipe && <section className="genRecipe">
                <ReactMarkdown>{recipe}</ReactMarkdown>
            </section>}
        </main>
    )
}