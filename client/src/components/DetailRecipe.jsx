import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./Navbar";

import getRecipeDetail from "../redux/actions";

import "../styles/DetailRecipe.css";

export default function RecipeDetail(props) {
  const dispatch = useDispatch();

  const recipeDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="mainContainer">
      <ScrollToTop />
      <Navbar />
      {recipeDetail[0] ? (
        <div className="detailContainer">
          <div className="detail">
            <div>
              <h2 className="detail__h2">{recipeDetail[0].name}</h2>
              <p className="detail__p">
                Health Score: {recipeDetail[0].healthScore}
              </p>
              <img
                src={recipeDetail[0].image}
                alt={recipeDetail[0].name}
                className="detail__img"
              />
            </div>

            <div className="summary">
              <h3 className="summary__h3">Summary:</h3>
              <p className="summary__p">{recipeDetail[0].summary}</p>
            </div>

            <div className="diets">
              <h3 className="diets__h3">Diets:</h3>
              <p className="diets__p">{recipeDetail[0].diets}</p>
            </div>

            <div className="steps">
              <h3 className="steps__h3">Steps:</h3>
              <p className="steps__p">{recipeDetail[0].steps}</p>
            </div>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}
