import { React } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import getRecipeDetail from "../redux/actions";

export default function RecipeDetail(props) {
    const dispatch = useDispatch();

    const recipeDetail = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getRecipeDetail(props.match.params.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div>
            <Link to="/home">
                <button>Home</button>
            </Link>
            {recipeDetail[0] ? (
                <div>
                    <img src={recipeDetail[0].image} alt={recipeDetail[0].name} />
                    <h2>{recipeDetail[0].name}</h2>
                    <p>Health Score: {recipeDetail[0].healthScore}</p>
                    <p>Summary:</p>
                    <p>{recipeDetail[0].summary}</p>
                    {recipeDetail[0].steps ? (
                        <div>
                            <span>Step by step: </span>
                            <span>{recipeDetail[0].steps}</span>
                        </div>
                    ) : null}
                    <p>Diets:</p>
                    <p>{recipeDetail[0].diets}</p>
                </div>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
}
