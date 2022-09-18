import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getRecipes,
    filterRecipeByDiet,
    filterCreated,
    orderBy,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes); //arreglo del estado
    const [, setOrder] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage; //9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0
    const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterByDiet(e) {
        dispatch(filterRecipeByDiet(e.target.value));
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value));
    }

    function handleOrderBy(e) {
        e.preventDefault();
        dispatch(orderBy(e.target.value));
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Link to="/recipes">Create Recipe</Link>
            <Link to="/recipes">About Me</Link>
            <h2>Michi foods</h2>
            <button
                onClick={(e) => {
                    handleClick(e);
                }}
            >
                Clear Filters
            </button>

            <div>
                <select onChange={(e) => handleOrderBy(e)}>
                    <option value="asc"> ↑ </option>
                    <option value="des"> ↓ </option>
                </select>
                <select onChange={(e) => handleFilterByDiet(e)}>
                    <option value="gluten free">Glutten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="pescaterian">Pescaterian</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="fodmap friendly">Fodmap Friendly</option>
                </select>
                <select onChange={(e) => handleFilterCreated(e)}>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                </select>

                <Paginate
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginated={paginated}
                />

                <div>
                    {currentRecipe?.map((recipe) => {
                        return (
                            <Card
                                key={recipe.id}
                                id={recipe.id}
                                name={recipe.name}
                                image={recipe.image}
                                diets={recipe.diets}
                                healthScore={recipe.healthScore}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
