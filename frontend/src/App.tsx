import React, { useState, FormEvent } from "react";
import { searchRecipes } from "./API";
import "./App.css";
import { Recipe } from './types';;

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { results } = await searchRecipes(searchTerm, 1);
      setRecipes(results);
    } catch (error) {
      console.error(error);
    }
}
return (
  <div>
    <form onSubmit={handleSearchSubmit}>
      <input type="text" required placeholder="Enter a search term... " value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)}></input>
      <button type="submit">Submit</button>
    </form>
    {recipes.map((recipe : Recipe) => (
      <div key={recipe.id}>
        Recipe Image Location: {recipe.image}
        <br />
        Recipe Title: {recipe.title}
      </div>
    ))}
  </div>
);
};

export default App;