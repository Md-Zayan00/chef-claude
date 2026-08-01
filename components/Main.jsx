import { useState } from "react"

export default function Main(){
    
    const [ingredients, setIngredients] = useState([])

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
            <ul>
                {ingredientsListItems}
            </ul>
        </main>
    )
}