import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, name, healthScore, image, diets }) {
    return (
        <div>
            <p>{healthScore}</p>
            <img src={image} alt={name} width="200px" height="250px" />
            <Link to={`/recipes/${id}`}>
                <h3>{name}</h3>
            </Link>
            <p>{diets}</p>
        </div>
    );
}
