import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    getRecipes,
    filterRecipeByDiet,
    filterCreated,
    orderByName,
    orderByScore,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    //arreglo del estado
    const allRecipes = useSelector((state) => state.recipes);
    // eslint-disable-next-line no-unused-vars
    const [order, setOrder] = useState("");

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

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleOrderByScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    return (
        <div>
            <div>
                <h2>logo foods</h2>
                <Link to="/recipes">Create/Edit</Link>
                <Link to="/aboutme">About Me</Link>
            </div>

            <div>
                <div>
                    <select onChange={(e) => handleOrderByName(e)}>
                        <option value="asc"> A-Z </option>
                        <option value="des"> Z-A </option>
                    </select>
                </div>

                <div>
                    <SearchBar />
                </div>

                <div>
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
                </div>

                <div>
                    <select
                        onChange={(e) => handleOrderByScore(e)}>
                        <option value="ascd">Ascending Score</option>
                        <option value="desc">Descending Score</option>
                    </select>
                </div>

                <div>
                    <select onChange={(e) => handleFilterCreated(e)}>
                        <option value="all">All</option>
                        <option value="created">Created</option>
                    </select>
                </div>

                <div>
                    <button
                        onClick={(e) => { handleClick(e) }}>
                        Clear Filters
                    </button>
                </div>
            </div>

            <div>
                {currentRecipe?.map((recipe) => {
                    return (
                        <Card
                            key={recipe.id}
                            // id={recipe.id}
                            name={recipe.name}
                            image={recipe.image}
                            diets={recipe.diets}
                            healthScore={recipe.healthScore}
                        />
                    );
                })}
            </div>

            <div>
                <Paginate
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginated={paginated}
                />
            </div>
        </div>
    );
}
