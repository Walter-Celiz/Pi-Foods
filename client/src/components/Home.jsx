import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getRecipes,
  filterRecipeByDiet,
  filterCreated,
  orderByName,
  orderByScore,
} from "../redux/actions";

import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

import "../styles/Home.css";
import "../styles/Filters.css";

export default function Home() {
  const dispatch = useDispatch();
  //state array
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
    <div className="homeContainer">
      <Navbar />

      <div className="filterContainer">
        <div className="filters__order">
          <select
            className="filters__select "
            onChange={(e) => handleOrderByName(e)}
          >
            <option value="asc" className="divFilters__option">
              {" "}
              A-Z{" "}
            </option>
            <option value="des" className="divFilters__option">
              {" "}
              Z-A{" "}
            </option>
          </select>

          <select
            className="filters__select  filters__select--margin"
            onChange={(e) => handleOrderByScore(e)}
          >
            <option value="ascd" className="filters__option">
              Ascending Score
            </option>
            <option value="desc" className="filters__option">
              Descending Score
            </option>
          </select>
        </div>

        <div className="filters__searchBar">
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>

        <div className="filters__types">
          <select
            className="filters__select"
            onChange={(e) => handleFilterByDiet(e)}
          >
            <option value="gluten free" className="filters__option">
              Glutten Free
            </option>
            <option value="dairy free" className="filters__option">
              Dairy Free
            </option>
            <option value="lacto ovo vegetarian" className="filters__option">
              Lacto ovo vegetarian
            </option>
            <option value="vegan" className="filters__option">
              Vegan
            </option>
            <option value="paleolithic" className="filters__option">
              Paleolithic
            </option>
            <option value="primal" className="filters__option">
              Primal
            </option>
            <option value="whole 30" className="filters__option">
              Whole 30
            </option>
            <option value="pescaterian" className="filters__option">
              Pescaterian
            </option>
            <option value="ketogenic" className="filters__option">
              Ketogenic
            </option>
            <option value="fodmap friendly" className="filters__option">
              Fodmap Friendly
            </option>
          </select>

          <select
            className="filters__select filters__select--margin"
            onChange={(e) => handleFilterCreated(e)}
          >
            <option value="all" className="filters__option">
              All
            </option>
            <option value="created" className="filters__option">
              Created
            </option>
          </select>
        </div>
      </div>

      <div className="clearFilter">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className="clearFilter__button"
        >
          Clear Filters
        </button>
      </div>
      <div>
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginated={paginated}
        />
      </div>

      <div>
        {currentRecipe?.map((recipe) => {
          return (
            <Card
              id={recipe.id}
              key={recipe.id}
              name={recipe.name}
              image={recipe.image}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
            />
          );
        })}
      </div>

      <div className="bottm">
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginated={paginated}
        />
      </div>
    </div>
  );
}
